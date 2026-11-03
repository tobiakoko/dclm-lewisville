import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ImageResponse } from 'next/og'
import { SITE_CONFIG, formatAddress } from '@/lib/constants'
import { getSiteData } from '@/lib/data'

export const alt = `${SITE_CONFIG.name}: members of the congregation together for a group photo`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Paths are written out in full so the build traces only these two files, not the whole project
const toDataUrl = (bytes: Buffer, mime: string) => `data:${mime};base64,${bytes.toString('base64')}`

/** Share image (BUILD-PLAN 2.14): a real congregation photo, the emblem and the church's name */
export default async function OpenGraphImage() {
  const [{ config }, photo, emblem] = await Promise.all([
    getSiteData(),
    readFile(path.join(process.cwd(), 'app', '_og', 'congregation-1200.jpg')).then((b) => toDataUrl(b, 'image/jpeg')),
    readFile(path.join(process.cwd(), 'public', 'dclm_logo.png')).then((b) => toDataUrl(b, 'image/png')),
  ])

  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', position: 'relative', fontFamily: 'serif' }}>
        <img src={photo} alt="" width={1200} height={900} style={{ position: 'absolute', top: -135, left: 0, width: 1200, height: 900, objectFit: 'cover' }} />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 250,
            display: 'flex',
            alignItems: 'center',
            gap: 32,
            padding: '0 56px',
            background: 'rgba(15, 37, 66, 0.92)',
            color: '#ffffff',
          }}
        >
          <img src={emblem} alt="" width={150} height={135} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1 }}>{config.name}</div>
            <div style={{ fontSize: 30 }}>{formatAddress(config.address)}</div>
          </div>
        </div>
      </div>
    ),
    size
  )
}
