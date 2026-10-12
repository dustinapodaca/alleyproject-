import { useMemo, useState } from 'react'
import { weeks, type Day } from '../data/plan'
import { milestones, phases, project } from '../data/guide'
import { allDays, daysBetween, fmtDate, isDayOff, productionDays, todayISO, type StoreApi } from '../lib'
import { Check, PageHead, Progress, Rich } from '../ui'
import { Timeline } from './Timeline'

function DayRow({ day, api, today }: { day: Day; api: StoreApi; today: string }) {
  const { store, toggleDone, setNote } = api
  const done = !!store.done[day.id]
  const [open, setOpen] = useState(false)
  const note = store.notes[day.id] ?? ''
  const isToday = day.date === today
  const overdue = !done && !day.buffer && day.date < today
  return (
    <li className={`day ${done ? 'is-done' : ''} ${day.buffer ? 'is-buffer' : ''} ${isToday ? 'is-today' : ''}`}>
      <Check checked={done} onChange={() => toggleDone(day.id)} label={`Mark ${fmtDate(day.date)} done`} />
      <div className="day-body">
        <div className="day-meta">
          <span className="day-date">{fmtDate(day.date)}</span>
          {isToday && <span className="tag tag-today">Today</span>}
          {overdue && <span className="tag tag-late">Overdue</span>}
          {day.review && <span className="tag">Review</span>}
          {day.buffer && <span className="tag">Buffer</span>}
        </div>
        <p className="day-task">
          <Rich text={day.task} />
        </p>
        {day.doneWhen && (
          <p className="day-done">
            <span>Done when</span> {day.doneWhen}
          </p>
        )}
        <button type="button" className="link-btn" onClick={() => setOpen((o) => !o)}>
          {open ? 'Hide notes' : note ? 'Notes ✎' : 'Add notes'}
        </button>
        {open && (
          <textarea
            className="note"
            value={note}
            placeholder="What got done, blockers, links to WIP shots…"
            onChange={(e) => setNote(day.id, e.target.value)}
          />
        )}
      </div>
    </li>
  )
}

type Filter = 'all' | 'remaining' | 'reviews'

export function ScheduleView({ api }: { api: StoreApi }) {
  const today = todayISO()
  const [filter, setFilter] = useState<Filter>('all')
  const currentWeek = allDays.find((d) => d.date >= today)?.week ?? 15

  return (
    <>
      <PageHead
        kicker="Daily schedule"
        title="15 weeks, day by day"
        lead={`75 workdays from ${fmtDate(project.start)} to ${fmtDate(project.end)}. ${project.workweek}`}
      />
      <Timeline />
      <div className="filters" role="group" aria-label="Filter days">
        {(['all', 'remaining', 'reviews'] as Filter[]).map((f) => (
          <button key={f} type="button" className={`pill ${filter === f ? 'is-on' : ''}`} onClick={() => setFilter(f)}>
            {f === 'all' ? 'All days' : f === 'remaining' ? 'Remaining' : 'Reviews'}
          </button>
        ))}
        <a className="pill" href={`#week-${currentWeek}`}>
          Jump to this week
        </a>
      </div>
      {weeks.map((w) => {
        const days = w.days.filter((d) =>
          filter === 'remaining' ? !api.store.done[d.id] : filter === 'reviews' ? d.review : true,
        )
        if (!days.length) return null
        const doneCount = w.days.filter((d) => api.store.done[d.id]).length
        return (
          <details className="week" id={`week-${w.n}`} key={w.n} open={w.n === currentWeek || filter !== 'all'}>
            <summary>
              <span className="week-n">W{w.n}</span>
              <span className="week-title">
                <strong>{w.title}</strong>
                <small>{w.range}</small>
              </span>
              <span className="week-count">
                {doneCount}/{w.days.length}
              </span>
              <Progress value={doneCount} total={w.days.length} label={`Week ${w.n} progress`} />
            </summary>
            <ol className="days">
              {days.map((d) => (
                <DayRow key={d.id} day={d} api={api} today={today} />
              ))}
            </ol>
          </details>
        )
      })}
    </>
  )
}

export function TodayView({ api }: { api: StoreApi }) {
  const today = todayISO()
  const { store, toggleDone } = api
  const doneProd = productionDays.filter((d) => store.done[d.id]).length
  const todays = allDays.find((d) => d.date === today)
  const next = allDays.find((d) => d.date > today && !d.buffer)
  const overdue = useMemo(
    () => allDays.filter((d) => d.date < today && !d.buffer && !store.done[d.id]),
    [store.done, today],
  )
  const phase = phases.find((p) => p.start <= today && today <= p.end)
  const nextMilestone = milestones.find((m) => m.date >= today)
  const notStarted = today < project.start
  const finished = today > project.end

  return (
    <>
      <PageHead kicker={fmtDate(today)} title={notStarted ? `Starts in ${daysBetween(today, project.start)} days` : finished ? 'Schedule complete' : 'Today'} />

      <section className="stats">
        <div className="stat">
          <span className="stat-label">Production days done</span>
          <span className="stat-value">
            {doneProd}
            <small>/{productionDays.length}</small>
          </span>
          <Progress value={doneProd} total={productionDays.length} label="Overall progress" />
        </div>
        <div className="stat">
          <span className="stat-label">Current phase</span>
          <span className="stat-value stat-text">{phase?.name ?? (notStarted ? 'Pre-production' : finished ? 'Done' : 'Between phases')}</span>
        </div>
        <div className="stat">
          <span className="stat-label">{nextMilestone ? nextMilestone.name : 'Milestones'}</span>
          <span className="stat-value">
            {nextMilestone ? daysBetween(today, nextMilestone.date) : '—'}
            {nextMilestone && <small> days</small>}
          </span>
          {nextMilestone && <span className="stat-sub">{fmtDate(nextMilestone.date)}</span>}
        </div>
      </section>

      {todays ? (
        <section className="focus">
          <p className="focus-label">{todays.buffer ? 'Buffer day' : todays.review ? "Today's task · review day" : "Today's task"}</p>
          <div className="focus-row">
            <Check checked={!!store.done[todays.id]} onChange={() => toggleDone(todays.id)} label="Mark today done" />
            <div>
              <p className="focus-task">
                <Rich text={todays.task} />
              </p>
              {todays.doneWhen && (
                <p className="day-done">
                  <span>Done when</span> {todays.doneWhen}
                </p>
              )}
              <a className="link-btn" href={`#/schedule`}>
                Week {todays.week} in the schedule →
              </a>
            </div>
          </div>
        </section>
      ) : (
        <section className="focus is-off">
          <p className="focus-label">{isDayOff(today) ? 'Day off' : notStarted ? 'Coming up' : 'No task scheduled'}</p>
          <p className="focus-task">
            {isDayOff(today) ? 'Wednesday and Thursday are rest days. ' : ''}
            {next ? (
              <>
                Next up, {fmtDate(next.date)}: <Rich text={next.task} />
              </>
            ) : (
              'Everything on the schedule is behind you.'
            )}
          </p>
        </section>
      )}

      {overdue.length > 0 && (
        <section className="card">
          <h2>
            Catch up <span className="count">{overdue.length}</span>
          </h2>
          <p className="muted">Unchecked days before today. Tick them off, or push them into the next buffer day.</p>
          <ul className="mini-list">
            {overdue.slice(0, 8).map((d) => (
              <li key={d.id}>
                <Check checked={false} onChange={() => toggleDone(d.id)} label={`Mark ${fmtDate(d.date)} done`} />
                <span className="day-date">{fmtDate(d.date)}</span>
                <span className="mini-task">
                  <Rich text={d.task} />
                </span>
              </li>
            ))}
          </ul>
          {overdue.length > 8 && <p className="muted">…and {overdue.length - 8} more in the schedule.</p>}
        </section>
      )}

      <section className="card">
        <h2>Coming up</h2>
        <ul className="mini-list">
          {allDays
            .filter((d) => d.date > today)
            .slice(0, 5)
            .map((d) => (
              <li key={d.id}>
                <span className="day-date">{fmtDate(d.date)}</span>
                <span className="mini-task">
                  <Rich text={d.task} />
                </span>
              </li>
            ))}
        </ul>
      </section>
    </>
  )
}
