// Lightweight Markdown -> HTML converter for the admin preview pane.
// Not a full MDX renderer — just enough to preview headings, lists,
// tables, links, and emphasis before publishing.

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function renderInline(text: string): string {
  let result = escapeHtml(text)
  result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  result = result.replace(/(?<!\*)\*(?!\*)(.+?)\*(?!\*)/g, '<em>$1</em>')
  result = result.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
  return result
}

export function markdownToHtml(markdown: string): string {
  const lines = markdown.split('\n')
  const html: string[] = []
  let listItems: string[] = []
  let listType: 'ul' | 'ol' | null = null
  let tableRows: string[][] = []
  let inTable = false

  const flushList = () => {
    if (listItems.length && listType) {
      html.push(`<${listType}>${listItems.map((i) => `<li>${renderInline(i)}</li>`).join('')}</${listType}>`)
    }
    listItems = []
    listType = null
  }

  const flushTable = () => {
    if (tableRows.length) {
      const [header, , ...rows] = tableRows
      html.push('<table>')
      if (header) {
        html.push(`<thead><tr>${header.map((c) => `<th>${renderInline(c)}</th>`).join('')}</tr></thead>`)
      }
      html.push('<tbody>')
      for (const row of rows) {
        html.push(`<tr>${row.map((c) => `<td>${renderInline(c)}</td>`).join('')}</tr>`)
      }
      html.push('</tbody></table>')
    }
    tableRows = []
    inTable = false
  }

  for (const rawLine of lines) {
    const line = rawLine.trimEnd()

    if (line.includes('|') && line.trim().startsWith('|')) {
      inTable = true
      const cells = line.trim().slice(1, -1).split('|').map((c) => c.trim())
      if (!cells.every((c) => /^-+$/.test(c))) {
        tableRows.push(cells)
      }
      continue
    } else if (inTable) {
      flushTable()
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/)
    if (headingMatch) {
      flushList()
      const level = headingMatch[1].length
      html.push(`<h${level}>${renderInline(headingMatch[2])}</h${level}>`)
      continue
    }

    const ulMatch = line.match(/^[-*]\s+(.*)$/)
    const olMatch = line.match(/^\d+\.\s+(.*)$/)
    if (ulMatch) {
      if (listType !== 'ul') flushList()
      listType = 'ul'
      listItems.push(ulMatch[1])
      continue
    }
    if (olMatch) {
      if (listType !== 'ol') flushList()
      listType = 'ol'
      listItems.push(olMatch[1])
      continue
    }

    flushList()

    if (line.trim() === '') {
      continue
    }

    html.push(`<p>${renderInline(line)}</p>`)
  }

  flushList()
  flushTable()

  return html.join('\n')
}
