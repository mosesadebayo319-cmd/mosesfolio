export const site = {
  name: 'Moses Oluwashina Adebayo',
  shortName: 'Moses',
  // Primary SEO title (homepage / default)
  title:
    'Moses Adebayo | Digital Marketing & Web Products in Abuja',
  description:
    'Moses Adebayo is an Abuja-based digital marketer and product developer helping SMEs and NGOs with SEO, social media, paid campaigns, websites, and practical digital tools.',
  jobTitle: 'Digital Marketer & Product Developer',
  tagline: 'Clear strategy. Work you can verify.',
  location: 'Abuja, Nigeria',
  email: 'mosesadebayo319@gmail.com',
  phone: '+234 812 432 8229',
  phoneRaw: '2348124328229',
  hours: 'Monday – Friday, 9:00 AM – 6:00 PM WAT',
  responseTime: 'Usually within 2 hours on business days',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://mosesfolio.online',
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61583181652994',
    instagram: 'https://www.instagram.com/mosesadebayo46',
    linkedin: 'https://www.linkedin.com/in/ma-digital-marketer448899',
    whatsapp: 'https://wa.me/2348124328229',
  },
}

/** Page-level SEO titles & meta descriptions */
export const pageSeo = {
  home: {
    title:
      'Moses Adebayo | Digital Marketing & Web Products in Abuja',
    description:
      'Abuja-based digital marketer and product developer working on SEO, social media, paid campaigns, websites, and digital tools for SMEs and nonprofits.',
  },
  services: {
    title: 'Digital Marketing Services in Abuja | SEO, Social, Ads & Web',
    description:
      'Digital marketing services for Nigerian SMEs and NGOs: SEO optimization, social media management, Meta & Google ads, content strategy, and web development. Custom quotes. Abuja-based.',
  },
  caseStudies: {
    title: 'Case Studies | Product & Campaign Work by Moses Adebayo',
    description:
      'Explore Moses Adebayo’s product and campaign work, including ImpactDesk and the Heroes Help Tickets for Troops LinkedIn awareness campaign.',
  },
  about: {
    title: 'About Moses Adebayo | Digital Marketer & Growth Partner, Abuja',
    description:
      'Meet Moses Oluwashina Adebayo, an Abuja-based digital marketer and ImpactDesk developer working with SMEs, nonprofits, and education teams.',
  },
  contact: {
    title: 'Contact Moses Adebayo | Marketing & Product Projects',
    description:
      'Contact Moses Adebayo about SEO, social media, paid campaigns, websites, or digital product development. Based in Abuja and serving clients across Nigeria.',
  },
  experience: {
    title: 'Experience | Moses Adebayo Digital Marketing Career',
    description:
      'Professional experience in digital marketing leadership, social media, paid campaigns, and coding mentorship — MecuryX, Heroes Help, Learn2Earn, and more.',
  },
  testimonials: {
    title: 'Client Testimonials | Moses Adebayo Digital Marketing',
    description:
      'What clients say about working with Moses Adebayo on digital marketing, social media, and brand growth across Nigeria.',
  },
}

export const whatsappHireUrl = `https://wa.me/${site.phoneRaw}?text=${encodeURIComponent(
  "Hi Moses, I found your portfolio (mosesfolio.online). I'd like help with digital marketing, a website, or a digital product. Are you available for a quick chat?"
)}`

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/case-studies' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const stats = [
  { value: '10,677', label: 'LinkedIn impressions' },
  { value: '7,366', label: 'Video views' },
  { value: '31', label: 'Clicks' },
  { value: '$30', label: 'Campaign spend' },
]

export const coreExpertise = [
  {
    id: 'seo',
    title: 'SEO for Nigerian businesses',
    desc: 'Rank on Google for the searches your customers already make—and turn visits into enquiries.',
    icon: 'search',
  },
  {
    id: 'social',
    title: 'Social media that builds trust',
    desc: 'Consistent content and community management on Instagram, Facebook, LinkedIn, and more.',
    icon: 'megaphone',
  },
  {
    id: 'content',
    title: 'Content that converts',
    desc: 'Clear messaging and storytelling so people understand your offer and take action.',
    icon: 'pen',
  },
  {
    id: 'campaigns',
    title: 'Paid ads with ROI focus',
    desc: 'Meta and Google campaigns with tracking, testing, and reporting you can understand.',
    icon: 'target',
  },
  {
    id: 'web',
    title: 'Websites built to sell',
    desc: 'Fast, mobile-first sites and landing pages designed for leads—not just “looking nice.”',
    icon: 'code',
  },
  {
    id: 'pm',
    title: 'Project leadership',
    desc: 'Someone accountable for timelines, quality, and delivery when growth work gets busy.',
    icon: 'briefcase',
  },
]

export const featuredProjects = [
  {
    title: 'Heroes Help Social Media Programme',
    category: 'Social Media Management',
    result: 'Advocacy content across four channels',
    image: '/case-studies/heroes-help-social.jpg',
    href: '/case-studies#heroes-help-social',
  },
]

export const homeTestimonials = [
  {
    name: 'Ellah Daniel',
    role: 'CEO, MecuryX',
    text: 'Moses demonstrated exceptional expertise in digital marketing and campaign execution. His ability to translate strategy into measurable results significantly improved our visibility and engagement.',
    link: 'https://mecuryx.com',
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
    name: 'MecuryX',
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
    title: 'Heroes Help Social Media Programme',
    client: 'Heroes Help (NGO)',
    industry: 'Nonprofit advocacy · Nigeria',
    timeframe: 'Ongoing programme',
    category: 'Social Media Management',
    image: '/case-studies/heroes-help-social.jpg',
    role: 'Digital and content manager',
    problem:
      'Heroes Help needed a more consistent way to communicate its mission and engage its community across social channels.',
    strategy:
      'Organize advocacy and impact stories into a content plan tailored to Instagram, Facebook, LinkedIn, and YouTube.',
    execution:
      'Created content calendars, aligned messaging across channels, supported community engagement, and reviewed performance to guide future content.',
    results: {
      metric1: '4',
      label1: 'Channels in scope',
      metric2: '',
      label2: '',
      metric3: '',
      label3: '',
    },
    resultHeading: 'Scope of work',
    testimonial:
      'Moses brought structure, creativity, and consistency to our digital presence. His work elevated how we communicate and connect with our audience.',
    testimonialAuthor: 'Dr. Joel Adams, President, Heroes Help',
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
  'Digital Product Development',
  'Content Strategy',
  'Digital Campaigns',
  'Project / Retainer',
  'Consulting',
  'Other',
]
