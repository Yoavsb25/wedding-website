/**
 * Footer and anchor navigation links. Order and ids must match section id attributes.
 * Labels are keys into copy (see App.jsx) so copy can be changed without editing this file.
 * @module data/navLinks
 */

/** @type {{ id: string; href: string; labelKey: string }[]} */
export const navLinks = [
  { id: 'hero', href: '#hero', labelKey: 'home' },
  { id: 'schedule', href: '#schedule', labelKey: 'schedule' },
  { id: 'location', href: '#location', labelKey: 'location' },
  { id: 'parking', href: '#parking', labelKey: 'parking' },
  { id: 'rsvp', href: '#rsvp', labelKey: 'rsvp' },
];
