/**
 * Poetic countdown phrase variants by "days until" bucket.
 * Used by Countdown.jsx; {n} is replaced with the day count.
 */
export const countdownCopy = [
  {
    daysMin: 2,
    daysMax: Infinity,
    phrases: [
      "Only {n} sunsets until 'I do'",
      "{n} sunsets until we say yes",
      "{n} mornings until our day",
      "{n} moons until the big day",
    ],
    emoji: '',
  },
  {
    daysMin: 1,
    daysMax: 1,
    phrases: [
      "One more sunset until 'I do'",
      "Tomorrow we say 'I do'",
    ],
    emoji: '',
  },
  {
    daysMin: 0,
    daysMax: 0,
    phrases: [
      "Today's the day",
      "Today we say 'I do'",
    ],
    emoji: '',
  },
  {
    daysMin: -Infinity,
    daysMax: -1,
    phrases: ["We did!"],
    emoji: '',
  },
];
