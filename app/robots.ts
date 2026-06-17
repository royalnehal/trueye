import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/disclaimer', '/privacy-policy', '/terms-of-use', '/admin', '/api/'],
      },
    ],
    sitemap: 'https://www.trueye.io/sitemap.xml',
  }
}
