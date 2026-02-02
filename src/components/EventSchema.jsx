import { site } from '../data/site';

/**
 * Injects JSON-LD Event schema for SEO. Renders a script tag with the wedding event data.
 */
export default function EventSchema() {
  const startDate = new Date(site.dateISO).toISOString();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: site.title || `${site.coupleNames} – Wedding`,
    startDate,
    location: {
      '@type': 'Place',
      name: site.venueFullName,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.address,
      },
    },
    description: `Wedding of ${site.coupleNames} at ${site.venueFullName}. ${site.rsvpNote || ''}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
