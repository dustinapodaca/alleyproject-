import { useCallback, useEffect, useState } from 'react'
import { weeks, type Day } from './data/plan'

export type Status = 0 | 1 | 2
export const STATUS_LABELS = ['To do', 'In progress', 'Done'] as const

export type Store = {
  done: Record<string, boolean>
  status: Record<string, Status>
  notes: Record<string, string>
}

const KEY = 'mill-alley-tracker.v1'
const empty: Store = { done: {}, status: {}, notes: {} }

function load(): Store {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return empty
    const parsed = JSON.parse(raw) as Partial<Store>
    return { done: parsed.done ?? {}, status: parsed.status ?? {}, notes: parsed.notes ?? {} }
  } catch {
    return empty
  }
}

export function useStore() {
  const [store, setStore] = useState<Store>(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(store))
    } catch {
      /* storage unavailable: keep working in memory */
    }
  }, [store])

  const toggleDone = useCallback((id: string) => {
    setStore((s) => ({ ...s, done: { ...s.done, [id]: !s.done[id] } }))
  }, [])

  const cycleStatus = useCallback((id: string) => {
    setStore((s) => ({ ...s, status: { ...s.status, [id]: (((s.status[id] ?? 0) + 1) % 3) as Status } }))
  }, [])

  const setNote = useCallback((id: string, text: string) => {
    setStore((s) => ({ ...s, notes: { ...s.notes, [id]: text } }))
  }, [])

  const replace = useCallback((next: Store) => setStore(next), [])

  return { store, toggleDone, cycleStatus, setNote, replace }
}

export type StoreApi = ReturnType<typeof useStore>

/** Today's date as YYYY-MM-DD in the viewer's local time zone. */
export function todayISO(): string {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function parts(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return { y, m, d, dow: new Date(Date.UTC(y, m - 1, d)).getUTCDay() }
}

export function fmtDate(iso: string, withDow = true): string {
  const p = parts(iso)
  return `${withDow ? DOW[p.dow] + ' ' : ''}${MONTHS[p.m - 1]} ${p.d}`
}

export function dayNumber(iso: string): number {
  const p = parts(iso)
  return Date.UTC(p.y, p.m - 1, p.d) / 864e5
}

export function daysBetween(a: string, b: string): number {
  return dayNumber(b) - dayNumber(a)
}

export function isDayOff(iso: string): boolean {
  const dow = parts(iso).dow
  return dow === 3 || dow === 4
}

export const allDays: (Day & { week: number })[] = weeks.flatMap((w) => w.days.map((d) => ({ ...d, week: w.n })))
export const productionDays = allDays.filter((d) => !d.buffer)
