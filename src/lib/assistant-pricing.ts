export const pricingCatalog = {
  digital_marketing: {
    label: 'Digital marketing',
    sme: { min: 50000, max: 250000, unit: 'per month', openEnded: false },
    mid_market: { min: 350000, max: 1500000, unit: 'per month', openEnded: false },
    enterprise: { min: 1500000, max: 3000000, unit: 'per month', openEnded: true },
  },
  web_development: {
    label: 'Web development',
    sme: { min: 150000, max: 450000, unit: 'per project', openEnded: false },
    mid_market: { min: 500000, max: 2000000, unit: 'per project', openEnded: false },
    enterprise: { min: 2500000, max: 15000000, unit: 'per project', openEnded: true },
  },
  seo: {
    label: 'SEO services',
    sme: { min: 80000, max: 350000, unit: 'per month', openEnded: false },
    mid_market: { min: 500000, max: 2000000, unit: 'per month', openEnded: false },
    enterprise: { min: 2000000, max: 4500000, unit: 'per month', openEnded: true },
  },
  software_development: {
    label: 'Software development',
    sme: { min: 15000, max: 40000, unit: 'per hour', openEnded: false },
    mid_market: { min: 45000, max: 120000, unit: 'per hour', openEnded: false },
    enterprise: { min: 2500000, max: 20000000, unit: 'per project', openEnded: true },
  },
} as const

const tiers = { sme: 'Freelancer / SME', mid_market: 'Mid-market agency', enterprise: 'Premium / enterprise' } as const

export function approvedRange(service: unknown, tier: unknown) {
  if (typeof service !== 'string' || !Object.hasOwn(pricingCatalog, service) || typeof tier !== 'string' || !Object.hasOwn(tiers, tier)) return null
  const entry = pricingCatalog[service as keyof typeof pricingCatalog]
  const range = entry[tier as keyof typeof tiers]
  return { service: entry.label, tier: tiers[tier as keyof typeof tiers], currency: 'NGN', ...range }
}
