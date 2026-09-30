import type { PublicProject } from '@/src/lib/content-loader'

// Keep these recent case studies visible when older admin projects are stored in the database.
export const recentCaseStudies: PublicProject[] = [
  {
    id: 'motechy-website',
    title: 'MoTechy website',
    client: 'MoTechy',
    role: 'Website developer',
    projectUrl: 'https://motechy.vercel.app/',
    industry: 'Digital marketing · Nigeria',
    timeframe: '',
    category: 'Website Development',
    image: '/case-studies/motechy-website.jpg',
    imageFit: 'contain',
    imageCaption: 'MoTechy homepage showing the agency offer and contact options.',
    problem:
      'MoTechy needed a website that clearly presents its digital marketing offer to Nigerian founders and SME owners and gives visitors a way to start a conversation.',
    strategy:
      'Organize the site around a direct agency message, service and package navigation, and prominent contact routes.',
    execution:
      'Built the MoTechy website with pages for services, packages, about, and contact, plus visible strategy-call and WhatsApp actions.',
    results: {
      metric1: 'Live',
      label1: 'Website',
      metric2: '',
      label2: '',
      metric3: '',
      label3: '',
    },
    resultHeading: 'What shipped',
    testimonial: '',
    testimonialAuthor: '',
    featured: true,
  },
  {
    id: 'impactdesk',
    title: 'ImpactDesk: NGO reporting workspace',
    client: 'ImpactDesk',
    role: 'Developer',
    projectUrl: 'https://impactdesk.onrender.com/',
    industry: 'Nonprofit technology',
    timeframe: '2026 pilot release',
    category: 'Product Development',
    image: '/case-studies/impactdesk-screenshot.jpg',
    imageFit: 'contain',
    imageCaption: 'ImpactDesk landing page with illustrative example data.',
    problem:
      'NGO teams need a clear way to connect program activity, field evidence, indicator updates, and donor reporting while keeping each organization’s records separate.',
    strategy:
      'Build one organization-scoped workspace with reviewable activity and evidence workflows, then turn approved records into reports that teams can export.',
    execution:
      'Built a Django application with role-based access, programs and indicators, activity approvals, an evidence library, preserved report snapshots, and PDF, DOCX, and CSV exports. Added guided onboarding, mobile-friendly layouts, and a preview-and-import path for KoboToolbox and ODK CSV files.',
    results: {
      metric1: 'PDF · DOCX · CSV',
      label1: 'Report exports',
      metric2: 'Kobo · ODK',
      label2: 'CSV import support',
      metric3: 'Pilot',
      label3: 'Current release stage',
    },
    resultHeading: 'What shipped',
    outcomeNote: 'The screenshot uses example data. Its activity and beneficiary counts are illustrative, not customer results.',
    testimonial: '',
    testimonialAuthor: '',
    featured: true,
  },
  {
    id: 'tickets-for-troops-linkedin',
    title: 'Tickets for Troops LinkedIn awareness campaign',
    client: 'Heroes Help',
    role: 'Digital marketer',
    industry: 'Nonprofit advocacy',
    timeframe: '21–23 September 2026',
    category: 'LinkedIn Campaign',
    image: '/case-studies/tickets-for-troops-linkedin.jpg',
    imageFit: 'contain',
    imageCaption: 'LinkedIn Campaign Manager summary for the 21–23 September 2026 campaign.',
    problem:
      'Raise awareness of Heroes Help’s Tickets for Troops initiative among a professional audience through video views.',
    strategy:
      'Run a focused, three-day LinkedIn video-view campaign with a $10 daily budget and review which professional audiences responded.',
    execution:
      'Promoted a 136-second campaign video and analyzed LinkedIn Campaign Manager results across industries and job functions. The campaign spent $30 in total.',
    results: {
      metric1: '10,677',
      label1: 'Impressions',
      metric2: '7,366',
      label2: 'Video views',
      metric3: '31',
      label3: 'Clicks',
    },
    outcomeNote:
      'Awareness result: 0.29% click-through rate, with no recorded leads or conversions. Exposure to named organizations does not imply their endorsement or partnership interest.',
    testimonial: '',
    testimonialAuthor: '',
    featured: true,
  },
]
