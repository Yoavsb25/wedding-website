/**
 * Generate .ics file content and Google Calendar URL for the wedding event.
 * Uses site.dateISO, title, location from site data.
 */

function escapeIcs(str) {
  return String(str).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

/**
 * @param {{ dateISO: string; title?: string; coupleNames?: string; venueFullName?: string; address?: string }} site
 * @returns {string} .ics file content
 */
export function buildIcsContent(site) {
  const start = new Date(site.dateISO);
  const end = new Date(start.getTime() + 4 * 60 * 60 * 1000); // +4h default
  const title = site.title || `${site.coupleNames || 'Wedding'} – Save the date`;
  const location = [site.venueFullName, site.address].filter(Boolean).join(', ');
  const formatICSDate = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding//Save the date//EN',
    'BEGIN:VEVENT',
    `UID:wedding-${start.getTime()}@wedding`,
    `DTSTAMP:${formatICSDate(new Date())}`,
    `DTSTART:${formatICSDate(start)}`,
    `DTEND:${formatICSDate(end)}`,
    `SUMMARY:${escapeIcs(title)}`,
    location ? `LOCATION:${escapeIcs(location)}` : '',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .filter(Boolean)
    .join('\r\n');
}

/**
 * @param {{ dateISO: string; title?: string; coupleNames?: string; venueFullName?: string; address?: string }} site
 * @returns {string} Google Calendar add-event URL
 */
export function buildGoogleCalendarUrl(site) {
  const start = new Date(site.dateISO);
  const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);
  const title = `${site.coupleNames || 'Maya & Yoav'} – Save the date`;
  const location = [site.venueFullName, site.address].filter(Boolean).join(', ');
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${start.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z/, 'Z')}/${end.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z/, 'Z')}`,
  });
  if (location) params.set('location', location);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Trigger download of .ics file.
 * @param {string} content
 * @param {string} filename
 */
export function downloadIcs(content, filename = 'wedding-save-the-date.ics') {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
