import type { PublicProject } from '@/src/lib/content-loader'

// These additions are kept in code so they appear even when the admin database
// contains older published projects. Add verified campaign results when supplied.
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
    id: 'ticket-for-troops-linkedin',
    title: 'Ticket for Troops LinkedIn campaign',
    client: 'Heroes Help',
    industry: 'Nonprofit advocacy',
    timeframe: 'Recent campaign',
    category: 'LinkedIn Campaign',
    image: '/case-studies/ticket-for-troops.svg',
    problem:
      'Bring the Ticket for Troops initiative into Heroes Help’s LinkedIn communications.',
    strategy:
      'Use a campaign focused on Ticket for Troops within the organization’s professional network presence.',
    execution:
      'Delivered the Ticket for Troops campaign on LinkedIn as part of Heroes Help’s advocacy work.',
    results: {
      metric1: '',
      label1: '',
      metric2: '',
      label2: '',
      metric3: '',
      label3: '',
    },
    testimonial: '',
    testimonialAuthor: '',
    featured: true,
  },
]
