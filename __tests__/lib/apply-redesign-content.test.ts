/**
 * @jest-environment node
 */
import { replaceZoomPlaceholder } from '@/scripts/apply-redesign-content'

describe('replaceZoomPlaceholder', () => {
  it('replaces the placeholder in Portable Text spans and keeps everything else', () => {
    const blocks = [
      { _type: 'block', _key: 'a', children: [{ _type: 'span', _key: 's', text: 'Pray online at 9:00 AM ([Zoom link to come]), and join us.', marks: [] }] },
      { _type: 'block', _key: 'b', children: [{ _type: 'span', _key: 't', text: 'Unchanged.', marks: ['em'] }] },
    ]
    expect(replaceZoomPlaceholder(blocks)).toEqual([
      { ...blocks[0], children: [{ ...blocks[0].children[0], text: 'Pray online at 9:00 AM (on Zoom), and join us.' }] },
      blocks[1],
    ])
  })

  it('returns null when there is nothing to replace', () => {
    expect(replaceZoomPlaceholder([{ _type: 'span', text: 'Nothing here' }])).toBeNull()
    expect(replaceZoomPlaceholder(undefined)).toBeNull()
  })
})
