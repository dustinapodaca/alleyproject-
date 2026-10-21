import { useEffect, useState } from 'react'
import { curriculum, type Lesson } from '../data/curriculum'
import { benchmarkProjects, curriculumIntro, gaps, learningResources, setup, standards } from '../data/curriculumGuide'
import { fmtDate, todayISO, type StoreApi } from '../lib'
import { Check, PageHead, Progress, Rich } from '../ui'
import type { LessonText } from '../data/lessons'
import { Md } from '../md'

export const allLessons = curriculum.flatMap((w) => w.lessons.map((l) => ({ ...l, week: w.n })))
const realLessons = allLessons.filter((l) => !l.buffer)

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

// The full lesson text is large, so it loads in its own chunk the first time a lesson is shown.
let lessonCache: Record<string, LessonText> | null = null
let lessonLoad: Promise<Record<string, LessonText>> | null = null
function useLessonText() {
  const [data, setData] = useState(lessonCache)
  useEffect(() => {
    if (lessonCache) return
    lessonLoad ??= import('../data/lessons').then((m) => (lessonCache = m.lessonText))
    lessonLoad.then(setData)
  }, [])
  return data
}

export function FullLesson({ id, open = false }: { id: string; open?: boolean }) {
  const all = useLessonText()
  const t = all?.[id]
  if (!t) return null
  return (
    <details className="lesson-full" open={open}>
      <summary>{open ? 'Full lesson' : 'Open the full lesson'} · {t.title}</summary>
      <Md text={t.body} />
    </details>
  )
}

export function LessonBody({ lesson, full = true, open = false }: { lesson: Lesson; full?: boolean; open?: boolean }) {
  return (
    <>
      <p className="day-task">
        <Rich text={cap(lesson.lesson)} />
      </p>
      {lesson.drill && (
        <p className="day-done">
          <span>Drill</span> <Rich text={lesson.drill} />
        </p>
      )}
      {lesson.feeds && (
        <p className="day-done">
          <span className="feeds">Feeds</span> <Rich text={lesson.feeds} />
        </p>
      )}
      {lesson.standard && (
        <p className="day-done">
          <span className="std">Standard check</span> <Rich text={lesson.standard} />
        </p>
      )}
      {full && <FullLesson id={lesson.id} open={open} />}
    </>
  )
}

function LessonRow({ lesson, api, today }: { lesson: Lesson; api: StoreApi; today: string }) {
  const done = !!api.store.done[lesson.id]
  const isToday = lesson.date === today
  return (
    <li className={`day ${done ? 'is-done' : ''} ${lesson.buffer ? 'is-buffer' : ''} ${isToday ? 'is-today' : ''}`}>
      <Check checked={done} onChange={() => api.toggleDone(lesson.id)} label={`Mark the ${fmtDate(lesson.date)} lesson done`} />
      <div className="day-body">
        <div className="day-meta">
          <span className="day-date">{fmtDate(lesson.date)}</span>
          {isToday && <span className="tag tag-today">Today</span>}
          {lesson.standard && <span className="tag">Standard</span>}
          {lesson.buffer && <span className="tag">Buffer</span>}
        </div>
        <LessonBody lesson={lesson} />
      </div>
    </li>
  )
}

type Tab = 'lessons' | 'standards' | 'setup'

export function CurriculumView({ api }: { api: StoreApi }) {
  const today = todayISO()
  const [tab, setTab] = useState<Tab>('lessons')
  const done = realLessons.filter((l) => api.store.done[l.id]).length
  const currentWeek = allLessons.find((l) => l.date >= today)?.week ?? 15

  return (
    <>
      <PageHead kicker="Blender curriculum · Mill Alley track" title="Learn Blender by building the alley" lead={curriculumIntro.lead}>
        <div className="head-progress">
          <span>
            {done}/{realLessons.length} lessons done
          </span>
          <Progress value={done} total={realLessons.length} label="Curriculum progress" />
        </div>
      </PageHead>

      <div className="filters" role="tablist" aria-label="Curriculum sections">
        {(
          [
            ['lessons', 'Daily lessons'],
            ['standards', 'Portfolio standards'],
            ['setup', 'Setup & resources'],
          ] as [Tab, string][]
        ).map(([t, label]) => (
          <button key={t} type="button" role="tab" aria-selected={tab === t} className={`pill ${tab === t ? 'is-on' : ''}`} onClick={() => setTab(t)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'lessons' && (
        <>
          <section className="card">
            <h2>Daily rhythm</h2>
            <ol className="bullets">
              {curriculumIntro.rhythm.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ol>
            <p className="muted small" style={{ marginTop: 10 }}>
              Every lesson below opens in full: resources to watch and read, step-by-step instructions for Blender 5.2, common mistakes, the drill with its pass check, and how it feeds the Mill Alley task. The same lessons are in{' '}
              <a href="Blender-Lessons.pdf" target="_blank" rel="noreferrer">
                the PDF ↗
              </a>
              .
            </p>
          </section>
          {curriculum.map((w) => {
            const doneCount = w.lessons.filter((l) => api.store.done[l.id]).length
            return (
              <details className="week" id={`cweek-${w.n}`} key={w.n} open={w.n === currentWeek}>
                <summary>
                  <span className="week-n">W{w.n}</span>
                  <span className="week-title">
                    <strong>{w.title}</strong>
                    <small>{w.range}</small>
                  </span>
                  <span className="week-count">
                    {doneCount}/{w.lessons.length}
                  </span>
                  <Progress value={doneCount} total={w.lessons.length} label={`Curriculum week ${w.n} progress`} />
                </summary>
                <ol className="days">
                  {w.lessons.map((l) => (
                    <LessonRow key={l.id} lesson={l} api={api} today={today} />
                  ))}
                </ol>
              </details>
            )
          })}
        </>
      )}

      {tab === 'standards' && (
        <>
          <section className="card">
            <h2>The benchmark</h2>
            <p className="muted">{curriculumIntro.benchmark}</p>
            <ul className="bullets" style={{ marginTop: 12 }}>
              {benchmarkProjects.map((p) => (
                <li key={p.name}>
                  <strong>{p.name}:</strong> <span className="muted">{p.text}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2>Standards and where they’re taught</h2>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Standard</th>
                    <th>Projects (of 10)</th>
                    <th>Taught in week</th>
                  </tr>
                </thead>
                <tbody>
                  {standards.map((s) => (
                    <tr key={s.standard}>
                      <td>{s.standard}</td>
                      <td>
                        <span className="count-bar" style={{ width: `${s.count * 10}%` }} />
                        <span className="mono">{s.count}</span>
                      </td>
                      <td className="small">{s.weeks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section>
            <h2>Gaps in the Mill Alley render list</h2>
            <p className="muted small" style={{ marginBottom: 10 }}>
              Standards the benchmark showed that the Mill Alley plan was missing. All eight were added to its final render list on Oct 19; the curriculum’s drills produce each one.
            </p>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Missing</th>
                    <th>Fix</th>
                    <th>Produced by</th>
                  </tr>
                </thead>
                <tbody>
                  {gaps.map((g) => (
                    <tr key={g.gap}>
                      <td>{g.gap}</td>
                      <td className="small">{g.fix}</td>
                      <td className="small">{g.by}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {tab === 'setup' && (
        <>
          <section className="card">
            <h2>Setup</h2>
            <ol className="bullets">
              {setup.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </section>
          <section>
            <h2>Free learning resources</h2>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Resource</th>
                    <th>Use it for</th>
                    <th>Weeks</th>
                  </tr>
                </thead>
                <tbody>
                  {learningResources.map((r) => (
                    <tr key={r.name}>
                      <td>
                        <a href={r.url} target="_blank" rel="noreferrer">
                          {r.name} ↗
                        </a>
                      </td>
                      <td className="small">{r.use}</td>
                      <td className="small">{r.weeks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </>
  )
}
