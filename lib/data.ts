export const SITE_URL = 'https://www.trueye.io'

export const BRAND = {
  name: 'TruEye',
  parent: 'VertexPlus Technologies Limited',
  tagline: 'Redefining the Standards of Surveillance Infrastructure',
  subTagline: 'Turn Raw Footage Into Actionable Intelligence',
  email: {
    sales: 'sales@trueye.io',
    general: 'contact@trueye.io',
  },
  phone: {
    primary: '+91 7230 926 926',
    sales: '+91 723 002 7503',
    general: '+91 723 088 9911',
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/vertexplustrueye/',
    instagram: 'https://www.instagram.com/vertexplustrueye',
    facebook: 'https://www.facebook.com/vertexplustrueye/',
    twitter: 'https://x.com/trueyeworld',
    youtube: 'https://www.youtube.com/@vertexplustrueye',
  },
  offices: [
    {
      city: 'Jaipur',
      country: 'India',
      address: 'B-19, 10-B Scheme, Gopalpura Road, Jaipur, Rajasthan 302018',
      phone: '+91 141 6622200/02',
      email: 'info@vertexplus.com',
    },
    {
      city: 'Noida',
      country: 'India',
      address: 'C-56/45, 2 & 3 Floor, Sector-62, Noida, Uttar Pradesh 201301',
      phone: '+91 141 6622200/02',
      email: 'info@vertexplus.com',
    },
    {
      city: 'Georgia',
      country: 'USA',
      address: '5070 Jonquilla Dr, Alpharetta, Georgia 30004',
      phone: '+1 561 990 1920',
      email: 'us@vertexplus.com',
    },
    {
      city: 'Dubai',
      country: 'UAE',
      address: 'E 109, East Wing-1, Dubai Airport Freezone',
      phone: '371909',
      email: 'uae@vertexplus.com',
    },
    {
      city: 'Vancouver',
      country: 'Canada',
      address: '201-110 Cambie Street, Vancouver BC V6B 2M8',
      phone: '+1 770 400 9545',
      email: 'canada@vertexplus.com',
    },
    {
      city: 'Singapore',
      country: 'Singapore',
      address: '3 Shenton Way, #09-07 Shenton House, Singapore 068805',
      phone: '+65 9188 0705',
      email: 'singapore@vertexplus.com',
    },
    {
      city: 'Kuala Lumpur',
      country: 'Malaysia',
      address: 'Suite 1705A, Level 17, Menara Landmark 12 Jalan Ngee Heng, 80000 Johor Bahru, Johor',
      phone: '+601 6296 2700',
      email: 'malaysia@vertexplus.com',
    },
  ],
}

export const GEO_ENTITY_PARAGRAPH =
  'TruEye is an AI-powered video analytics solution developed by VertexPlus Technologies Limited. It enables organizations to automatically analyze CCTV and surveillance footage using over 50 artificial intelligence modules, including intrusion detection, face recognition, crowd monitoring, safety gear compliance, and real-time alert generation. TruEye works with existing camera infrastructure and can be deployed on-premise, in the cloud, or at the edge. It serves industries including manufacturing, retail, healthcare, hospitality, aviation, and government. TruEye is a registered trademark of VertexPlus Technologies Limited.'

export const STATS = [
  { value: 50, suffix: '+', label: 'AI Analytics Modules', mono: true },
  { value: 15, suffix: '+', label: 'Industries Served', mono: true },
  { value: 2, prefix: '<', suffix: 's', label: 'Real-Time Alert Speed', mono: true },
  { value: 100, suffix: '%', label: 'Compatible With Existing CCTV', mono: true },
]

export const USE_CASES = [
  {
    id: 'safety',
    title: 'Safety Monitoring',
    description:
      'Detect PPE violations, restricted zone breaches, and unsafe behaviors before accidents occur.',
    icon: 'Shield',
  },
  {
    id: 'machine',
    title: 'Machine Failure Prediction',
    description:
      'Flag equipment anomalies in real time. Enable predictive maintenance, eliminate downtime.',
    icon: 'Settings',
  },
  {
    id: 'quality',
    title: 'Quality Control',
    description:
      'Automated production line defect detection. Consistent output without manual inspection.',
    icon: 'CheckCircle',
  },
  {
    id: 'inventory',
    title: 'Inventory Management',
    description:
      'Monitor stock levels 24/7 via camera feeds. Prevent stockouts, overstocking, and losses.',
    icon: 'Package',
  },
  {
    id: 'supply-chain',
    title: 'Supply Chain Optimization',
    description:
      'Track goods end-to-end. Identify bottlenecks. Reduce delays across the entire logistics chain.',
    icon: 'Truck',
  },
  {
    id: 'energy',
    title: 'Energy Efficiency',
    description:
      'Detect idle equipment and unused lighting zones. Lower costs and reduce environmental footprint.',
    icon: 'Zap',
  },
  {
    id: 'workforce',
    title: 'Workforce Management',
    description:
      'Analyze movement, task duration, productivity. Optimize staffing without disrupting operations.',
    icon: 'Users',
  },
  {
    id: 'security',
    title: 'Security Surveillance',
    description:
      'Intrusion detection, camera tamper alerts. 24/7 intelligent monitoring across all cameras.',
    icon: 'Eye',
  },
]

export const AI_MODULES = [
  {
    id: 1,
    name: 'Intrusion Detection',
    description:
      'Watches restricted areas for unauthorized access. Triggers alerts when someone enters a secure zone, enabling immediate security response to prevent theft or safety breaches.',
  },
  {
    id: 2,
    name: 'Crowd Detection',
    description:
      'Identifies and monitors crowd formations. Manages event safety, retail flow, and law enforcement scenarios by detecting unusual gatherings or dangerous congestion.',
  },
  {
    id: 3,
    name: 'Camera Tampering Detection',
    description:
      'Detects when cameras are moved, blocked, or obscured. Raises immediate alerts to restore surveillance coverage and maintain system integrity.',
  },
  {
    id: 4,
    name: 'Fire / Smoke Detection',
    description:
      'Uses intelligent video analysis to detect early fire or smoke signs before alarms trigger. Ideal for warehouses, factories, and open-space environments.',
  },
  {
    id: 5,
    name: 'Noise Detection',
    description:
      'Identifies abnormal sounds: breaking glass, gunshots, screams. Adds a non-visual intelligence layer for parking lots, schools, and industrial sites.',
  },
  {
    id: 6,
    name: 'Person In / Out Count',
    description:
      'Tracks entry and exit footfall. Enables occupancy management, safety compliance, and traffic flow optimization in stores, transit hubs, and events.',
  },
  {
    id: 7,
    name: 'Number Plate Recognition',
    description:
      'Reads and logs vehicle registration numbers. Used in traffic enforcement, parking access, toll systems, and secure facility vehicle management.',
  },
  {
    id: 8,
    name: 'Safety Gear Detection',
    description:
      'Detects whether workers wear helmets, vests, or masks. Critical for construction, mining, and manufacturing safety compliance and legal requirements.',
  },
  {
    id: 9,
    name: 'Vehicle Speed Monitoring',
    description:
      'Measures vehicle velocity via video analytics. Enforces speed limits in private grounds, industrial sites, and roads to reduce accident risk.',
  },
  {
    id: 10,
    name: 'Heat Map Generation',
    description:
      'Visualizes activity density using color gradients. Identifies traffic hotspots, underused spaces, and dwell patterns in retail, events, or public areas.',
  },
  {
    id: 11,
    name: 'Illegal Parking Detection',
    description:
      'Identifies vehicles in unauthorized zones or overstaying permitted time. Enforces rules, reduces congestion, improves traffic flow in urban or private lots.',
  },
  {
    id: 12,
    name: 'Loitering Detection',
    description:
      'Flags individuals staying unusually long in one area. Security teams in malls, schools, and banks can monitor and intercept suspicious behavior early.',
  },
  {
    id: 13,
    name: 'Vehicle Moving Direction Monitoring',
    description:
      'Detects wrong-way movement in parking lots, toll booths, or restricted access roads. Prevents collisions and unauthorized entries.',
  },
  {
    id: 14,
    name: 'Object Tagging & Tracking',
    description:
      'Labels and follows specific objects through video frames. Used in surveillance, logistics, and traffic to trace movement patterns and detect anomalies in real time.',
  },
  {
    id: 15,
    name: 'Face Recognition',
    description:
      'Identifies and verifies individuals using biometric facial analysis. Enhances access control, attendance tracking, and surveillance security.',
  },
  {
    id: 16,
    name: 'Machine Efficiency',
    description:
      'Analyzes indicator lights to calculate machine working time, idle time, and hold status. Improves OEE (Overall Equipment Effectiveness) in real time.',
  },
  {
    id: 17,
    name: 'Worker Efficiency',
    description:
      'Tracks operator presence at machines using facial recognition. Verifies correct operator assignment. Improves accountability and time monitoring.',
  },
  {
    id: 18,
    name: 'Phone Detection',
    description:
      'Detects mobile phone use in restricted or operational zones. Reduces distractions, improves safety, and minimizes productivity loss.',
  },
  {
    id: 19,
    name: 'Visitor Entry',
    description:
      'Alerts when unrecognized individuals enter machine or operational areas. Enhances security and ensures only authorized personnel access sensitive zones.',
  },
]

export const MODULE_MARQUEE_ROW1 = [
  'Intrusion Detection',
  'Crowd Detection',
  'Face Recognition',
  'Number Plate Recognition',
  'Safety Gear Detection',
  'Heat Map Generation',
  'Loitering Detection',
  'Fire Detection',
  'Noise Detection',
]

export const MODULE_MARQUEE_ROW2 = [
  'Vehicle Speed Monitoring',
  'Object Tracking',
  'Camera Tampering',
  'Person Count',
  'Machine Efficiency',
  'Worker Efficiency',
  'Phone Detection',
  'Visitor Entry',
  'Illegal Parking',
  'Vehicle Direction',
]

export const BENEFITS = [
  {
    icon: 'DollarSign',
    stat: 'Cost Saving',
    label: 'Reduce Manual Monitoring Costs',
    description:
      'Replace expensive 24/7 manual monitoring with automated AI surveillance. Reduce operational overhead while increasing coverage.',
  },
  {
    icon: 'Clock',
    stat: 'Time Saving',
    label: 'Real-Time Detection Under 2 Seconds',
    description:
      'TruEye processes and alerts in under 2 seconds. Faster than any human operator can respond to a security event.',
  },
  {
    icon: 'TrendingUp',
    stat: 'Productivity',
    label: 'Automate Routine Surveillance Tasks',
    description:
      'Free your security team to focus on decisions, not screen-watching. TruEye handles detection automatically.',
  },
  {
    icon: 'ShieldCheck',
    stat: 'Risk Reduction',
    label: 'Stop Incidents Before They Escalate',
    description:
      'Proactive detection means intervening before a situation becomes a crisis. Real-time alerts enable immediate response.',
  },
  {
    icon: 'Lock',
    stat: 'Theft Reduction',
    label: '24/7 Intelligent Asset Protection',
    description:
      'Continuous monitoring across all cameras, all zones, all hours — without fatigue or missed events.',
  },
  {
    icon: 'Target',
    stat: 'Accuracy',
    label: 'AI Eliminates Human Error in Monitoring',
    description:
      'Consistent, objective detection every time. No distraction, no fatigue, no missed incidents from human limitations.',
  },
]

export const INDUSTRIES = [
  { name: 'Aviation', icon: 'Plane' },
  { name: 'Retail', icon: 'ShoppingBag' },
  { name: 'Manufacturing', icon: 'Factory' },
  { name: 'Healthcare', icon: 'Heart' },
  { name: 'Hospitality', icon: 'Building' },
  { name: 'Education', icon: 'GraduationCap' },
  { name: 'Transportation', icon: 'Car' },
  { name: 'Government', icon: 'Landmark' },
  { name: 'Real Estate', icon: 'Home' },
  { name: 'Logistics', icon: 'Truck' },
  { name: 'Casinos', icon: 'Layers' },
  { name: 'Infrastructure', icon: 'Network' },
  { name: 'Stadiums', icon: 'MapPin' },
  { name: 'Sea Ports', icon: 'Anchor' },
]

export const CASE_STUDIES = [
  {
    id: 'intrusion-detection',
    title: 'Intrusion Detection for Theft Control',
    icon: 'Shield',
    challenge:
      'Traditional CCTV monitoring required constant human attention and frequently missed rapid intrusion events in large monitored areas, leaving businesses vulnerable.',
    solution:
      'TruEye deployed real-time intrusion detection across restricted zones. The system generated instant alerts the moment unauthorized access was detected, regardless of zone size or number of cameras.',
    result:
      'Immediate security response capability established. Significant reduction in theft incidents. Reduced need for manual monitoring staff.',
    pdf: '/images/VertexPlus_TruEye_Case_IntrusionDetection_TheftControl.pdf',
  },
  {
    id: 'safety-monitoring',
    title: 'Safety Monitoring and Improvement',
    icon: 'HardHat',
    challenge:
      'Manual workplace safety inspections were inconsistent, time-consuming, and unable to provide continuous coverage across large industrial facilities.',
    solution:
      'TruEye automated activity monitoring and risk detection across the facility in real time, flagging safety violations and non-compliance immediately.',
    result:
      'Reduced manual oversight costs. Improved worker safety compliance. Data-driven insights for targeted safety interventions.',
    pdf: '/images/VertexPlus_TruEye_Case_SafetyMonitoring.pdf',
  },
  {
    id: 'bag-counting',
    title: 'Automated Bag Counting System',
    icon: 'Package',
    challenge:
      'Manual bag counting in high-throughput environments was slow, error-prone, and caused inventory inaccuracies that led to operational losses.',
    solution:
      'TruEye video analytics automated the entire bag-counting process using object detection, eliminating human counting entirely.',
    result:
      'Faster, more accurate inventory management. Reduced undercounting losses. Improved operational efficiency in high-traffic environments.',
    pdf: '/images/VertexPlus_TruEye_Case_ObjectCounting.pdf',
  },
]

export const COMPARISON_TABLE = [
  {
    factor: 'Response time',
    manual: 'Minutes to hours',
    trueye: 'Real-time (under 2 sec)',
  },
  {
    factor: 'Coverage',
    manual: 'Limited by operators',
    trueye: '24/7 across all cameras',
  },
  {
    factor: 'Accuracy',
    manual: 'Human error prone',
    trueye: 'Consistent AI detection',
  },
  {
    factor: 'Scalability',
    manual: 'Requires more staff',
    trueye: 'Add cameras, not headcount',
  },
  {
    factor: 'Cost over time',
    manual: 'High ongoing staff cost',
    trueye: 'Lower with automation',
  },
  {
    factor: 'Reporting',
    manual: 'Manual logs',
    trueye: 'Automated dashboards',
  },
  {
    factor: 'Integration',
    manual: 'Standalone CCTV',
    trueye: 'Works with existing VMS',
  },
  {
    factor: 'Incident prevention',
    manual: 'Reactive',
    trueye: 'Proactive, real-time',
  },
]

export const FAQS = [
  {
    question: 'Where is Video Analytics used?',
    answer:
      'Video analytics is used in warehouses, offices, retail stores, industrial facilities, healthcare settings, airports, schools, and any location with CCTV cameras.',
  },
  {
    question: 'What are common application areas for Video Analytics?',
    answer:
      'Facial recognition, attendance monitoring, security surveillance, equipment maintenance prediction, product quality inspection, inventory counting, and logistics tracking.',
  },
  {
    question: 'Why do we need Video Analytics?',
    answer:
      'Video analytics eliminates manual CCTV monitoring by automatically detecting anomalies and security threats. It improves situational awareness, response times, and operational efficiency at scale.',
  },
  {
    question: 'How does Video Analytics improve security?',
    answer:
      'By continuously monitoring for unauthorized access, suspicious activity, and security events — then sending real-time alerts to enable immediate response.',
  },
  {
    question: 'Can Video Analytics be used for operational efficiency?',
    answer:
      'Yes. By automating surveillance tasks, optimizing workflows, and providing data-driven insights, video analytics reduces downtime and improves resource use.',
  },
  {
    question: 'How does Video Analytics contribute to inventory management?',
    answer:
      'It counts products on shelves, tracks inventory movement, monitors logistics operations, and ensures accurate stock levels with fewer manual interventions.',
  },
]

export const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria',
  'Bangladesh', 'Belgium', 'Brazil', 'Canada', 'Chile', 'China', 'Colombia',
  'Croatia', 'Czech Republic', 'Denmark', 'Egypt', 'Ethiopia', 'Finland',
  'France', 'Germany', 'Ghana', 'Greece', 'Hong Kong', 'Hungary', 'India',
  'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Japan',
  'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Lebanon', 'Malaysia', 'Mexico',
  'Morocco', 'Netherlands', 'New Zealand', 'Nigeria', 'Norway', 'Oman',
  'Pakistan', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar',
  'Romania', 'Russia', 'Saudi Arabia', 'Singapore', 'South Africa',
  'South Korea', 'Spain', 'Sri Lanka', 'Sweden', 'Switzerland', 'Taiwan',
  'Thailand', 'Turkey', 'UAE', 'Ukraine', 'United Kingdom', 'United States',
  'Vietnam', 'Other',
]

export const INDUSTRIES_LIST = [
  'Aviation & Airports', 'Retail & Stores', 'Manufacturing', 'Healthcare',
  'Hospitality & Hotels', 'Education (K-12 + Higher Ed)', 'Transportation',
  'Government & Law Enforcement', 'Real Estate', 'Logistics & Warehousing',
  'Casinos', 'Critical Infrastructure', 'Stadiums & Events', 'Sea Ports', 'Other',
]

export const BUSINESS_TYPES = [
  'Business Development', 'Competitor', 'Consultant', 'Distributor',
  'End User', 'Media', 'Reseller', 'Technology Partner', 'VMS Partner', 'Other',
]

export const EBOOK_BULLETS = [
  'What is Video Analytics?',
  'What drives Video Analytics Technology?',
  'Who is empowered by Video Analytics?',
  'Use-case scenarios across industries',
  'Key considerations when choosing a solution',
]

export const PRICING_TABS = [
  {
    id: 'hardware',
    icon: 'Camera',
    title: 'Hardware and Cameras',
    body: 'Camera type, quantity, placement all affect analytics accuracy. Resolution, frame rate, bandwidth requirements determine additional hardware needs. Whether your use case demands real-time or on-demand analysis shapes your infrastructure investment significantly.',
  },
  {
    id: 'network',
    icon: 'Network',
    title: 'Network Requirements',
    body: 'High-volume video data demands strong network infrastructure. Routers, switches, and cabling must handle the bandwidth load of multiple high-resolution feeds. A properly configured network ensures smooth, uninterrupted analytics performance.',
  },
  {
    id: 'deployment',
    icon: 'Server',
    title: 'Deployment Model',
    body: 'Single-site or multi-location? Edge, cloud, or hybrid? Each model carries different cost and performance profiles. TruEye supports all deployment architectures and scales as you add cameras or expand to new facilities.',
  },
  {
    id: 'integrations',
    icon: 'Puzzle',
    title: 'Integrations, Support & Maintenance',
    body: 'Annual plans cover support, training, and maintenance. Third-party integrations, VMS compatibility, and software updates may carry additional considerations. On-premises gives IT control; cloud offers convenience. We help you evaluate both against your long-term requirements.',
  },
]

export const NAV_LINKS = [
  { label: 'Product', href: '/product' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Partners', href: '/becomeapartner' },
  { label: 'Case Studies', href: '/case-studies' },
  {
    label: 'Resources',
    href: '#',
    dropdown: [
      { label: 'Documentation', href: '/resources' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  { label: 'Contact Us', href: '/contact' },
]

export const FOOTER_LINKS = {
  solution: [
    { label: 'Product Overview', href: '/product' },
    { label: 'Request Demo', href: '/#requestdemo' },
    { label: 'Product Presentation', href: '/images/TruEye-Product.pdf' },
  ],
  resources: [
    { label: 'Documentation', href: '/resources' },
    { label: 'Prime Guide eBook', href: '/images/TruEye-PrimeGuide.pdf' },
    { label: 'Blog', href: '/blog' },
    { label: 'Case Studies', href: '/case-studies' },
  ],
  company: [
    { label: 'About VertexPlus', href: 'https://www.vertexplus.com/global/en/company', external: true },
    { label: 'Careers', href: 'https://www.vertexplus.com/global/en/career', external: true },
  ],
}
