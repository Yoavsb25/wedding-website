/**
 * Wedding day schedule: order of events with time and title.
 * Used by the Schedule section. Times are displayed as-is (e.g. "17:00").
 * @module data/schedule
 * @typedef {import('../types').ScheduleEntry} ScheduleEntry
 */

/** @type {ScheduleEntry[]} */
export const schedule = [
  { time: '17:00', title: 'Wedding Reception' },
  { time: '18:30', title: 'Wedding Ceremony' },
  { time: '19:00', title: 'Dinner' },
];
