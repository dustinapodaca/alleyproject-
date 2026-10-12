import { useEffect, useRef, useState, type ReactNode } from 'react'
import { productionDays, useStore, type Store, type StoreApi } from './lib'
import { project } from './data/guide'
import { Progress } from './ui'
import { ScheduleView, TodayView } from './views/Schedule'
import { AssetsView, HeroesView, KitView, MaterialsView, OverviewView, ReferenceView, RendersView, ResourcesView } from './views/Guide'

type Route = { path: string; label: string; render: (api: StoreApi) => ReactNode }
const routes: Route[] = [
  { path: 'today', label: 'Today', render: (api) => <TodayView api={api} /> },
  { path: 'schedule', label: 'Schedule', render: (api) => <ScheduleView api={api} /> },
  { path: 'overview', label: 'Overview', render: () => <OverviewView /> },
  { path: 'reference', label: 'Reference & scale', render: () => <ReferenceView /> },
  { path: 'kit', label: 'Modular kit', render: (api) => <KitView api={api} /> },
  { path: 'heroes', label: 'Hero features', render: (api) => <HeroesView api={api} /> },
  { path: 'assets', label: 'Asset list', render: (api) => <AssetsView api={api} /> },
  { path: 'materials', label: 'Materials & masks', render: (api) => <MaterialsView api={api} /> },
  { path: 'resources', label: 'Free resources', render: () => <ResourcesView /> },
  { path: 'renders', label: 'Final renders', render: (api) => <RendersView api={api} /> },
]

function useRoute() {
  const read = () => {
    const h = window.location.hash.replace(/^#\/?/, '')
    return routes.some((r) => r.path === h) ? h : 'today'
  }
  const [route, setRoute] = useState(read)
  useEffect(() => {
    const on = () => {
      // Anchors like #week-3 scroll within the schedule; only #/path changes the page.
      if (window.location.hash.startsWith('#/') || window.location.hash === '') {
        setRoute(read())
        window.scrollTo({ top: 0 })
      }
    }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return route
}

function DataPanel({ api }: { api: StoreApi }) {
  const file = useRef<HTMLInputElement>(null)
  const exportData = () => {
    const blob = new Blob([JSON.stringify(api.store, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `mill-alley-progress-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
  }
  const importData = async (f: File) => {
    try {
      const parsed = JSON.parse(await f.text()) as Partial<Store>
      api.replace({ done: parsed.done ?? {}, status: parsed.status ?? {}, notes: parsed.notes ?? {} })
    } catch {
      alert('That file is not a progress export from this tracker.')
    }
  }
  return (
    <div className="data-panel">
      <p className="side-label">Progress data</p>
      <p className="muted small">Saved in this browser. Export to move it to another device.</p>
      <div className="data-btns">
        <button type="button" className="btn" onClick={exportData}>
          Export
        </button>
        <button type="button" className="btn" onClick={() => file.current?.click()}>
          Import
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => confirm('Clear all checkmarks, statuses and notes?') && api.replace({ done: {}, status: {}, notes: {} })}
        >
          Reset
        </button>
      </div>
      <input ref={file} type="file" accept="application/json" hidden onChange={(e) => e.target.files?.[0] && importData(e.target.files[0])} />
    </div>
  )
}

export default function App() {
  const api = useStore()
  const route = useRoute()
  const current = routes.find((r) => r.path === route) ?? routes[0]
  const doneProd = productionDays.filter((d) => api.store.done[d.id]).length

  return (
    <div className="shell">
      <aside className="side">
        <a className="brand" href="#/today">
          <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" width={28} height={28} />
          <span>
            <strong>{project.title}</strong>
            <small>{project.subtitle}</small>
          </span>
        </a>
        <div className="side-progress">
          <span>
            {doneProd} of {productionDays.length} days
          </span>
          <Progress value={doneProd} total={productionDays.length} label="Overall progress" />
        </div>
        <nav aria-label="Sections">
          {routes.map((r) => (
            <a key={r.path} href={`#/${r.path}`} className={r.path === current.path ? 'is-active' : ''} aria-current={r.path === current.path ? 'page' : undefined}>
              {r.label}
            </a>
          ))}
        </nav>
        <div className="desktop-only">
          <DataPanel api={api} />
        </div>
      </aside>
      <main className="main">
        {current.render(api)}
        <footer className="mobile-only">
          <DataPanel api={api} />
        </footer>
      </main>
    </div>
  )
}
