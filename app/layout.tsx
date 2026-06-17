import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono, Poppins } from 'next/font/google'
import '@/styles/globals.css'
import SiteShell from '@/components/layout/SiteShell'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: true,
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: false,
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.trueye.io'),
  title: {
    default: 'TruEye -  Video Analytics Solution by VertexPlus',
    template: '%s | TruEye',
  },
  description:
    'TruEye by VertexPlus Technologies is a video analytics solution that helps users extract valuable insights from their video surveillance content',
  keywords: [
    'TruEye',
    'Video Analytics Solution',
    'Video Analytics software',
    'video analytics',
  ],
  authors: [{ name: 'VertexPlus Technologies Limited' }],
  creator: 'VertexPlus Technologies Limited',
  publisher: 'VertexPlus Technologies Limited',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'QRQOLDXlX-8hXg24iMvgZ0GRvVAxTrSkSSWjZe75Yg8',
  },
  openGraph: {
    type: 'website',
    siteName: 'TruEye',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@trueyeworld',
    creator: '@trueyeworld',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TruEye',
  legalName: 'VertexPlus Technologies Limited',
  url: 'https://www.trueye.io',
  logo: 'https://www.trueye.io/images/logo.webp',
  description:
    'TruEye is an AI-powered video analytics solution with 50+ modules for intelligent surveillance, security automation, and operational intelligence.',
  email: 'contact@trueye.io',
  telephone: '+919660326000',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'B-19, 10-B Scheme, Gopalpura Road',
    addressLocality: 'Jaipur',
    addressRegion: 'Rajasthan',
    postalCode: '302018',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.linkedin.com/company/vertexplustrueye/',
    'https://www.instagram.com/vertexplustrueye',
    'https://www.facebook.com/vertexplustrueye/',
    'https://x.com/trueyeworld',
    'https://www.youtube.com/@vertexplustrueye',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+919660326000',
    contactType: 'sales',
    email: 'sales@trueye.io',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${poppins.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-17E53PEFWX" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-17E53PEFWX');`,
          }}
        />
      </head>
      <body className="bg-[#050A14] text-[#F0F4FF] font-inter antialiased">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
