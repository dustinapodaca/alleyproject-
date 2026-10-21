import { Fragment, type ReactNode } from 'react'

// A small Markdown renderer for the lesson text: #### headings, paragraphs, numbered and bulleted
// lists (one level of nesting), **bold**, *italic*, `code` and [links](url).

function inline(text: string, key = 'i'): ReactNode[] {
  const out: ReactNode[] = []
  const re = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|\[([^\]]+)\]\(([^)\s]+)\))/g
  let last = 0
  let m: RegExpExecArray | null
  let n = 0
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(<Fragment key={`${key}${n++}`}>{text.slice(last, m.index)}</Fragment>)
    if (m[2] !== undefined) out.push(<strong key={`${key}${n++}`}>{inline(m[2], `${key}b${n}`)}</strong>)
    else if (m[3] !== undefined) out.push(<em key={`${key}${n++}`}>{inline(m[3], `${key}e${n}`)}</em>)
    else if (m[4] !== undefined) out.push(<code key={`${key}${n++}`}>{m[4]}</code>)
    else
      out.push(
        <a key={`${key}${n++}`} href={m[6]} target="_blank" rel="noreferrer">
          {m[5]} ↗
        </a>,
      )
    last = m.index + m[0].length
  }
  if (last < text.length) out.push(<Fragment key={`${key}${n++}`}>{text.slice(last)}</Fragment>)
  return out
}

type Item = { text: string; sub: string[] }
type Block = { kind: 'h'; text: string } | { kind: 'p'; text: string } | { kind: 'ol' | 'ul'; items: Item[] }

function parse(md: string): Block[] {
  const blocks: Block[] = []
  let para: string[] = []
  const flush = () => {
    if (para.length) blocks.push({ kind: 'p', text: para.join(' ') })
    para = []
  }
  for (const raw of md.split('\n')) {
    const line = raw.trimEnd()
    if (!line.trim()) {
      flush()
      continue
    }
    const h = line.match(/^#{2,4} (.*)$/)
    const ol = line.match(/^\d+\. (.*)$/)
    const ul = line.match(/^- (.*)$/)
    const sub = line.match(/^\s{2,}- (.*)$/)
    const prev = blocks[blocks.length - 1]
    if (h) {
      flush()
      blocks.push({ kind: 'h', text: h[1] })
    } else if (sub && !para.length && prev && prev.kind !== 'h' && prev.kind !== 'p') {
      prev.items[prev.items.length - 1].sub.push(sub[1])
    } else if (ol || ul) {
      flush()
      const kind = ol ? 'ol' : 'ul'
      const text = (ol ?? ul)![1]
      if (prev && prev.kind === kind) prev.items.push({ text, sub: [] })
      else blocks.push({ kind, items: [{ text, sub: [] }] })
    } else if (line.startsWith('**') && para.length) {
      // "**Goal:** …" and "**Time:** …" lines each start a new paragraph
      flush()
      para.push(line)
    } else {
      para.push(line.trim())
    }
  }
  flush()
  return blocks
}

export function Md({ text }: { text: string }) {
  return (
    <div className="md">
      {parse(text).map((b, i) => {
        if (b.kind === 'h') return <h4 key={i}>{inline(b.text)}</h4>
        if (b.kind === 'p') return <p key={i}>{inline(b.text)}</p>
        const List = b.kind
        return (
          <List key={i}>
            {b.items.map((it, j) => (
              <li key={j}>
                {inline(it.text)}
                {it.sub.length > 0 && (
                  <ul>
                    {it.sub.map((s, k) => (
                      <li key={k}>{inline(s)}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </List>
        )
      })}
    </div>
  )
}
