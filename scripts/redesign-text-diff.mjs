// Gate 4 copy check: compares the `main` text saved before and after the redesign
// (docs/build/redesign-before/text and redesign-after/text) and prints every changed line.
// Usage: node scripts/redesign-text-diff.mjs
import { existsSync, readdirSync, readFileSync } from 'fs'
import path from 'path'

const ROOT = path.join(process.cwd(), 'docs/build')
const before = path.join(ROOT, 'redesign-before/text')
const after = path.join(ROOT, 'redesign-after/text')
for (const dir of [before, after]) {
  if (!existsSync(dir)) {
    console.error(`Missing ${path.relative(process.cwd(), dir)}. Run npm run redesign:capture -- ${dir.includes('before') ? 'before' : 'after'}`)
    process.exit(2)
  }
}

// Layout changes reorder and re-wrap text, so compare the set of non-empty lines per page
const linesOf = (file) =>
  new Set(readFileSync(file, 'utf8').split('\n').map((line) => line.trim()).filter(Boolean))

let changed = 0
for (const name of readdirSync(before).filter((file) => file.endsWith('.txt')).sort()) {
  const afterFile = path.join(after, name)
  if (!existsSync(afterFile)) {
    console.log(`\n## ${name}: no "after" capture`)
    changed++
    continue
  }
  const old = linesOf(path.join(before, name))
  const now = linesOf(afterFile)
  const removed = [...old].filter((line) => !now.has(line))
  const added = [...now].filter((line) => !old.has(line))
  if (removed.length === 0 && added.length === 0) continue
  changed++
  console.log(`\n## ${name}`)
  for (const line of removed) console.log(`- ${line}`)
  for (const line of added) console.log(`+ ${line}`)
}
console.log(changed ? `\n${changed} page captures differ; every change must be listed in REDESIGN.md §7.` : 'No copy changes.')
