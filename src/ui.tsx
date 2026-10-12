import { Fragment, type ReactNode } from 'react'
import { STATUS_LABELS, type Status } from './lib'

/** Renders `code` spans written with backticks in the plan text. */
export function Rich({ text }: { text: string }) {
  const bits = text.split('`')
  return (
    <>
      {bits.map((b, i) => (i % 2 ? <code key={i}>{b}</code> : <Fragment key={i}>{b}</Fragment>))}
    </>
  )
}

export function Progress({ value, total, label }: { value: number; total: number; label?: string }) {
  const pct = total ? Math.round((value / total) * 100) : 0
  return (
    <div className="progress" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label ?? 'Progress'}>
      <div className="progress-fill" style={{ width: `${pct}%` }} />
    </div>
  )
}

export function Check({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button type="button" className={`check ${checked ? 'is-checked' : ''}`} onClick={onChange} aria-pressed={checked} aria-label={label}>
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}

export function StatusChip({ status, onClick }: { status: Status; onClick: () => void }) {
  return (
    <button type="button" className={`chip status-${status}`} onClick={onClick} title="Click to change status">
      <span className="dot" aria-hidden="true" />
      {STATUS_LABELS[status]}
    </button>
  )
}

export function PageHead({ kicker, title, lead, children }: { kicker: string; title: string; lead?: ReactNode; children?: ReactNode }) {
  return (
    <header className="page-head">
      <p className="kicker">{kicker}</p>
      <h1>{title}</h1>
      {lead && <p className="lead">{lead}</p>}
      {children}
    </header>
  )
}

export function Priority({ p }: { p?: string }) {
  if (!p) return null
  return <span className={`prio prio-${p.toLowerCase()}`}>{p}</span>
}

/** Small colour square matching the paint-over ID map. Renders nothing when there's no colour. */
export function IdSwatch({ color }: { color?: string }) {
  if (!color) return null
  return <span className="swatch" style={{ background: color }} title={`ID map colour ${color}`} aria-hidden="true" />
}
