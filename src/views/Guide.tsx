import { useMemo, useState } from 'react'
import { assetKitHeroes, decals, foliage, heroes, kitA, kitB, kitC, kitD, materials, measurements, props, type Row } from '../data/plan'
import { freeResources, kitRules, maskRecipes, masterMaterials, metrics, postText, project, renderList, trimSheets, zones } from '../data/guide'
import type { Status, StoreApi } from '../lib'
import { Check, PageHead, Priority, Progress, StatusChip } from '../ui'

function DataTable({ rows, cols, status }: { rows: Row[]; cols: string[]; status?: { api: StoreApi; key: (r: Row) => string } }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {cols.map((c) => (
              <th key={c}>{c}</th>
            ))}
            {status && <th>Status</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {cols.map((c, j) => (
                <td key={c} className={j === 0 ? 'mono' : ''}>
                  {r[c] || <span className="muted">—</span>}
                </td>
              ))}
              {status && (
                <td>
                  <StatusChip status={(status.api.store.status[status.key(r)] ?? 0) as Status} onClick={() => status.api.cycleStatus(status.key(r))} />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function OverviewView() {
  return (
    <>
      <PageHead kicker={project.subtitle} title={project.title} lead={project.goal} />
      <section className="card">
        <h2>What the piece must prove</h2>
        <ul className="bullets">
          {project.prove.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>
      <section className="grid-3">
        {project.tools.map((t) => (
          <div className="card tool" key={t.name}>
            <h3>{t.name}</h3>
            <p>{t.role}</p>
          </div>
        ))}
      </section>
      <section className="card">
        <h2>Pipeline order</h2>
        <ol className="pipeline">
          {[
            'Pre-production: reference breakdown, scale, kit plan',
            'Greybox: blockout, camera match, metrics lock',
            'Materials: CC0 and procedural tiling sets, custom edge-wear and leak masks, trim sheets',
            'Modular kit: meshes, UVs, snapping tests',
            'Hero assets: Blender sculpt and retopo, Marmoset bake and texture',
            'Props and debris',
            'Foliage: ivy, moss, weeds, background trees',
            'Set dressing: decals, vertex paint, storytelling',
            'Lighting and atmosphere',
            'Optimization and polish',
            'Final renders and presentation',
          ].map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </section>
    </>
  )
}

export function ReferenceView() {
  return (
    <>
      <PageHead
        kicker="Reference breakdown"
        title="1:1 scale"
        lead="About 5 m wall to wall and 20 m tall, capped by a skybridge 6 m up. Sizes are estimates from human-scale anchors (100 cm handrail, 18 cm risers, 210–260 cm doors, Victorian brick coursing); lock them by camera-matching the photo in Blender."
      />
      <figure className="ref">
        <img src={`${import.meta.env.BASE_URL}reference.jpg`} alt="Reference photo: a narrow derelict mill alley with brick walls, a timber skybridge and an overgrown far end" />
      </figure>
      <section className="card">
        <h2>Scene zones, front to back</h2>
        <ol className="zones">
          {zones.map((z) => (
            <li key={z.name}>
              <strong>{z.name}</strong> {z.text}
            </li>
          ))}
        </ol>
      </section>
      <section>
        <h2>Measurements</h2>
        <DataTable rows={measurements} cols={['Element', 'Width (cm)', 'Height (cm)', 'Depth (cm)', 'Notes']} />
      </section>
      <section className="card">
        <h2>Metrics to hold</h2>
        <ul className="bullets">
          {metrics.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </section>
    </>
  )
}

const families = [
  { id: 'A', title: 'Family A · left mill (dark sooty brick)', rows: kitA },
  { id: 'B', title: 'Family B · right building (grey painted brick)', rows: kitB },
  { id: 'C', title: 'Family C · structure and metal', rows: kitC },
  { id: 'D', title: 'Family D · ground', rows: kitD },
]

export function KitView({ api }: { api: StoreApi }) {
  const all = families.flatMap((f) => f.rows)
  const done = all.filter((r) => api.store.status[`kit:${r.ID}`] === 2).length
  return (
    <>
      <PageHead kicker="Modular kit" title="31 pieces, four families" lead="Every piece snaps on a 25 cm grid, uses tiling materials or one of three trim sheets, and takes vertex paint for moss, grime and wet.">
        <div className="head-progress">
          <span>
            {done}/{all.length} pieces done
          </span>
          <Progress value={done} total={all.length} label="Kit progress" />
        </div>
      </PageHead>
      <section className="card">
        <h2>Rules</h2>
        <ul className="bullets">
          {kitRules.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>
      {families.map((f) => (
        <section key={f.id}>
          <h2>{f.title}</h2>
          <DataTable rows={f.rows} cols={['ID', 'Piece', 'Size (cm)', 'Material']} status={{ api, key: (r) => `kit:${r.ID}` }} />
        </section>
      ))}
      <section>
        <h2>Trim sheets · 2048², 10.24 px/cm</h2>
        <div className="grid-3">
          {trimSheets.map((t) => (
            <div className="card" key={t.id}>
              <p className="mono accent">{t.id}</p>
              <h3>{t.name}</h3>
              <p className="muted">{t.use}</p>
              <StatusChip status={(api.store.status[`trim:${t.id}`] ?? 0) as Status} onClick={() => api.cycleStatus(`trim:${t.id}`)} />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export function HeroesView({ api }: { api: StoreApi }) {
  return (
    <>
      <PageHead kicker="Unique features" title="Seven heroes break the kit" lead="The skybridge is the centrepiece and gets a full week (Week 6). Everything else here is a story beat or a silhouette anchor." />
      <div className="hero-grid">
        {heroes.map((h) => {
          const id = `hero:${h['#']}`
          return (
            <article className={`card hero ${h['#'] === 'H1' ? 'is-star' : ''}`} key={id}>
              <div className="hero-top">
                <span className="mono accent">{h['#']}</span>
                <StatusChip status={(api.store.status[id] ?? 0) as Status} onClick={() => api.cycleStatus(id)} />
              </div>
              <h3>{h.Feature}</h3>
              <p className="hero-why">{h['Why it matters in the shot']}</p>
              <p className="muted">{h['Build approach']}</p>
            </article>
          )
        })}
      </div>
    </>
  )
}

type Cat = 'All' | 'Props' | 'Foliage' | 'Decals' | 'Kit and heroes'
export function AssetsView({ api }: { api: StoreApi }) {
  const [cat, setCat] = useState<Cat>('All')
  const [prio, setPrio] = useState<string>('All')
  const [q, setQ] = useState('')
  const items = useMemo(() => {
    const tag = (rows: Row[], c: Cat, name: string) => rows.map((r) => ({ id: r.ID, name: r[name], cat: c, row: r }))
    return [
      ...tag(assetKitHeroes, 'Kit and heroes', 'Asset'),
      ...tag(props, 'Props', 'Asset'),
      ...tag(foliage, 'Foliage', 'Asset'),
      ...tag(decals, 'Decals', 'Decal set'),
    ]
  }, [])
  const shown = items.filter(
    (i) =>
      (cat === 'All' || i.cat === cat) &&
      (prio === 'All' || i.row.Priority === prio) &&
      (!q || `${i.id} ${i.name}`.toLowerCase().includes(q.toLowerCase())),
  )
  const doneCount = items.filter((i) => api.store.status[`asset:${i.id}`] === 2).length
  return (
    <>
      <PageHead kicker="Full asset list" title="Every asset, by priority" lead="79 assets in all: the 31 kit pieces are grouped by family here and tracked piece by piece on the Modular kit page. P1 is needed for the reference shot, P2 for alternate angles, P3 only if time allows. Budgets are LOD0 triangles; keep them even with Nanite, since reviewers check wireframes.">
        <div className="head-progress">
          <span>
            {doneCount}/{items.length} rows done
          </span>
          <Progress value={doneCount} total={items.length} label="Asset progress" />
        </div>
      </PageHead>
      <div className="filters">
        {(['All', 'Kit and heroes', 'Props', 'Foliage', 'Decals'] as Cat[]).map((c) => (
          <button key={c} type="button" className={`pill ${cat === c ? 'is-on' : ''}`} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
        <span className="sep" />
        {['All', 'P1', 'P2', 'P3'].map((p) => (
          <button key={p} type="button" className={`pill ${prio === p ? 'is-on' : ''}`} onClick={() => setPrio(p)}>
            {p === 'All' ? 'Any priority' : p}
          </button>
        ))}
        <input className="search" type="search" placeholder="Search assets" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Asset</th>
              <th>Detail</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((i) => (
              <tr key={i.id}>
                <td className="mono">{i.id}</td>
                <td>
                  {i.name}
                  <div className="muted small">{i.cat}</div>
                </td>
                <td className="small">{[i.row['Size (cm)'], i.row.Tris ?? i.row['Tris each'], i.row.Textures].filter(Boolean).join(' · ') || '—'}</td>
                <td>
                  <Priority p={i.row.Priority} />
                </td>
                <td>
                  <StatusChip status={(api.store.status[`asset:${i.id}`] ?? 0) as Status} onClick={() => api.cycleStatus(`asset:${i.id}`)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!shown.length && <p className="muted pad">No assets match.</p>}
      </div>
    </>
  )
}

export function MaterialsView({ api }: { api: StoreApi }) {
  return (
    <>
      <PageHead
        kicker="Materials and masks"
        title="Source the base, author the wear"
        lead="Start from CC0 or procedural bases, then spend your time on custom edge-wear and leak masks. Ten tiling sets, three trim sheets and one master material carry almost every surface."
      />
      <section>
        <h2>Tiling materials · 2K, height-blend ready</h2>
        <DataTable rows={materials} cols={['ID', 'Material', 'Tile size (cm)', 'Used on']} status={{ api, key: (r) => `mat:${r.ID}` }} />
      </section>
      <section>
        <h2>Custom mask recipes (Blender)</h2>
        <div className="grid-2">
          {maskRecipes.map((m) => (
            <div className="card" key={m.name}>
              <h3>{m.name}</h3>
              <ol className="steps">
                {m.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>
      <section className="card">
        <h2>Master materials (UE5)</h2>
        <dl className="defs">
          {masterMaterials.map((m) => (
            <div key={m.name}>
              <dt>
                <code>{m.name}</code>
              </dt>
              <dd>{m.text}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="card">
        <h2>Unique texture sets (Marmoset)</h2>
        <ul className="bullets">
          <li>H1 skybridge: 4K, 2 sets (cladding, structure).</li>
          <li>H2 chimney cap: 2K. H6 loading doors: 2K. P01 plywood: 2K.</li>
          <li>Prop atlases: bricks, litter, paper, slates at 1K to 2K each.</li>
        </ul>
      </section>
    </>
  )
}

export function ResourcesView() {
  return (
    <>
      <PageHead
        kicker="Free resources"
        title="Free materials, props and add-ons"
        lead="CC0 libraries cover base materials and fill props, so your time goes into the kit, the heroes and the custom masks. Credit anything you didn't make in the final post."
      />
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Resource</th>
              <th>Use it for</th>
              <th>Cost and license</th>
            </tr>
          </thead>
          <tbody>
            {freeResources.map((r) => (
              <tr key={r.name}>
                <td>
                  <a href={r.url} target="_blank" rel="noreferrer">
                    {r.name} ↗
                  </a>
                </td>
                <td>{r.use}</td>
                <td className="small">{r.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="muted small">Checked October 2026. Prices and licenses change — confirm on each site before relying on an asset.</p>
    </>
  )
}

export function RendersView({ api }: { api: StoreApi }) {
  const all = [...renderList.map((r, i) => ({ id: `render:${i}`, text: r })), ...postText.map((t, i) => ({ id: `post:${i}`, text: t }))]
  const done = all.filter((x) => api.store.done[x.id]).length
  const list = (items: { id: string; text: string }[]) => (
    <ul className="checklist">
      {items.map((x) => (
        <li key={x.id} className={api.store.done[x.id] ? 'is-done' : ''}>
          <Check checked={!!api.store.done[x.id]} onChange={() => api.toggleDone(x.id)} label={x.text} />
          <span>{x.text}</span>
        </li>
      ))}
    </ul>
  )
  return (
    <>
      <PageHead kicker="Final renders" title="The ArtStation post" lead="Lead with the reference-matched beauty shot, then prove the kit and the heroes in that order.">
        <div className="head-progress">
          <span>
            {done}/{all.length} done
          </span>
          <Progress value={done} total={all.length} label="Render progress" />
        </div>
      </PageHead>
      <section className="card">
        <h2>Render list, in post order</h2>
        {list(all.slice(0, renderList.length))}
      </section>
      <section className="card">
        <h2>Post text to write</h2>
        {list(all.slice(renderList.length))}
      </section>
    </>
  )
}
