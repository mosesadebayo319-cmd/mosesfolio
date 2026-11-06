import type { Metadata } from 'next'
import ContactForm from '@/src/components/ContactForm'
import { pageSeo, site, whatsappHireUrl } from '@/src/data/content'
import { Arrow } from '@/src/components/CreativeUI'
import { PageIntro } from '@/src/components/CreativeSections'
export const metadata: Metadata = {
  title: pageSeo.contact.title,
  description: pageSeo.contact.description,
  alternates: { canonical: '/contact' },
}
export default function ContactPage() {
  return (
    <>
      <PageIntro
        label="EVERY GOOD PROJECT STARTS SOMEWHERE"
        title="Contact Moses"
        accent=""
      >
        <p>
          A campaign to run, a product to build, or a question to work through.
          Tell me what you have in mind. We’ll figure out the useful next step
          together.
        </p>
      </PageIntro>
      <section className="cr-section cr-wrap cr-contact-grid">
        <div>
          <div className="cr-contact-channel">
            <span>START A WORK CONVERSATION</span>
            <a href={whatsappHireUrl} target="_blank" rel="noopener noreferrer">
              Say hello on WhatsApp
            </a>
            <p>{site.whatsappPhone}</p>
          </div>
          <div className="cr-contact-channel">
            <span>EMAIL ME</span>
            <a href={'mailto:' + site.email}>{site.email}</a>
          </div>
          <div className="cr-contact-channel">
            <span>CALL ME DIRECTLY</span>
            <a href={'tel:+' + site.callRaw}>{site.phone}</a>
          </div>
          <div className="cr-contact-channel">
            <span>WHERE I AM</span>
            <p>{site.location}</p>
            <p>Monday to Friday, 9am to 6pm WAT</p>
          </div>
          <div className="cr-inline-actions">
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="cr-text-link"
            >
              LinkedIn <Arrow />
            </a>
            <a
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="cr-text-link"
            >
              GitHub <Arrow />
            </a>
          </div>
        </div>
        <div className="cr-contact-form">
          <h2>Tell me about your project.</h2>
          <p>
            A little context goes a long way. Share your goals, your timing, and
            a budget if you have one.
          </p>
          <ContactForm />
        </div>
      </section>
    </>
  )
}
