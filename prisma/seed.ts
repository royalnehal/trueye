import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Load .env.local so DATABASE_URL is available when running via ts-node
const envFile = path.join(process.cwd(), '.env.local')
if (fs.existsSync(envFile)) {
  const lines = fs.readFileSync(envFile, 'utf-8').split('\n')
  for (const line of lines) {
    const m = line.match(/^([^#=]+)=(.*)$/)
    if (m) {
      const key = m[1].trim()
      const val = m[2].trim().replace(/^["']|["']$/g, '')
      if (!process.env[key]) process.env[key] = val
    }
  }
}

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // ── SiteSettings ───────────────────────────────────────────────────────────
  const settings: { key: string; value: string }[] = [
    { key: 'brand_name', value: 'TruEye' },
    { key: 'brand_parent', value: 'VertexPlus Technologies Limited' },
    { key: 'brand_tagline', value: 'Redefining the Standards of Surveillance Infrastructure' },
    { key: 'brand_subtagline', value: 'Turn Raw Footage Into Actionable Intelligence' },
    { key: 'email_sales', value: 'sales@trueye.io' },
    { key: 'email_general', value: 'contact@trueye.io' },
    { key: 'phone_primary', value: '+91 966 032 6000' },
    { key: 'phone_sales', value: '+91 723 002 7503' },
    { key: 'phone_general', value: '+91 723 088 9911' },
    { key: 'social_linkedin', value: 'https://www.linkedin.com/company/vertexplustrueye/' },
    { key: 'social_instagram', value: 'https://www.instagram.com/vertexplustrueye' },
    { key: 'social_facebook', value: 'https://www.facebook.com/vertexplustrueye/' },
    { key: 'social_twitter', value: 'https://x.com/trueyeworld' },
    { key: 'social_youtube', value: 'https://www.youtube.com/@vertexplustrueye' },
    {
      key: 'geo_entity_paragraph',
      value:
        'TruEye is an AI-powered video analytics solution developed by VertexPlus Technologies Limited. It enables organizations to automatically analyze CCTV and surveillance footage using over 50 artificial intelligence modules, including intrusion detection, face recognition, crowd monitoring, safety gear compliance, and real-time alert generation. TruEye works with existing camera infrastructure and can be deployed on-premise, in the cloud, or at the edge. It serves industries including manufacturing, retail, healthcare, hospitality, aviation, and government. TruEye is a registered trademark of VertexPlus Technologies Limited.',
    },
  ]
  for (const s of settings) {
    await prisma.siteSetting.upsert({ where: { key: s.key }, update: { value: s.value }, create: s })
  }
  console.log('✓ SiteSettings')

  // ── Offices ─────────────────────────────────────────────────────────────────
  await prisma.office.deleteMany()
  await prisma.office.createMany({
    data: [
      { city: 'Jaipur', country: 'India', address: 'B-19, 10-B Scheme, Gopalpura Road, Jaipur, Rajasthan 302018', phone: '+91 141 6622200/02', email: 'info@vertexplus.com', order: 1 },
      { city: 'Noida', country: 'India', address: 'C-56/45, 2 & 3 Floor, Sector-62, Noida, Uttar Pradesh 201301', phone: '+91 141 6622200/02', email: 'info@vertexplus.com', order: 2 },
      { city: 'Georgia', country: 'USA', address: '5070 Jonquilla Dr, Alpharetta, Georgia 30004', phone: '+1 561 990 1920', email: 'us@vertexplus.com', order: 3 },
      { city: 'Dubai', country: 'UAE', address: 'E 109, East Wing-1, Dubai Airport Freezone', phone: '+971 4 371 909', email: 'uae@vertexplus.com', order: 4 },
      { city: 'Vancouver', country: 'Canada', address: '201-110 Cambie Street, Vancouver BC V6B 2M8', phone: '+1 770 400 9545', email: 'canada@vertexplus.com', order: 5 },
      { city: 'Singapore', country: 'Singapore', address: '3 Shenton Way, #09-07 Shenton House, Singapore 068805', phone: '+65 9188 0705', email: 'singapore@vertexplus.com', order: 6 },
      { city: 'Kuala Lumpur', country: 'Malaysia', address: 'Suite 1705A, Level 17, Menara Landmark 12 Jalan Ngee Heng, 80000 Johor Bahru, Johor', phone: '+601 6296 2700', email: 'malaysia@vertexplus.com', order: 7 },
    ],
  })
  console.log('✓ Offices')

  // ── Stats ────────────────────────────────────────────────────────────────────
  await prisma.stat.deleteMany()
  await prisma.stat.createMany({
    data: [
      { value: 50, suffix: '+', prefix: '', label: 'AI Analytics Modules', mono: true, order: 1 },
      { value: 15, suffix: '+', prefix: '', label: 'Industries Served', mono: true, order: 2 },
      { value: 2, suffix: 's', prefix: '<', label: 'Real-Time Alert Speed', mono: true, order: 3 },
      { value: 100, suffix: '%', prefix: '', label: 'Compatible With Existing CCTV', mono: true, order: 4 },
    ],
  })
  console.log('✓ Stats')

  // ── Use Cases ────────────────────────────────────────────────────────────────
  await prisma.useCase.deleteMany()
  await prisma.useCase.createMany({
    data: [
      { title: 'Safety Monitoring', description: 'Detect PPE violations, restricted zone breaches, and unsafe behaviors before accidents occur.', icon: 'Shield', order: 1 },
      { title: 'Machine Failure Prediction', description: 'Flag equipment anomalies in real time. Enable predictive maintenance, eliminate downtime.', icon: 'Settings', order: 2 },
      { title: 'Quality Control', description: 'Automated production line defect detection. Consistent output without manual inspection.', icon: 'CheckCircle', order: 3 },
      { title: 'Inventory Management', description: 'Monitor stock levels 24/7 via camera feeds. Prevent stockouts, overstocking, and losses.', icon: 'Package', order: 4 },
      { title: 'Supply Chain Optimization', description: 'Track goods end-to-end. Identify bottlenecks. Reduce delays across the entire logistics chain.', icon: 'Truck', order: 5 },
      { title: 'Energy Efficiency', description: 'Detect idle equipment and unused lighting zones. Lower costs and reduce environmental footprint.', icon: 'Zap', order: 6 },
      { title: 'Workforce Management', description: 'Analyze movement, task duration, productivity. Optimize staffing without disrupting operations.', icon: 'Users', order: 7 },
      { title: 'Security Surveillance', description: 'Intrusion detection, camera tamper alerts. 24/7 intelligent monitoring across all cameras.', icon: 'Eye', order: 8 },
    ],
  })
  console.log('✓ Use Cases')

  // ── AI Modules ───────────────────────────────────────────────────────────────
  await prisma.aiModule.deleteMany()
  await prisma.aiModule.createMany({
    data: [
      { name: 'Intrusion Detection', description: 'Watches restricted areas for unauthorized access. Triggers alerts when someone enters a secure zone, enabling immediate security response to prevent theft or safety breaches.', order: 1 },
      { name: 'Crowd Detection', description: 'Identifies and monitors crowd formations. Manages event safety, retail flow, and law enforcement scenarios by detecting unusual gatherings or dangerous congestion.', order: 2 },
      { name: 'Camera Tampering Detection', description: 'Detects when cameras are moved, blocked, or obscured. Raises immediate alerts to restore surveillance coverage and maintain system integrity.', order: 3 },
      { name: 'Fire / Smoke Detection', description: 'Uses intelligent video analysis to detect early fire or smoke signs before alarms trigger. Ideal for warehouses, factories, and open-space environments.', order: 4 },
      { name: 'Noise Detection', description: 'Identifies abnormal sounds: breaking glass, gunshots, screams. Adds a non-visual intelligence layer for parking lots, schools, and industrial sites.', order: 5 },
      { name: 'Person In / Out Count', description: 'Tracks entry and exit footfall. Enables occupancy management, safety compliance, and traffic flow optimization in stores, transit hubs, and events.', order: 6 },
      { name: 'Number Plate Recognition', description: 'Reads and logs vehicle registration numbers. Used in traffic enforcement, parking access, toll systems, and secure facility vehicle management.', order: 7 },
      { name: 'Safety Gear Detection', description: 'Detects whether workers wear helmets, vests, or masks. Critical for construction, mining, and manufacturing safety compliance and legal requirements.', order: 8 },
      { name: 'Vehicle Speed Monitoring', description: 'Measures vehicle velocity via video analytics. Enforces speed limits in private grounds, industrial sites, and roads to reduce accident risk.', order: 9 },
      { name: 'Heat Map Generation', description: 'Visualizes activity density using color gradients. Identifies traffic hotspots, underused spaces, and dwell patterns in retail, events, or public areas.', order: 10 },
      { name: 'Illegal Parking Detection', description: 'Identifies vehicles in unauthorized zones or overstaying permitted time. Enforces rules, reduces congestion, improves traffic flow in urban or private lots.', order: 11 },
      { name: 'Loitering Detection', description: 'Flags individuals staying unusually long in one area. Security teams in malls, schools, and banks can monitor and intercept suspicious behavior early.', order: 12 },
      { name: 'Vehicle Moving Direction Monitoring', description: 'Detects wrong-way movement in parking lots, toll booths, or restricted access roads. Prevents collisions and unauthorized entries.', order: 13 },
      { name: 'Object Tagging & Tracking', description: 'Labels and follows specific objects through video frames. Used in surveillance, logistics, and traffic to trace movement patterns and detect anomalies in real time.', order: 14 },
      { name: 'Face Recognition', description: 'Identifies and verifies individuals using biometric facial analysis. Enhances access control, attendance tracking, and surveillance security.', order: 15 },
      { name: 'Machine Efficiency', description: 'Analyzes indicator lights to calculate machine working time, idle time, and hold status. Improves OEE (Overall Equipment Effectiveness) in real time.', order: 16 },
      { name: 'Worker Efficiency', description: 'Tracks operator presence at machines using facial recognition. Verifies correct operator assignment. Improves accountability and time monitoring.', order: 17 },
      { name: 'Phone Detection', description: 'Detects mobile phone use in restricted or operational zones. Reduces distractions, improves safety, and minimizes productivity loss.', order: 18 },
      { name: 'Visitor Entry', description: 'Alerts when unrecognized individuals enter machine or operational areas. Enhances security and ensures only authorized personnel access sensitive zones.', order: 19 },
    ],
  })
  console.log('✓ AI Modules')

  // ── Benefits ─────────────────────────────────────────────────────────────────
  await prisma.benefit.deleteMany()
  await prisma.benefit.createMany({
    data: [
      { icon: 'DollarSign', stat: 'Cost Saving', label: 'Reduce Manual Monitoring Costs', description: 'Replace expensive 24/7 manual monitoring with automated AI surveillance. Reduce operational overhead while increasing coverage.', order: 1 },
      { icon: 'Clock', stat: 'Time Saving', label: 'Real-Time Detection Under 2 Seconds', description: 'TruEye processes and alerts in under 2 seconds. Faster than any human operator can respond to a security event.', order: 2 },
      { icon: 'TrendingUp', stat: 'Productivity', label: 'Automate Routine Surveillance Tasks', description: 'Free your security team to focus on decisions, not screen-watching. TruEye handles detection automatically.', order: 3 },
      { icon: 'ShieldCheck', stat: 'Risk Reduction', label: 'Stop Incidents Before They Escalate', description: 'Proactive detection means intervening before a situation becomes a crisis. Real-time alerts enable immediate response.', order: 4 },
      { icon: 'Lock', stat: 'Theft Reduction', label: '24/7 Intelligent Asset Protection', description: 'Continuous monitoring across all cameras, all zones, all hours — without fatigue or missed events.', order: 5 },
      { icon: 'Target', stat: 'Accuracy', label: 'AI Eliminates Human Error in Monitoring', description: 'Consistent, objective detection every time. No distraction, no fatigue, no missed incidents from human limitations.', order: 6 },
    ],
  })
  console.log('✓ Benefits')

  // ── Industries ───────────────────────────────────────────────────────────────
  await prisma.industry.deleteMany()
  await prisma.industry.createMany({
    data: [
      { name: 'Aviation', icon: 'Plane', order: 1 },
      { name: 'Retail', icon: 'ShoppingBag', order: 2 },
      { name: 'Manufacturing', icon: 'Factory', order: 3 },
      { name: 'Healthcare', icon: 'Heart', order: 4 },
      { name: 'Hospitality', icon: 'Building', order: 5 },
      { name: 'Education', icon: 'GraduationCap', order: 6 },
      { name: 'Transportation', icon: 'Car', order: 7 },
      { name: 'Government', icon: 'Landmark', order: 8 },
      { name: 'Real Estate', icon: 'Home', order: 9 },
      { name: 'Logistics', icon: 'Truck', order: 10 },
      { name: 'Casinos', icon: 'Layers', order: 11 },
      { name: 'Infrastructure', icon: 'Network', order: 12 },
      { name: 'Stadiums', icon: 'MapPin', order: 13 },
      { name: 'Sea Ports', icon: 'Anchor', order: 14 },
    ],
  })
  console.log('✓ Industries')

  // ── Case Studies ─────────────────────────────────────────────────────────────
  await prisma.caseStudy.deleteMany()
  await prisma.caseStudy.createMany({
    data: [
      {
        title: 'Intrusion Detection for Theft Control',
        icon: 'Shield',
        challenge: 'Traditional CCTV monitoring required constant human attention and frequently missed rapid intrusion events',
        solution: 'TruEye deployed real-time intrusion detection across restricted zones. The system generated instant alerts',
        result: 'Immediate security response capability established. Significant reduction in theft incidents.',
        pdf: '/images/VertexPlus_TruEye_Case_IntrusionDetection_TheftControl.pdf',
        order: 1,
      },
      {
        title: 'Safety Monitoring and Improvement',
        icon: 'HardHat',
        challenge: 'Manual workplace safety inspections were inconsistent, time-consuming, and unable to provide continuous coverage',
        solution: 'TruEye automated activity monitoring and risk detection across the facility in real time',
        result: 'Reduced manual oversight costs. Improved worker safety compliance.',
        pdf: '/images/VertexPlus_TruEye_Case_SafetyMonitoring.pdf',
        order: 2,
      },
      {
        title: 'Automated Bag Counting System',
        icon: 'Package',
        challenge: 'Manual bag counting in high-throughput environments was slow, error-prone, and caused inventory inaccuracies',
        solution: 'TruEye video analytics automated the entire bag-counting process using object detection',
        result: 'Faster, more accurate inventory management. Reduced undercounting losses.',
        pdf: '/images/VertexPlus_TruEye_Case_ObjectCounting.pdf',
        order: 3,
      },
    ],
  })
  console.log('✓ Case Studies')

  // ── Comparison Rows ───────────────────────────────────────────────────────────
  await prisma.comparisonRow.deleteMany()
  await prisma.comparisonRow.createMany({
    data: [
      { factor: 'Response time', manual: 'Minutes to hours', trueye: 'Real-time (under 2 sec)', order: 1 },
      { factor: 'Coverage', manual: 'Limited by operators', trueye: '24/7 across all cameras', order: 2 },
      { factor: 'Accuracy', manual: 'Human error prone', trueye: 'Consistent AI detection', order: 3 },
      { factor: 'Scalability', manual: 'Requires more staff', trueye: 'Add cameras, not headcount', order: 4 },
      { factor: 'Cost over time', manual: 'High ongoing staff cost', trueye: 'Lower with automation', order: 5 },
      { factor: 'Reporting', manual: 'Manual logs', trueye: 'Automated dashboards', order: 6 },
      { factor: 'Integration', manual: 'Standalone CCTV', trueye: 'Works with existing VMS', order: 7 },
      { factor: 'Incident prevention', manual: 'Reactive', trueye: 'Proactive, real-time', order: 8 },
    ],
  })
  console.log('✓ Comparison Rows')

  // ── FAQs ─────────────────────────────────────────────────────────────────────
  await prisma.faq.deleteMany()
  await prisma.faq.createMany({
    data: [
      { question: 'Where is Video Analytics used?', answer: 'Video analytics is used in warehouses, offices, retail stores, industrial facilities, healthcare settings, airports, schools, and any location with CCTV cameras.', page: 'homepage', order: 1 },
      { question: 'What are common application areas for Video Analytics?', answer: 'Facial recognition, attendance monitoring, security surveillance, equipment maintenance prediction, product quality inspection, inventory counting, and logistics tracking.', page: 'homepage', order: 2 },
      { question: 'Why do we need Video Analytics?', answer: 'Video analytics eliminates manual CCTV monitoring by automatically detecting anomalies and security threats. It improves situational awareness, response times, and operational efficiency at scale.', page: 'homepage', order: 3 },
      { question: 'How does Video Analytics improve security?', answer: 'By continuously monitoring for unauthorized access, suspicious activity, and security events — then sending real-time alerts to enable immediate response.', page: 'homepage', order: 4 },
      { question: 'Can Video Analytics be used for operational efficiency?', answer: 'Yes. By automating surveillance tasks, optimizing workflows, and providing data-driven insights, video analytics reduces downtime and improves resource use.', page: 'homepage', order: 5 },
      { question: 'How does Video Analytics contribute to inventory management?', answer: 'It counts products on shelves, tracks inventory movement, monitors logistics operations, and ensures accurate stock levels with fewer manual interventions.', page: 'homepage', order: 6 },
    ],
  })
  console.log('✓ FAQs')

  // ── Pricing Tabs ──────────────────────────────────────────────────────────────
  await prisma.pricingTab.deleteMany()
  await prisma.pricingTab.createMany({
    data: [
      { icon: 'Camera', title: 'Hardware and Cameras', body: 'Camera type, quantity, placement all affect analytics accuracy. Resolution, frame rate, bandwidth requirements determine additional hardware needs. Whether your use case demands real-time or on-demand analysis shapes your infrastructure investment significantly.', order: 1 },
      { icon: 'Network', title: 'Network Requirements', body: 'High-volume video data demands strong network infrastructure. Routers, switches, and cabling must handle the bandwidth load of multiple high-resolution feeds. A properly configured network ensures smooth, uninterrupted analytics performance.', order: 2 },
      { icon: 'Server', title: 'Deployment Model', body: 'Single-site or multi-location? Edge, cloud, or hybrid? Each model carries different cost and performance profiles. TruEye supports all deployment architectures and scales as you add cameras or expand to new facilities.', order: 3 },
      { icon: 'Puzzle', title: 'Integrations, Support & Maintenance', body: 'Annual plans cover support, training, and maintenance. Third-party integrations, VMS compatibility, and software updates may carry additional considerations.', order: 4 },
    ],
  })
  console.log('✓ Pricing Tabs')

  // ── Nav Links ─────────────────────────────────────────────────────────────────
  await prisma.navDropdown.deleteMany()
  await prisma.navLink.deleteMany()

  const resourcesNav = await prisma.navLink.create({ data: { label: 'Resources', href: '#', order: 5 } })
  await prisma.navLink.createMany({
    data: [
      { label: 'Product', href: '/product', order: 1 },
      { label: 'Pricing', href: '/pricing', order: 2 },
      { label: 'Partners', href: '/becomeapartner', order: 3 },
      { label: 'Case Studies', href: '/case-studies', order: 4 },
      { label: 'Contact Us', href: '/contact', order: 6 },
    ],
  })
  await prisma.navDropdown.createMany({
    data: [
      { label: 'Documentation', href: '/resources', order: 1, navLinkId: resourcesNav.id },
      { label: 'Blog', href: '/blog', order: 2, navLinkId: resourcesNav.id },
    ],
  })
  console.log('✓ Nav Links')

  // ── Footer Links ──────────────────────────────────────────────────────────────
  await prisma.footerLink.deleteMany()
  await prisma.footerLink.createMany({
    data: [
      { column: 'solution', label: 'Product Overview', href: '/product', external: false, order: 1 },
      { column: 'solution', label: 'Request Demo', href: '/#requestdemo', external: false, order: 2 },
      { column: 'solution', label: 'Product Presentation', href: '/images/TruEye-Product.pdf', external: false, order: 3 },
      { column: 'resources', label: 'Documentation', href: '/resources', external: false, order: 1 },
      { column: 'resources', label: 'Prime Guide eBook', href: '/images/TruEye-PrimeGuide.pdf', external: false, order: 2 },
      { column: 'resources', label: 'Blog', href: '/blog', external: false, order: 3 },
      { column: 'resources', label: 'Case Studies', href: '/case-studies', external: false, order: 4 },
      { column: 'company', label: 'About VertexPlus', href: 'https://www.vertexplus.com/global/en/company', external: true, order: 1 },
      { column: 'company', label: 'Careers', href: 'https://www.vertexplus.com/global/en/career', external: true, order: 2 },
    ],
  })
  console.log('✓ Footer Links')

  // ── Blog Posts from MDX files ─────────────────────────────────────────────────
  const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')
  if (fs.existsSync(BLOG_DIR)) {
    const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'))
    for (const file of files) {
      const slug = file.replace('.mdx', '')
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8')
      const { data, content } = matter(raw)
      await prisma.blogPost.upsert({
        where: { slug },
        update: {
          title: data.title ?? '',
          description: data.description ?? '',
          content,
          date: data.date ? String(data.date).split('T')[0] : new Date().toISOString().split('T')[0],
          author: data.author ?? 'TruEye Team',
          category: data.category ?? 'Video Analytics',
          coverImage: data.coverImage ?? null,
          published: true,
        },
        create: {
          slug,
          title: data.title ?? '',
          description: data.description ?? '',
          content,
          date: data.date ? String(data.date).split('T')[0] : new Date().toISOString().split('T')[0],
          author: data.author ?? 'TruEye Team',
          category: data.category ?? 'Video Analytics',
          coverImage: data.coverImage ?? null,
          published: true,
        },
      })
    }
    console.log(`✓ Blog Posts (${files.length} seeded)`)
  }

  console.log('Seeding complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
