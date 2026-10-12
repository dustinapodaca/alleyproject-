import { milestones, phases, project } from '../data/guide'
import { dayNumber, fmtDate, todayISO } from '../lib'

const lo = dayNumber(project.start)
const hi = dayNumber(project.end) + 1
const pos = (iso: string) => ((dayNumber(iso) - lo) / (hi - lo)) * 100

/** Phase bars on a to-scale time axis, with a marker for today. */
export function Timeline() {
  const today = todayISO()
  const showToday = dayNumber(today) >= lo && dayNumber(today) < hi
  const ticks = Array.from({ length: 8 }, (_, i) => {
    return new Date((lo + i * 14) * 864e5).toISOString().slice(0, 10)
  })
  return (
    <figure className="timeline" aria-label="Production timeline">
      <div className="tl-axis">
        {ticks.map((t) => (
          <span key={t} style={{ left: `${pos(t)}%` }}>
            {fmtDate(t, false)}
          </span>
        ))}
      </div>
      <div className="tl-rows">
        <div className="tl-overlay" aria-hidden="true">
          {ticks.map((t) => (
            <i key={t} className="tl-grid" style={{ left: `${pos(t)}%` }} />
          ))}
          {showToday && (
            <i className="tl-today" style={{ left: `${pos(today)}%` }}>
              <b>Today</b>
            </i>
          )}
        </div>
        {phases.map((p) => {
          const past = dayNumber(p.end) < dayNumber(today)
          const now = dayNumber(p.start) <= dayNumber(today) && dayNumber(today) <= dayNumber(p.end)
          return (
            <div className="tl-row" key={p.name}>
              <span className="tl-name">{p.name}</span>
              <span className="tl-track">
                <span
                  className={`tl-bar ${past ? 'is-past' : ''} ${now ? 'is-now' : ''}`}
                  style={{ left: `${pos(p.start)}%`, width: `${pos(p.end) - pos(p.start) + 100 / (hi - lo)}%` }}
                  title={`${fmtDate(p.start)} – ${fmtDate(p.end)}`}
                />
              </span>
            </div>
          )
        })}
        {milestones.map((m) => (
          <div className="tl-row" key={m.name}>
            <span className="tl-name tl-milestone">{m.name}</span>
            <span className="tl-track">
              <span className={`tl-diamond ${m.name === 'Published' ? 'is-final' : ''}`} style={{ left: `${pos(m.date)}%` }} title={fmtDate(m.date)} />
              <span className="tl-date" style={{ left: `${pos(m.date)}%` }}>
                {fmtDate(m.date, false)}
              </span>
            </span>
          </div>
        ))}
      </div>
    </figure>
  )
}
