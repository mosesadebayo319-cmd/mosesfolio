import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt =
  'Moses Adebayo — Digital Marketing Expert in Abuja, Nigeria'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#0f172a',
          padding: 72,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            width: 80,
            height: 6,
            background: '#14b8a6',
            borderRadius: 8,
            marginBottom: 36,
          }}
        />
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: '#f8f9fa',
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          Moses Adebayo
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#14b8a6',
            marginTop: 20,
            fontWeight: 600,
          }}
        >
          Digital Marketing Expert · Abuja
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#cbd5e1',
            marginTop: 24,
            maxWidth: 800,
          }}
        >
          SEO · Social Media · Ads · Websites · mosesfolio.online
        </div>
      </div>
    ),
    { ...size }
  )
}
