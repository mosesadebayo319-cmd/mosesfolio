import type { PublicProject } from '@/src/lib/content-loader'

// Keep these recent case studies visible when older admin projects are stored in the database.
export const recentCaseStudies: PublicProject[] = [
  {
    id: 'impactdesk',
    title: 'ImpactDesk: NGO reporting workspace',
    client: 'ImpactDesk',
    industry: 'Nonprofit technology',
    timeframe: '2026 pilot release',
    category: 'Product Development',
    image: '/case-studies/impactdesk.svg',
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
    testimonial: '',
    testimonialAuthor: '',
    featured: true,
  },
  {
    id: 'tickets-for-troops-linkedin',
    title: 'Tickets for Troops LinkedIn awareness campaign',
    client: 'Heroes Help',
    industry: 'Nonprofit advocacy',
    timeframe: '21–23 September 2026',
    category: 'LinkedIn Campaign',
    image: '/case-studies/ticket-for-troops.svg',
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
