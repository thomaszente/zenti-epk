/* ============================================================
   All of the press kit's wording and data lives here.
   Edit this file to update the site — no other file needs touching.
   Images live in public/img/ and are referenced by file name.
   ============================================================ */

import {
  FIND_THAT_LOVE_PEAKS,
  DUST_BUNNY_PEAKS,
  BOOMIN_NOW_PEAKS,
  ZEN_FUR_ELISE_PEAKS
} from './waveforms.js';

export const CONTACT = {
  email: 'zentimusic@gmail.com',
  instagram: 'https://instagram.com/zentimusic',
  instagramHandle: '@zentimusic',
  cosmotion: 'https://instagram.com/cosmotion.space',
  cosmotionHandle: '@cosmotion.space',
  spotify: 'https://open.spotify.com/artist/5cwPDq4NrVBXRySkiLMkiL',
  soundcloud: 'https://soundcloud.com/zentimusic',
  beatport: 'https://www.beatport.com/artist/zenti/1146352',
  linktree: 'https://linktr.ee/zenti',
  originals: 'https://soundcloud.com/zentimusic/sets/original-tracks',
  photoFolder: 'https://drive.google.com/drive/folders/1JY8Lvceze8-Eia08m0d-jRnWuwT7h1sn',
  basedLine: 'Austin based. Available across the US and internationally.'
};

export const HERO = {
  kicker: 'Electronic press kit · 2026',
  headline: 'Deep Magic Music',
  tagline: 'shaped into a journey for the room and the hour.',
  image: 'img/hero.jpg',
  imageAlt: 'ZENTI at the decks in black and white, light beams cutting through haze behind him'
};

export const FACTS = [
  { label: 'Based', value: 'Austin, Texas' },
  { label: 'Home scenes', value: 'ATX / NYC / MIA' },
  { label: 'Festivals', value: 'Burning Man, Envision, Lightning in a Bottle, Texas Eclipse' },
  { label: 'Founder', value: 'COSMOTION, 100+ events since 2015' }
];

export const BIO = {
  image: 'img/p-hat.jpg',
  imageAlt: 'Portrait of ZENTI in a wide-brimmed hat and dark glasses',
  heading: 'Between the dance floor and the unknown.',
  lengths: [
    { id: 'short', label: 'Short' },
    { id: 'medium', label: 'Medium' },
    { id: 'full', label: 'Full' }
  ],
  text: {
    short: [
      'ZENTI is an Austin-based DJ and producer blending deep house, melodic techno, funk and world music into hypnotic journeys tailored to the space and time. He is the founder of COSMOTION, a label and event series that fuses music, art and performance.'
    ],
    medium: [
      'ZENTI is an Austin-based DJ and producer known for an eclectic blend of deep house, melodic techno, funk and world music.',
      'Ready for any club room, festival stage or special event, he crafts journeys tailored to the space and time. He has played Burning Man, Envision Festival, Lightning in a Bottle and Texas Eclipse, sharing lineups with Lee Burridge, Bedouin, Monolink, Maceo Plex and WhoMadeWho.',
      'His music is released on Still Play, Cafe De Anatolia, A Magic Sun, Lump Records and Kosa. ZENTI is also the founder of COSMOTION, a label and event series that fuses music, art and performance into immersive events.'
    ],
    full: [
      'ZENTI creates hypnotic, unpredictable musical journeys where deep grooves, worldly rhythms and cinematic textures converge.',
      'Rooted in Austin and shaped by years immersed in underground scenes from New York and Miami to Burning Man, his sound moves fluidly between deep house, melodic techno, funk and world music. He is known for intuitive, emotionally driven sets, each one built for the room and the hour.',
      'He has played Burning Man, Envision Festival, Lightning in a Bottle and Texas Eclipse, and rooms including ZERO in New York, Do Not Sit On The Furniture in Miami, and Kingdom and The Concourse Project in Austin. He has shared lineups with Lee Burridge, Bedouin, Monolink, Maceo Plex, WhoMadeWho, Dubfire, Stavroz and Jan Blomqvist.',
      'His music is released on Still Play, Cafe De Anatolia, A Magic Sun, Lump Records and Kosa, with guest mixes for Desert Hut, Magician On Duty and Do Not Sit.',
      'ZENTI is also the founder of COSMOTION, a label and event series that has fused music, art and performance into more than 100 immersive events since 2015.'
    ]
  }
};

/* The journey dial. pts is the energy arc, first track to last. */
export const SLOTS = [
  {
    k: 'Sunset',
    c: '#E9A45C',
    t: 'Let them arrive.',
    d: 'Worldly rhythms, organic percussion and warm, unhurried grooves. Music for golden light and a floor that is still finding itself.',
    tags: ['Organic house', 'World music', 'Slow-burn grooves'],
    proof: 'Festival daylight sets at Envision, Costa Rica.',
    pts: [0.18, 0.24, 0.32, 0.38, 0.46, 0.52, 0.6, 0.66]
  },
  {
    k: 'Opening',
    c: '#D9825E',
    t: 'Set the table.',
    d: 'Deep and patient. Builds the room step by step and hands the headliner a warm floor, never a tired one.',
    tags: ['Deep house', 'Hypnotic', 'Steady build'],
    proof: 'Opened for WhoMadeWho at The Concourse Project. Support for Lee Burridge and Bedouin at Kingdom.',
    pts: [0.14, 0.2, 0.28, 0.36, 0.45, 0.55, 0.66, 0.76]
  },
  {
    k: 'Peak hour',
    c: '#E0566F',
    t: 'Earn the big moments.',
    d: 'Melodic techno drive with funk in the low end. Tension, release, and the track nobody saw coming.',
    tags: ['Melodic techno', 'Driving', 'Funk-laced'],
    proof: 'A 3 hour set alongside Maceo Plex at The Concourse Project.',
    pts: [0.5, 0.62, 0.74, 0.6, 0.82, 0.94, 0.78, 0.9]
  },
  {
    k: 'After hours',
    c: '#8D7BEA',
    t: 'Keep the floor that stays.',
    d: 'Hypnotic and unpredictable. Long blends, strange turns, and deep pockets for the dancers who are in it until the end.',
    tags: ['Deep and trippy', 'Long blends', 'Left turns'],
    proof: '10 pm to 5 am at Do Not Sit On The Furniture, Miami Beach.',
    pts: [0.7, 0.62, 0.72, 0.56, 0.66, 0.5, 0.58, 0.44]
  },
  {
    k: 'Sunrise',
    c: '#F0B7A0',
    t: 'Lift as the light comes up.',
    d: 'Emotive and cinematic. Melodies that open slowly and land right as the sky turns.',
    tags: ['Emotive', 'Cinematic', 'Melodic house'],
    proof: 'Caravan of Light at Burning Man.',
    pts: [0.34, 0.3, 0.38, 0.46, 0.58, 0.7, 0.82, 0.74]
  }
];

export const MARQUEE = [
  { name: 'Lee Burridge', note: 'Kingdom, Austin' },
  { name: 'Bedouin', note: 'Kingdom, Austin · 2025' },
  { name: 'Maceo Plex', note: 'The Concourse Project · 3 hour set · 2024' },
  { name: 'WhoMadeWho', note: 'The Concourse Project · opening set · 2023' },
  { name: 'Envision Festival', note: 'Uvita, Costa Rica · 2024' },
  { name: 'Burning Man', note: 'Caravan of Light' }
];

/* [name, place tag, 1 = headliner] */
export const EXPERIENCE = [
  {
    id: 'festivals',
    h: 'Festivals',
    n: [
      ['Burning Man', 'NV'], ['Envision Festival', 'Costa Rica'], ['Lightning in a Bottle', 'CA'],
      ['Texas Eclipse Festival', 'TX'], ['LoveBurn', 'MIA'], ['Luna Obscura', 'Mexico'],
      ['Electric Fuel Station', '']
    ]
  },
  {
    id: 'rooms',
    h: 'Clubs and event series',
    n: [
      ['ZERO', 'NY'], ['Do Not Sit On The Furniture', 'MIA'], ['The Concourse Project', 'ATX'],
      ['Kingdom', 'ATX'], ['House of Yes', 'NY'], ['Sonic Jungle', 'NY'], ['Gospel', 'NY'],
      ['JunXion', 'NY'], ['Orijins', 'NY'], ['The Kazbah', ''], ['iFeel', 'NY'],
      ['Love Medicine', 'NY'], ['A Forest Dark', 'NY'], ['Hqueue', 'NY'], ['Unveiled', 'NY'],
      ['Chetana', 'NY'], ['Mila', 'MIA'], ['Illumina Tribe', 'MIA'], ['Tierra Santa', 'MIA'],
      ['Something Else', 'MIA'], ['Aesthesis', 'LA'], ['Members', 'LA'], ['Koncept', 'LA'],
      ['Caravan of Light', 'Burning Man'], ['Opulent Temple', 'Burning Man'], ['Zephyr', 'Mexico'],
      ['ALTAR', ''], ['Rippers Row', ''], ['Luna', 'ATX'], ['Nowhere', 'ATX']
    ]
  },
  {
    id: 'artists',
    h: 'Played alongside',
    n: [
      ['Lee Burridge', '', 1], ['Bedouin', '', 1], ['Monolink', '', 1], ['Maceo Plex', '', 1],
      ['WhoMadeWho', '', 1], ['Dubfire', '', 1], ['Stavroz', '', 1], ['Jan Blomqvist', '', 1],
      ['Armen Miran', '', 1], ['Behrouz', '', 1], ['Rodriguez Jr.', '', 1], ['Township Rebellion', '', 1],
      ['David Hohme'], ['Just Emma'], ['Davi'], ['Goldcap'], ['Lemurian'], ['Wild Dark'],
      ['Feathered Sun'], ['Sarkis Mikael'], ['Unders'], ['Sabo'], ['Rico Loop'], ['Magician On Duty'],
      ['The Soul Brothers'], ['Brian Cid'], ['KMLN'], ['Allen Hulsey'], ['Seth Schwartz'],
      ['Nico Stojan'], ['Maz'], ['Joeski'], ['YokoO'], ['Atish'], ['Oceanvs Orientalis'],
      ['Martha Van Straaten'], ['Fabian Krooss'], ['Caleesi & Sarah Kreis'], ['Enamour'], ['Cioz'],
      ['Anstacia'], ['Kora'], ['Parallelle'], ['Superflu'], ['Aiwaa']
    ]
  },
  {
    id: 'mixes',
    h: 'Podcasts and mix series',
    n: [
      ['Desert Hut'], ['Magician On Duty'], ['A Magic Sun'], ['Do Not Sit'], ['Abracadabra'],
      ['Deep House LA'], ['DeeperSounds / Pure Ibiza'], ['Hot Situations'], ['Frisky Radio'],
      ['Cirque Noir'], ['Husa Sounds'], ['Sound of Symmetry']
    ]
  },
  {
    id: 'labels',
    h: 'Labels',
    n: [['Still Play'], ['Cafe De Anatolia'], ['A Magic Sun'], ['Lump Records'], ['Kosa'], ['COSMOTION']]
  }
];

/* Lets a search for "Miami" match anything tagged MIA. */
export const CITY_ALIASES = {
  ny: 'new york nyc brooklyn',
  mia: 'miami florida',
  atx: 'austin texas',
  la: 'los angeles california',
  nv: 'nevada black rock playa',
  ca: 'california',
  tx: 'texas'
};

export const FLYERS = [
  { img: 'img/f-burridge.jpg', alt: 'Flyer: Lee Burridge with ZENTI and Ava Alika at Kingdom', title: 'Lee Burridge', note: 'Support · Kingdom, Austin' },
  { img: 'img/f-bedouin.jpg', alt: 'Flyer: Bedouin, support by ZENTI and Pachakroma at Kingdom', title: 'Bedouin', note: 'Support · Kingdom, Austin · March 2025' },
  { img: 'img/f-maceo.jpg', alt: 'Flyer: Maceo Plex with ZENTI, 3 hour set, The Concourse Project', title: 'Maceo Plex', note: '3 hour set · The Concourse Project · February 2024' },
  { img: 'img/f-envision.jpg', alt: 'Flyer: Envision Festival artist card for ZENTI', title: 'Envision Festival', note: 'Costa Rica' },
  { img: 'img/f-luna.jpg', alt: 'Flyer: Luna Obscura lineup including ZENTI', title: 'Luna Obscura', note: 'Rancho El Tinieblo, Mexico' },
  { img: 'img/f-donotsit.jpg', alt: 'Flyer: Do Not Sit On The Furniture presents ZENTI and Octa Digio', title: 'Do Not Sit On The Furniture', note: 'Headline night · Miami Beach' },
  { img: 'img/f-pinkmoon.jpg', alt: 'Flyer: COSMOTION presents Pink Moon with Lemurian, Orijins and ZENTI', title: 'COSMOTION presents Pink Moon', note: 'With Lemurian and Orijins · Austin' },
  { img: 'img/f-sakara.jpg', alt: 'Flyer: Sakara with Eli Light, ZENTI, Orijins b2b Audius', title: 'Sakara', note: 'With Eli Light and Orijins' }
];

export const MIXES = [
  { kind: 'Live at ZERO NY', title: '4th of July in The Water Tower', note: 'New York', url: 'https://soundcloud.com/zentimusic/zero-4th' },
  { kind: 'Live at Burning Man', title: 'Opulent Temple', note: 'Black Rock City · 2026', url: 'https://soundcloud.com/zentimusic/opulent-bm26' },
  { kind: 'Live at Kingdom', title: 'Opening for Bedouin', note: 'Austin', url: 'https://soundcloud.com/zentimusic/bedouin-kingdom' },
  { kind: 'Live at The Concourse Project', title: 'Opening for Monolink', note: 'Austin · 2026', url: 'https://soundcloud.com/zentimusic/concourse2026' },
  { kind: 'Guest mix', title: 'Magician On Duty', note: 'Journey Series', url: 'https://soundcloud.com/magicianonduty/zenti-is-magician-on-duty-journey-series' },
  { kind: 'Guest mix', title: 'Desert Hut Podcast Series', note: 'Chapter 109', url: 'https://soundcloud.com/deserthut/dhpsch109zenti' }
];

export const RELEASES = [
  { img: 'img/r-kosa.jpg', alt: "Cover art: ZENTI's Zen Mood on Kosa, catalog KOSA188", badge: 'Kosa · KOSA188', title: 'Zen Mood', note: 'Remixes by Indiano, Nofrontera and Tolga Maktay' },
  { img: 'img/r-lump.jpg', alt: 'Cover art: PSI V/A on Lump Records', title: 'PSI V/A', note: 'Lump Records' },
  { img: 'img/r-cafe.jpg', alt: 'Cover art: The Great Journey on Cafe De Anatolia', title: 'The Great Journey', note: 'Cafe De Anatolia · with Kalico Jak' },
  { img: 'img/r-sun.jpg', alt: 'Cover art: Solar Call on A Magic Sun', title: 'Solar Call', note: 'A Magic Sun' }
];

/* The originals that play on the page, in order. Audio lives in public/audio/.
   Waveform readings are in waveforms.js. */
export const TRACKS = [
  {
    id: 'find-that-love',
    title: 'Find That Love',
    credit: '2026 · original',
    note: 'Full track. Press play, or click the waveform to jump.',
    src: 'audio/find-that-love.mp3',
    duration: 325.2,
    peaks: FIND_THAT_LOVE_PEAKS
  },
  {
    id: 'dust-bunny',
    title: 'Dust Bunny',
    credit: '2026 · original',
    note: 'Full track. Press play, or click the waveform to jump.',
    src: 'audio/dust-bunny.mp3',
    duration: 314.75,
    peaks: DUST_BUNNY_PEAKS
  },
  {
    id: 'boomin-now',
    title: 'Boomin’ Now',
    credit: '2026 · original',
    note: 'Full track. Press play, or click the waveform to jump.',
    src: 'audio/boomin-now.mp3',
    duration: 355.21,
    peaks: BOOMIN_NOW_PEAKS
  },
  {
    id: 'zen-fur-elise',
    title: 'Zen Fur Elise',
    credit: '2025 · original',
    note: 'Full track. Press play, or click the waveform to jump.',
    src: 'audio/zen-fur-elise.mp3',
    duration: 300.56,
    peaks: ZEN_FUR_ELISE_PEAKS
  }
];

export const GALLERY = [
  { img: 'img/g-coat.jpg', alt: 'Studio portrait, crouched in a white coat and wide-brimmed hat' },
  { img: 'img/g-bw.jpg', alt: 'Black and white, at the decks' },
  { img: 'img/g-dragon.jpg', alt: 'Studio portrait in an embroidered dragon jacket' },
  { img: 'img/g-playa.jpg', alt: 'ZENTI seated on a sculpture on the playa' },
  { img: 'img/p-hat.jpg', alt: 'Portrait in a wide-brimmed hat' },
  { img: 'img/g-purple.jpg', alt: 'Mixing in purple light' },
  { img: 'img/p-sculpt.jpg', alt: 'Standing on a steel sculpture at night' },
  { img: 'img/g-altar.jpg', alt: 'A gong ceremony at a candlelit altar stage' }
];

export const RIDER = [
  { h: 'CDJs', b: 'Pioneer CDJ-3000 or CDJ-2000NXS2', s: 'At least 2 decks, linked.' },
  { h: 'Mixer', b: 'Pioneer DJM-V10, A9 or 900NXS2', s: 'Any of the three works.' },
  { h: 'Sound', b: 'Booth monitors and a quality PA with sub', s: 'Proper monitoring in the booth matters most.' }
];

export const RIDER_TEXT = `ZENTI technical rider (DJ set)

CDJs: Pioneer CDJ-3000 or CDJ-2000NXS2, at least 2 decks, linked
Mixer: Pioneer DJM-V10, A9 or 900NXS2
Sound: proper booth monitors, high quality PA with sub

If you have something else, please let us know.
Contact: ${CONTACT.email}`;

export const BOOKING_OPTIONS = {
  slots: ['Not sure yet', 'Sunset', 'Opening', 'Peak hour', 'After hours', 'Sunrise'],
  types: ['Club night', 'Festival', 'Private or brand event', 'Retreat or gathering', 'Guest mix or podcast'],
  lengths: ['60 minutes', '90 minutes', '2 hours', '3 hours or more', 'Not sure yet']
};
