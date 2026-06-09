import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') ?? 'AI Video Analytics Solution'
  const description =
    searchParams.get('description') ??
    'TruEye by VertexPlus Technologies — 50+ AI modules for intelligent surveillance.'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          background: '#050A14',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(0,212,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.05) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Cyan glow blob */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '60px 80px',
            flex: 1,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '48px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '2px solid #00D4FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,212,255,0.1)',
              }}
            >
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: '#00D4FF',
                }}
              />
            </div>
            <span
              style={{
                color: '#F0F4FF',
                fontSize: '28px',
                fontWeight: 700,
                letterSpacing: '-0.5px',
              }}
            >
              TruEye
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              color: '#F0F4FF',
              fontSize: title.length > 50 ? '48px' : '56px',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-1px',
              maxWidth: '900px',
              marginBottom: '24px',
            }}
          >
            {title}
          </div>

          {/* Description */}
          <div
            style={{
              color: '#6B7FA3',
              fontSize: '22px',
              lineHeight: 1.5,
              maxWidth: '800px',
              flex: 1,
            }}
          >
            {description}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            height: '6px',
            background: 'linear-gradient(90deg, #00D4FF, #0066FF)',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}
        />

        {/* Bottom right domain */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            right: '80px',
            color: '#00D4FF',
            fontSize: '18px',
            fontWeight: 600,
          }}
        >
          trueye.io
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
