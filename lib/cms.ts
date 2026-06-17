import { prisma } from './db'

// ── Settings ──────────────────────────────────────────────────────────────────
export async function getSettings() {
  const rows = await prisma.siteSetting.findMany()
  const map: Record<string, string> = {}
  for (const r of rows) map[r.key] = r.value
  return {
    brand: {
      name: map.brand_name ?? 'TruEye',
      parent: map.brand_parent ?? 'VertexPlus Technologies Limited',
      tagline: map.brand_tagline ?? '',
      subTagline: map.brand_subtagline ?? '',
    },
    email: {
      sales: map.email_sales ?? 'sales@trueye.io',
      general: map.email_general ?? 'contact@trueye.io',
    },
    phone: {
      primary: map.phone_primary ?? '',
      sales: map.phone_sales ?? '',
      general: map.phone_general ?? '',
    },
    social: {
      linkedin: map.social_linkedin ?? '',
      instagram: map.social_instagram ?? '',
      facebook: map.social_facebook ?? '',
      twitter: map.social_twitter ?? '',
      youtube: map.social_youtube ?? '',
    },
    geo: {
      entityParagraph: map.geo_entity_paragraph ?? '',
    },
    raw: map,
  }
}

// ── Offices ───────────────────────────────────────────────────────────────────
export async function getOffices() {
  return prisma.office.findMany({ orderBy: { order: 'asc' } })
}

// ── Stats ─────────────────────────────────────────────────────────────────────
export async function getStats() {
  return prisma.stat.findMany({ orderBy: { order: 'asc' } })
}

// ── Use Cases ─────────────────────────────────────────────────────────────────
export async function getUseCases() {
  return prisma.useCase.findMany({ orderBy: { order: 'asc' } })
}

// ── AI Modules ────────────────────────────────────────────────────────────────
export async function getAiModules() {
  return prisma.aiModule.findMany({ orderBy: { order: 'asc' } })
}

// ── Benefits ──────────────────────────────────────────────────────────────────
export async function getBenefits() {
  return prisma.benefit.findMany({ orderBy: { order: 'asc' } })
}

// ── Industries ────────────────────────────────────────────────────────────────
export async function getIndustries() {
  return prisma.industry.findMany({ orderBy: { order: 'asc' } })
}

// ── FAQs ──────────────────────────────────────────────────────────────────────
export async function getFaqs(page?: string) {
  return prisma.faq.findMany({
    where: page ? { page } : undefined,
    orderBy: { order: 'asc' },
  })
}

// ── Case Studies ──────────────────────────────────────────────────────────────
export async function getCaseStudies() {
  return prisma.caseStudy.findMany({ orderBy: { order: 'asc' } })
}

// ── Comparison Rows ───────────────────────────────────────────────────────────
export async function getComparisonRows() {
  return prisma.comparisonRow.findMany({ orderBy: { order: 'asc' } })
}

// ── Pricing Tabs ──────────────────────────────────────────────────────────────
export async function getPricingTabs() {
  return prisma.pricingTab.findMany({ orderBy: { order: 'asc' } })
}

// ── Nav Links ─────────────────────────────────────────────────────────────────
export async function getNavLinks() {
  return prisma.navLink.findMany({
    orderBy: { order: 'asc' },
    include: { dropdown: { orderBy: { order: 'asc' } } },
  })
}

// ── Footer Links ──────────────────────────────────────────────────────────────
export async function getFooterLinks() {
  return prisma.footerLink.findMany({ orderBy: [{ column: 'asc' }, { order: 'asc' }] })
}

// ── Blog ──────────────────────────────────────────────────────────────────────
export async function getAllBlogPosts() {
  return prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { date: 'desc' },
  })
}

export async function getBlogPostBySlug(slug: string) {
  return prisma.blogPost.findUnique({ where: { slug } })
}
