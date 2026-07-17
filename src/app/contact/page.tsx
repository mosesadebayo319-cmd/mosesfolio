import ContactForm from '@/src/components/ContactForm'
import { site } from '@/src/data/content'

export const metadata = {
  title: 'Contact | Moses Oluwashina Adebayo',
  description:
    'Get in touch with Moses Adebayo for digital marketing and project management.',
}

export default function ContactPage() {
  const info = [
    {
      title: 'Email',
      value: site.email,
      link: `mailto:${site.email}`,
    },
    {
      title: 'WhatsApp',
      value: site.phone,
      link: site.social.whatsapp,
    },
    {
      title: 'Location',
      value: site.location,
      link: '#',
    },
  ]

  return (
    <div className="min-h-screen">
      <section className="py-20 md:py-32 bg-card border-b border-border">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="accent-line mx-auto mb-6" />
            <h1 className="section-heading mb-6">Get In Touch</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Ready to grow your business? Let&apos;s discuss your goals and how
              I can help you achieve them.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="space-y-6">
              {info.map((item) => (
                <div
                  key={item.title}
                  className="p-6 bg-card rounded-xl border border-border"
                >
                  <h3 className="font-heading font-semibold text-accent mb-2">
                    {item.title}
                  </h3>
                  {item.link !== '#' ? (
                    <a
                      href={item.link}
                      target={item.link.startsWith('http') ? '_blank' : undefined}
                      rel={
                        item.link.startsWith('http')
                          ? 'noopener noreferrer'
                          : undefined
                      }
                      className="text-foreground hover:text-accent transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p>{item.value}</p>
                  )}
                </div>
              ))}

              <div className="p-6 bg-card rounded-xl border border-border">
                <h3 className="font-heading font-semibold text-accent mb-2">
                  Business Hours
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {site.hours}
                </p>
                <p className="text-sm text-muted-foreground">
                  Response time: {site.responseTime}
                </p>
              </div>

              <div className="p-6 bg-card rounded-xl border border-border">
                <h3 className="font-heading font-semibold text-accent mb-3">
                  Social
                </h3>
                <div className="flex flex-col gap-2 text-sm">
                  <a
                    href={site.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href={site.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 p-8 bg-card rounded-xl border border-border">
              <h2 className="text-2xl font-heading font-semibold mb-6">
                Send a Message
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
