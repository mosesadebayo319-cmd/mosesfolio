export const site = {
  name: 'Moses Oluwashina Adebayo',
  shortName: 'Moses',
  title:
    'Moses Adebayo | Digital Marketing & Web Growth for African Brands',
  description:
    'I help Nigerian founders and organisations get more leads with SEO, social media, paid campaigns, and conversion-focused websites. Based in Abuja.',
  jobTitle: 'Digital Marketing Specialist & Web Growth Partner',
  tagline: 'More leads. Clearer brand. Measurable growth.',
  location: 'Abuja, Nigeria',
  email: 'mosesadebayo319@gmail.com',
  phone: '+234 812 432 8229',
  phoneRaw: '2348124328229',
  hours: 'Monday – Friday, 9:00 AM – 6:00 PM WAT',
  responseTime: 'Usually within 2 hours during business hours',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://mosesfolio.vercel.app',
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61583181652994',
    instagram: 'https://www.instagram.com/mosesadebayo46',
    linkedin: 'https://www.linkedin.com/in/ma-digital-marketer448899',
    whatsapp: 'https://wa.me/2348124328229',
  },
}

export const whatsappHireUrl = `https://wa.me/${site.phoneRaw}?text=${encodeURIComponent(
  "Hi Moses, I'd like to discuss a digital marketing / web project."
)}`

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/case-studies' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const stats = [
  { value: '15+', label: 'Clients supported' },
  { value: '150%', label: 'Avg. engagement lift' },
  { value: '50K+', label: 'Followers grown' },
  { value: '3x', label: 'Campaign ROI examples' },
]

export const coreExpertise = [
  {
    id: 'seo',
    title: 'SEO Optimization',
    desc: 'Rank higher and earn organic leads with technical and content SEO.',
    icon: 'search',
  },
  {
    id: 'social',
    title: 'Social Media',
    desc: 'Grow engaged communities across Instagram, Facebook, LinkedIn & more.',
    icon: 'megaphone',
  },
  {
    id: 'content',
    title: 'Content Strategy',
    desc: 'Story-led content that builds trust and moves buyers to act.',
    icon: 'pen',
  },
  {
    id: 'campaigns',
    title: 'Paid Campaigns',
    desc: 'Meta & Google ads with clear tracking and measurable ROI.',
    icon: 'target',
  },
  {
    id: 'web',
    title: 'Web Development',
    desc: 'Fast, mobile-first sites and landing pages built to convert.',
    icon: 'code',
  },
  {
    id: 'pm',
    title: 'Project Leadership',
    desc: 'Clear plans, team coordination, and on-time delivery.',
    icon: 'briefcase',
  },
]

export const featuredProjects = [
  {
    title: 'Heroes Help Social Growth',
    category: 'Social Media Management',
    result: '+150% engagement · 50K+ community growth',
    image: '/case-studies/heroes-help-social.jpg',
    href: '/case-studies#heroes-help-social',
  },
  {
    title: 'B2B SEO Transformation',
    category: 'SEO & Content',
    result: 'Page-1 rankings · +280% organic traffic',
    image: '/case-studies/seo.jpg',
    href: '/case-studies#seo-transformation',
  },
  {
    title: 'Product Launch Campaign',
    category: 'Digital Marketing',
    result: '3x ROI in 90 days · 250+ qualified leads',
    image: '/case-studies/digital-campaigns.jpg',
    href: '/case-studies#digital-campaign-launch',
  },
]

export const homeTestimonials = [
  {
    name: 'Ellah Daniel',
    role: 'CEO, MecuryX',
    text: 'Moses demonstrated exceptional expertise in digital marketing and campaign execution. His ability to translate strategy into measurable results significantly improved our visibility and engagement.',
    link: 'https://www.mercuryx.com',
    company: 'MecuryX',
    rating: 5,
  },
  {
    name: 'Dr. Joel Adams',
    role: 'President, Heroes Help',
    text: 'Moses brought structure, creativity, and consistency to our digital presence. His work elevated how we communicate and connect with our audience.',
    link: 'https://www.heroeshelp.org.ng',
    company: 'Heroes Help',
    rating: 5,
  },
  {
    name: 'Hon. Austin Pelemo',
    role: 'CEO, Print Mode',
    text: 'Working with Moses was impactful. His approach to digital marketing is strategic, intentional, and results-oriented. He played a key role in improving our brand visibility.',
    link: 'https://www.printmode.com',
    company: 'Print Mode',
    rating: 5,
  },
]

export const clients = [
  {
    name: 'Mecuryx',
    logo: 'https://mecuryx.com/images/mercuryx_tp.png',
    url: 'https://mecuryx.com',
    description: 'Tech Education & Training',
  },
  {
    name: 'Heroes Help',
    logo: '/clients/heroes-help.jpg',
    url: 'https://heroeshelp.org.ng',
    description: 'Military Support & Advocacy',
  },
  {
    name: 'SGS Ministry',
    logo: 'https://sgsministry.org/wp-content/uploads/2023/03/image6-removebg-preview-e1679848377965.png',
    url: 'https://sgsministry.org',
    description: 'Spiritual & Community Ministry',
  },
  {
    name: 'Print Mode',
    logo: 'https://media.licdn.com/dms/image/v2/D4E0BAQEzOSZYi8zOWA/company-logo_200_200/B4EZYkZwJKHcAM-/0/1744367453900?e=1779321600&v=beta&t=2F-or9YXXpiOG2_4YtcNqw71FILiBcMcOwCMCnIc3B4',
    url: 'https://printmode.com',
    description: 'Design, Print & Innovation',
  },
]

export const aboutValues = [
  {
    title: 'Excellence',
    desc: 'Every campaign, page, and plan is built to a professional standard—not “good enough.”',
  },
  {
    title: 'Clarity',
    desc: 'Simple strategy, honest reporting, and language non-technical founders can act on.',
  },
  {
    title: 'Impact',
    desc: 'Focused on leads, visibility, and systems you can measure—not vanity metrics alone.',
  },
]

export const skillCategories = [
  {
    category: 'Digital Marketing',
    items: ['SEO', 'SEM', 'Content Marketing', 'Email Marketing', 'Analytics'],
  },
  {
    category: 'Social Media',
    items: [
      'Strategy',
      'Content Creation',
      'Community Management',
      'Paid Ads',
      'Analytics',
    ],
  },
  {
    category: 'Project Management',
    items: [
      'Planning',
      'Execution',
      'Team Leadership',
      'Risk Management',
      'Stakeholder Communication',
    ],
  },
  {
    category: 'Technical',
    items: [
      'Google Analytics',
      'SEMrush',
      'HubSpot',
      'WordPress',
      'HTML/CSS',
    ],
  },
  {
    category: 'Web Development',
    items: [
      'HTML & CSS',
      'JavaScript',
      'React',
      'Next.js',
      'Responsive Design',
      'Landing Pages',
    ],
  },
]

export const servicePackages = [
  {
    id: 'growth-marketing',
    title: 'Growth Marketing',
    description:
      'For brands that need consistent visibility and leads from search, social, and ads.',
    includes: ['SEO Optimization', 'Social Media Management', 'Digital Campaigns'],
    bestFor: 'SMEs, NGOs, and founders ready to grow demand monthly.',
    notFor: 'One-off logo-only or pure graphic design requests.',
    pricing: 'Monthly retainer · Custom quote',
  },
  {
    id: 'web-presence',
    title: 'Web Presence',
    description:
      'For teams that need a fast, trustworthy site or landing page that converts traffic.',
    includes: ['Web Development', 'Content Strategy', 'Basic SEO setup'],
    bestFor: 'Product launches, service businesses, training offers.',
    notFor: 'Complex enterprise software builds.',
    pricing: 'Project-based · Custom quote',
  },
  {
    id: 'full-partner',
    title: 'Full Growth Partner',
    description:
      'Strategy + execution + leadership when you want one accountable partner.',
    includes: [
      'Consulting & Strategy',
      'Campaigns + SEO + Social',
      'Project leadership',
    ],
    bestFor: 'Organisations scaling multi-channel growth.',
    notFor: 'Clients seeking the lowest possible hourly rate only.',
    pricing: 'Retainer · Custom quote',
  },
]

export const services = [
  {
    id: 'seo-optimization',
    title: 'SEO Optimization',
    flagship: true,
    description:
      'Boost your online visibility and drive organic traffic with data-driven SEO strategies.',
    benefits: [
      'Higher search rankings for target keywords',
      'Increased organic traffic and leads',
      'Improved website authority and trust',
      'Long-term sustainable growth',
    ],
    deliverables: [
      'Comprehensive SEO audit',
      'Keyword research and strategy',
      'On-page and technical optimization',
      'Monthly performance reports',
    ],
    pricing: 'Project or monthly · Custom quote',
    bestFor: 'Sites with traffic potential but weak rankings.',
  },
  {
    id: 'social-media-management',
    title: 'Social Media Management',
    flagship: true,
    description:
      'Build engaged communities and amplify your brand across social platforms.',
    benefits: [
      'Increased brand awareness and reach',
      'Higher engagement and follower growth',
      'Stronger customer relationships',
      'Consistent brand presence',
    ],
    deliverables: [
      'Content calendar and strategy',
      'Content creation and posting',
      'Community management',
      'Monthly analytics and insights',
    ],
    pricing: 'Monthly retainer · Custom quote',
    bestFor: 'Brands that need consistent presence, not random posts.',
  },
  {
    id: 'web-development',
    title: 'Web Development',
    flagship: true,
    description:
      'Build fast, modern websites and landing pages that convert visitors into customers.',
    benefits: [
      'Professional presence that builds trust',
      'Mobile-responsive on every device',
      'Better speed and SEO foundations',
      'Clear conversion paths for leads',
    ],
    deliverables: [
      'Website or landing page build',
      'Responsive front-end development',
      'Performance and basic SEO setup',
      'Launch support and handover',
    ],
    pricing: 'Project-based · Custom quote',
    bestFor: 'Founders launching or redesigning a conversion-focused site.',
  },
  {
    id: 'content-strategy',
    title: 'Content Strategy',
    flagship: false,
    description:
      'Create compelling content that resonates with your audience and drives conversions.',
    benefits: [
      'Improved audience engagement',
      'Thought leadership',
      'Better conversion rates',
      'Consistent brand messaging',
    ],
    deliverables: [
      'Content audit and strategy',
      'Editorial calendar',
      'Articles and guides',
      'Performance tracking',
    ],
    pricing: 'Project or monthly · Custom quote',
    bestFor: 'Teams ready to publish with a plan.',
  },
  {
    id: 'digital-campaigns',
    title: 'Digital Campaigns',
    flagship: false,
    description:
      'Launch targeted campaigns that reach the right audience and deliver measurable ROI.',
    benefits: [
      'Targeted audience reach',
      'Higher conversion rates',
      'Measurable ROI',
      'Scalable growth',
    ],
    deliverables: [
      'Campaign strategy and planning',
      'Ad creatives and optimization',
      'Audience targeting',
      'Weekly performance reports',
    ],
    pricing: 'Campaign budget + management fee',
    bestFor: 'Launches and lead-gen pushes with ad budget.',
  },
  {
    id: 'email-marketing',
    title: 'Email Marketing',
    flagship: false,
    description:
      'Build and nurture customer relationships through strategic email campaigns.',
    benefits: [
      'Higher retention',
      'Repeat purchases',
      'Improved lifetime value',
      'Direct owned channel',
    ],
    deliverables: [
      'Email strategy and segmentation',
      'Templates and design',
      'Automation setup',
      'Performance analytics',
    ],
    pricing: 'Project or monthly · Custom quote',
    bestFor: 'Businesses with an audience list or offer funnel.',
  },
  {
    id: 'consulting-strategy',
    title: 'Consulting & Strategy',
    flagship: false,
    description:
      'Expert guidance to develop and execute your digital marketing roadmap.',
    benefits: [
      'Clear strategic direction',
      'Smarter marketing spend',
      'Competitive clarity',
      'Faster growth decisions',
    ],
    deliverables: [
      'Digital audit',
      'Strategic roadmap',
      'Quarterly reviews',
      'Executive recommendations',
    ],
    pricing: 'Session or retainer · Custom quote',
    bestFor: 'Leaders who need a plan before heavy execution.',
  },
]

export const processSteps = [
  {
    step: '01',
    title: 'Discovery',
    description:
      'We clarify goals, audience, offers, and what “success” means in numbers.',
  },
  {
    step: '02',
    title: 'Strategy',
    description:
      'A focused plan for channels, messaging, and milestones—not random tactics.',
  },
  {
    step: '03',
    title: 'Execution',
    description:
      'Campaigns, content, or website work shipped with clear ownership and timelines.',
  },
  {
    step: '04',
    title: 'Optimize',
    description:
      'Track results, improve what works, and cut what doesn’t—every cycle.',
  },
]

export const caseStudies = [
  {
    id: 'heroes-help-social',
    title: 'Heroes Help Social Growth',
    client: 'Heroes Help (NGO)',
    industry: 'Non-profit · Military support & advocacy · Nigeria',
    timeframe: 'Ongoing multi-platform programme',
    category: 'Social Media Management',
    image: '/case-studies/heroes-help-social.jpg',
    problem:
      'Limited digital structure and inconsistent storytelling weakened community engagement for a mission-led NGO. Platforms lacked a clear content system and advocacy narrative.',
    strategy:
      'Built a multi-platform content system around impact storytelling, advocacy themes, and platform-native formats for Instagram, Facebook, LinkedIn, and YouTube.',
    execution:
      'Ran structured content calendars, brand voice guidelines, community engagement, and performance reviews to keep messaging consistent and emotionally resonant.',
    results: {
      metric1: '+150%',
      label1: 'Engagement growth',
      metric2: '50K+',
      label2: 'Community scale (programme)',
      metric3: '4',
      label3: 'Core platforms managed',
    },
    testimonial:
      'Moses brought structure, creativity, and consistency to our digital presence. His work elevated how we communicate and connect with our audience.',
    testimonialAuthor: 'Dr. Joel Adams, President, Heroes Help',
  },
  {
    id: 'seo-transformation',
    title: 'B2B SEO Transformation',
    client: 'B2B SaaS company (confidential)',
    industry: 'SaaS · B2B · Content-led growth',
    timeframe: '6 months',
    category: 'SEO & Content',
    image: '/case-studies/seo.jpg',
    problem:
      'Target keywords sat on page 5+, organic traffic was declining, and there was no structured SEO programme against rising competition.',
    strategy:
      'Full SEO audit, technical fixes, keyword map for high-intent terms, and a content plan aimed at lower-competition opportunities with commercial value.',
    execution:
      'Fixed technical issues, shipped 50+ optimised articles, improved architecture, strengthened internal linking, and built quality backlinks while optimising existing pages.',
    results: {
      metric1: 'Page 1',
      label1: 'Priority rankings',
      metric2: '+280%',
      label2: 'Organic traffic',
      metric3: '45',
      label3: 'Leads / month',
    },
    testimonial:
      'The SEO strategy was data-driven and results-oriented. We saw significant improvements in rankings and organic traffic within 6 months.',
    testimonialAuthor: 'Marketing Manager, SaaS Company',
  },
  {
    id: 'digital-campaign-launch',
    title: 'Product Launch Ad Campaign',
    client: 'Service business (confidential)',
    industry: 'Services · New product line launch',
    timeframe: '90 days',
    category: 'Digital Marketing',
    image: '/case-studies/digital-campaigns.jpg',
    problem:
      'A service business launched a new offer with limited budget and no prior digital advertising experience—needed qualified leads quickly.',
    strategy:
      'Integrated Google, Facebook, and LinkedIn campaigns with persona-based audiences, retargeting, and landing-page conversion focus.',
    execution:
      'Built creatives, conversion tracking, daily budget optimisation, A/B tests on messaging, and landing page improvements for lead quality.',
    results: {
      metric1: '3x',
      label1: 'ROI in 90 days',
      metric2: '250+',
      label2: 'Qualified leads',
      metric3: '18%',
      label3: 'Conversion rate',
    },
    testimonial:
      'Professional execution and transparent reporting. Moses delivered exceptional results within our budget constraints.',
    testimonialAuthor: 'Founder, Service Company',
  },
  {
    id: 'content-marketing-strategy',
    title: 'Content Engine for Lead Quality',
    client: 'Educational platform (confidential)',
    industry: 'EdTech / education marketing',
    timeframe: 'Multi-quarter programme',
    category: 'Content Strategy',
    image: '/case-studies/content-marketing.jpg',
    problem:
      'Thought leadership was weak and content was scattered—few high-quality leads despite publishing activity.',
    strategy:
      'Buyer-journey content system: blog, lead magnets, case-style assets, and distribution aligned to seasonal demand.',
    execution:
      'Produced 100+ optimised assets, improved SEO alignment, and built consistent distribution across owned channels.',
    results: {
      metric1: '10x',
      label1: 'Blog traffic',
      metric2: '500+',
      label2: 'Monthly leads',
      metric3: '4.5/5',
      label3: 'Avg. engagement',
    },
    testimonial:
      'The content strategy elevated our brand authority. We now attract higher-quality leads and have established ourselves as industry leaders.',
    testimonialAuthor: 'Director, Educational Platform',
  },
]

export const experienceRoles = [
  {
    role: 'Senior Coding Mentor',
    company: 'Learn2Earn',
    period: '2025 – Present',
    featured: true,
    responsibilities: [
      'Mentor students through structured coding curriculum',
      'Design lessons, projects, and assessments for diverse learners',
      'Track progress and give personalised feedback',
    ],
    impact: [
      'Practical coding skills for career advancement',
      'Higher engagement and retention in learning paths',
    ],
  },
  {
    role: 'Digital Marketing Lead',
    company: 'MecuryX',
    period: '2025 – Present',
    link: 'https://www.mercuryx.com',
    featured: true,
    responsibilities: [
      'Multi-channel digital marketing strategy and execution',
      'Paid campaigns on Meta and Google',
      'Funnels for tech programmes and training offers',
      'Brand messaging and campaign optimisation',
    ],
    impact: [
      'Stronger lead generation and campaign performance',
      'Wider programme awareness in tech education',
    ],
  },
  {
    role: 'Digital & Content Manager',
    company: 'Heroes Help',
    period: '2025 – Present',
    link: 'https://www.heroeshelp.org.ng',
    featured: true,
    responsibilities: [
      'Managed Instagram, Facebook, LinkedIn, and YouTube',
      'Impact storytelling for military support and advocacy',
      'Content calendars and engagement systems',
    ],
    impact: [
      'Higher engagement and brand credibility',
      'More consistent multi-platform presence',
    ],
  },
  {
    role: 'Digital Campaign Strategist',
    company: 'SGS Ministry',
    period: '2024',
    featured: false,
    responsibilities: [
      'Facebook and Instagram ad campaigns',
      'Audience-specific messaging and creatives',
      'Performance monitoring and optimisation',
    ],
    impact: [
      'Strong engagement growth within 30 days',
      'Expanded digital reach',
    ],
  },
  {
    role: 'Manager (Operations & Client Delivery)',
    company: "Ella's Smart Global Services",
    period: '2022 – 2023',
    featured: false,
    responsibilities: [
      'Service delivery coordination and client communication',
      'Team management and operational quality',
    ],
    impact: [
      'Stronger client experience systems',
      'Clearer delivery processes',
    ],
  },
  {
    role: 'Founder / Project Coordinator',
    company: 'KayStar Global Projects',
    period: 'Ongoing',
    featured: false,
    responsibilities: [
      'Procurement and project execution',
      'Client relationships and delivery',
      'Planning, budgeting, and implementation',
    ],
    impact: [
      'Brand and positioning practice in real operations',
      'Client acquisition systems',
    ],
  },
]

export const coreCompetencies = [
  'Digital Marketing Strategy',
  'Social Media Management',
  'Paid Advertising (Meta & Google Ads)',
  'Content Creation & Storytelling',
  'Web & Landing Page Builds',
  'Marketing Analytics & Optimization',
]

export const leadershipTraits = [
  {
    title: 'Strategic Thinking',
    description:
      'Turn messy growth problems into clear priorities and measurable plans.',
  },
  {
    title: 'Team Leadership',
    description:
      'Mentor junior marketers and coordinate cross-functional delivery.',
  },
  {
    title: 'Execution Excellence',
    description:
      'Ship on time with quality—strategy only counts when it goes live.',
  },
  {
    title: 'Communication',
    description:
      'Explain technical work in plain language for founders and boards.',
  },
  {
    title: 'Adaptability',
    description:
      'Comfortable with new platforms, offers, and fast-changing markets.',
  },
  {
    title: 'Problem Solving',
    description:
      'Diagnose bottlenecks in funnels, content, and campaigns—then fix them.',
  },
]

export const fullTestimonials = homeTestimonials.map((t) => ({
  quote: t.text,
  name: t.name,
  role: t.role.split(',')[0],
  company: t.company,
  link: t.link,
  rating: t.rating,
}))

export const footerServices = [
  { label: 'SEO Optimization', href: '/services#seo-optimization' },
  { label: 'Social Media', href: '/services#social-media-management' },
  { label: 'Web Development', href: '/services#web-development' },
  { label: 'Digital Campaigns', href: '/services#digital-campaigns' },
  { label: 'Content Strategy', href: '/services#content-strategy' },
  { label: 'Consulting', href: '/services#consulting-strategy' },
]

export const contactSubjects = [
  'SEO Services',
  'Social Media Management',
  'Web Development',
  'Content Strategy',
  'Digital Campaigns',
  'Project / Retainer',
  'Consulting',
  'Other',
]
