export const site = {
  title: 'Maya & Yoav\'s Wedding',
  coupleNames: 'Maya & Yoav',
  dateISO: '2026-05-30T17:00:00+03:00',
  footerDate: 'May 30, 2026',
  venueName: 'R48',
  /** Display name; must match Google Maps: "R48 Hotel and Garden" */
  venueFullName: 'R48 Hotel and Garden',
  address: '48 Rothschild Boulevard, Tel Aviv',
  locationShort: 'R48, TLV',
  /** Link to open in Google Maps (search by place name) */
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=R48+Hotel+and+Garden+48+Rothschild+Boulevard+Tel+Aviv',
  /** Embedded map iframe – shows R48 Hotel and Garden so guests can see where it’s located */
  mapsEmbedUrl: 'https://www.google.com/maps?q=R48+Hotel+and+Garden+48+Rothschild+Boulevard+Tel+Aviv&output=embed',
  /** Venue photos shown side by side (venue exterior, garden/backyard) */
  venueImages: ['/images/venue.jpeg', '/images/hotel-lobby.png'],
  socialUrl: '',
  /** Closest nearby parking – name, embed URL for iframe, and link to open in Google Maps */
  parkingName: 'Beit Hadar Parking Lot',
  parkingMapsEmbedUrl: 'https://www.google.com/maps?q=Beit+Hadar+Parking+Lot&output=embed',
  parkingMapsUrl: 'https://www.google.com/maps/place/Beit+Hadar+Parking+Lot/@32.063877,34.777034,17z/data=!3m1!4b1!4m6!3m5!1s0x151d4b7ce106ac0b:0x55ffd4af39e11c93!8m2!3d32.063877!4d34.777034!16s%2Fg%2F1yfjjdhvk?entry=ttu',
  /** Parking instructions for guests */
  parkingInstructions:
    'There is no arrangement with any public parking in the area. The closest nearby parking is Beit Hadar Parking Lot, a short walk from the venue at 48 Rothschild Boulevard.',
  /** Photo albums for the Photos section */
  photos: {
    wedding: {
      format: 'jpg',
      albumUrl: 'https://photos.app.goo.gl/3avovSBdRE2qmePk9',
      images: {
        featured: '/images/photos/wedding/featured',
        thumbs: [
          '/images/photos/wedding/thumb-1',
          '/images/photos/wedding/thumb-2',
          '/images/photos/wedding/thumb-3',
          '/images/photos/wedding/thumb-4',
          '/images/photos/wedding/thumb-5',
          '/images/photos/wedding/thumb-6',
        ],
      },
    },
    poolParty: {
      format: 'jpg',
      albumUrl: 'https://drive.google.com/drive/folders/1QBWVrbHR7jrWVy0KSd7HzchtgXwXJFDK?usp=sharing',
      images: {
        featured: '/images/photos/pool-party/featured',
        thumbs: [
          '/images/photos/pool-party/thumb-1',
          '/images/photos/pool-party/thumb-2',
          '/images/photos/pool-party/thumb-3',
          '/images/photos/pool-party/thumb-4',
          '/images/photos/pool-party/thumb-5',
          '/images/photos/pool-party/thumb-6',
        ],
      },
    },
    filmCamera: {
      format: 'JPG',
      albumUrl: 'https://drive.google.com/drive/u/0/folders/1XUBw3fmJ9hKgj9C7OaBhgz42TE9tIUmC',
      images: {
        featured: '/images/photos/film-camera/featured',
        thumbs: [
          '/images/photos/film-camera/thumb-1',
          '/images/photos/film-camera/thumb-2',
          '/images/photos/film-camera/thumb-3',
          '/images/photos/film-camera/thumb-4',
          '/images/photos/film-camera/thumb-5',
          '/images/photos/film-camera/thumb-6',
        ],
      },
    },
  },
};
