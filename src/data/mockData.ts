import { CityInfo, TouristAttraction, Hotel, FlightOption, CabOption, TourPackage } from '../types';

export const HERO_IMAGE = '/src/assets/images/russia_hero_moscow_1790741198019.jpg';
export const PETERSBURG_IMAGE = '/src/assets/images/saint_petersburg_palace_1790741212916.jpg';
export const BAIKAL_IMAGE = '/src/assets/images/lake_baikal_winter_1790741227272.jpg';
export const MURMANSK_IMAGE = '/src/assets/images/murmansk_northern_lights_1790741238489.jpg';

export const CITIES_DATA: CityInfo[] = [
  {
    id: 'moscow',
    name: 'Moscow',
    russianName: 'Москва',
    tagline: 'The Grand Capital of Tsars & Dazzling Metropolis',
    image: HERO_IMAGE,
    description: 'The monumental heart of Russia where medieval Kremlin fortresses meet high-speed modern lifestyle, world-class ballet, and palatial underground metro stations.',
    majorAttractions: ['Red Square', 'Moscow Kremlin', "St. Basil's Cathedral", 'Bolshoi Theatre', 'Arbat Street', 'Gorky Park'],
    estimatedDailyBudgetInr: 9500,
    recommendedDuration: '4 to 5 Days',
    bestTimeToVisit: 'May to October or December (Snow Festivities)',
    climateHighlights: 'Warm pleasant summers (22°C - 27°C); snowy wonderland winters (-5°C to -10°C).'
  },
  {
    id: 'saint-petersburg',
    name: 'Saint Petersburg',
    russianName: 'Санкт-Петербург',
    tagline: 'Venice of the North & Imperial Capital',
    image: PETERSBURG_IMAGE,
    description: "Peter the Great's romantic masterpiece on the Baltic Sea, renowned for baroque Winter Palace, drawbridges over Neva River, canals, and timeless imperial splendor.",
    majorAttractions: ['Hermitage Museum', 'Peterhof Palace', 'Spilled Blood Church', "St. Isaac's Cathedral", 'Nevsky Prospect', 'Mariinsky Theatre'],
    estimatedDailyBudgetInr: 8800,
    recommendedDuration: '4 to 5 Days',
    bestTimeToVisit: 'June to August (White Nights) or Autumn',
    climateHighlights: 'White Nights phenomenon in June; brisk autumn breezes; magical iced canals in winter.'
  },
  {
    id: 'sochi',
    name: 'Sochi',
    russianName: 'Сочи',
    tagline: 'Russian Riviera, Black Sea Palms & Caucasus Peaks',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    description: 'Subtropical resort coastline framed by towering snowcapped Caucasus mountains. Host city of the 2014 Winter Olympics, famous for seaside promenades and Rosa Khutor ski slopes.',
    majorAttractions: ['Olympic Park & F1 Track', 'Rosa Khutor Alpine Resort', 'Dendrarium Arboretum', 'Riviera Park', 'Matsesta Tea Plantations'],
    estimatedDailyBudgetInr: 7500,
    recommendedDuration: '3 to 4 Days',
    bestTimeToVisit: 'May to October for beach, Dec to March for skiing',
    climateHighlights: 'Subtropical warm climate; summer highs 28°C; alpine snow sports 45 mins away.'
  },
  {
    id: 'kazan',
    name: 'Kazan',
    russianName: 'Казань',
    tagline: 'The Cultural Crossroads of Europe and Asia',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80',
    description: 'The ancient capital of Tatarstan where Orthodox cathedrals and majestic Islamic minarets stand side by side on the banks of Volga River. Renowned for warm hospitality and Tatar gastronomy.',
    majorAttractions: ['Kazan Kremlin', 'Kul Sharif Mosque', 'Annunciation Cathedral', 'Bauman Walking Street', 'Temple of All Religions'],
    estimatedDailyBudgetInr: 6200,
    recommendedDuration: '2 to 3 Days',
    bestTimeToVisit: 'May to September',
    climateHighlights: 'Continental climate; warm summers and rich festival calendar.'
  },
  {
    id: 'murmansk',
    name: 'Murmansk',
    russianName: 'Мурманск',
    tagline: 'Arctic Gateway & Realm of Northern Lights',
    image: MURMANSK_IMAGE,
    description: 'The largest city north of the Arctic Circle, offering unforgettable Aurora Borealis hunting, snowmobile husky safaris, Sami reindeer camps, and icebreaker naval expeditions.',
    majorAttractions: ['Aurora Borealis Tours', 'Lenin Nuclear Icebreaker', 'Teriberka Arctic Ocean Village', 'Sami Reindeer Camp', 'Husky Sledding Park'],
    estimatedDailyBudgetInr: 10500,
    recommendedDuration: '3 to 4 Days',
    bestTimeToVisit: 'September to March (Aurora Season)',
    climateHighlights: 'Polar nights in mid-winter; crisp arctic air with thermal outdoor wear provided on tours.'
  },
  {
    id: 'vladivostok',
    name: 'Vladivostok',
    russianName: 'Владивосток',
    tagline: 'Pacific Gem & Terminus of Trans-Siberian Railroad',
    image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=1200&q=80',
    description: 'Dramatic port city perched on hills overlooking the Golden Horn Bay of the Pacific Ocean. Terminal stop of the legendary 9,289 km Trans-Siberian railway with fresh Kamchatka seafood.',
    majorAttractions: ['Zolotoy Rog Suspension Bridge', 'Trans-Siberian Kilometer 9289 Post', 'Russky Island Fortresses', 'Submarine S-56 Museum', 'Seafood Market'],
    estimatedDailyBudgetInr: 7800,
    recommendedDuration: '3 to 4 Days',
    bestTimeToVisit: 'August to October',
    climateHighlights: 'Maritime monsoon climate; warm late summers and scenic ocean fog.'
  }
];

export const ATTRACTIONS_DATA: TouristAttraction[] = [
  {
    id: 'red-square',
    name: 'Red Square',
    city: 'Moscow',
    cityId: 'moscow',
    image: HERO_IMAGE,
    description: 'The world-renowned cobblestone heart of Moscow, enclosed by the Kremlin red walls, State Historical Museum, and the famous GUM shopping arcade.',
    location: 'Center of Moscow, Metro: Okhotny Ryad',
    recommendedVisitingTime: '2 to 3 Hours (Best at evening illumination)',
    estimatedEntryPriceInr: 0,
    highlights: ['UNESCO World Heritage', 'Free Public Access', 'Night Illumination', 'Historic Milestones'],
    category: 'Historical'
  },
  {
    id: 'moscow-kremlin',
    name: 'Moscow Kremlin & Armoury',
    city: 'Moscow',
    cityId: 'moscow',
    image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1000&q=80',
    description: 'Ancient fortified citadel containing Tsarist cathedrals with gold domes, Tsar Cannon, Tsar Bell, and the dazzling State Armoury Chambers with Fabergé imperial eggs.',
    location: 'Borovitskaya Gate, Moscow',
    recommendedVisitingTime: '3 to 4 Hours',
    estimatedEntryPriceInr: 1400,
    highlights: ['Imperial Fabergé Eggs', 'Cathedral Square', 'Tsar Bell & Cannon', 'Diamond Fund Vaults'],
    category: 'Palace'
  },
  {
    id: 'saint-basils',
    name: "Saint Basil's Cathedral",
    city: 'Moscow',
    cityId: 'moscow',
    image: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&w=1000&q=80',
    description: "Ivan the Terrible's 16th-century architectural marvel with nine vividly patterned fairytale onion domes that symbolize Russian Orthodox heritage.",
    location: 'Red Square Southern End, Moscow',
    recommendedVisitingTime: '1.5 to 2 Hours',
    estimatedEntryPriceInr: 950,
    highlights: ['Iconic Onion Domes', 'Frescoed Chapels', 'Tsarist Relics', 'Top Photo Spot'],
    category: 'Architecture'
  },
  {
    id: 'hermitage-museum',
    name: 'State Hermitage Museum & Winter Palace',
    city: 'Saint Petersburg',
    cityId: 'saint-petersburg',
    image: PETERSBURG_IMAGE,
    description: 'One of the largest and most prestigious art museums in the world, holding over 3 million masterpieces inside the opulent baroque halls of the Russian Tsars.',
    location: 'Palace Square 2, Saint Petersburg',
    recommendedVisitingTime: '4 to 5 Hours',
    estimatedEntryPriceInr: 1200,
    highlights: ['Rembrandt & Da Vinci Works', 'Gold Malachite Room', 'Peacock Clock', 'Jordan Staircase'],
    category: 'Museum'
  },
  {
    id: 'peterhof-palace',
    name: 'Peterhof Palace & Grand Cascade Fountains',
    city: 'Saint Petersburg',
    cityId: 'saint-petersburg',
    image: 'https://images.unsplash.com/photo-1520106212299-d99c443e4568?auto=format&fit=crop&w=1000&q=80',
    description: "The 'Russian Versailles' situated on the Gulf of Finland, celebrated for 64 majestic gravity-fed fountains, 255 gilded bronze statues, and palatial gardens.",
    location: 'Petergof, Saint Petersburg (Hydrofoil accessible)',
    recommendedVisitingTime: 'Half Day (4 to 5 Hours)',
    estimatedEntryPriceInr: 1800,
    highlights: ['Samson Fountain', 'Hydrofoil Cruise Arrival', 'Upper & Lower Gardens', 'Baltic Sea Promenade'],
    category: 'Palace'
  },
  {
    id: 'spilled-blood-church',
    name: 'Church of the Savior on Spilled Blood',
    city: 'Saint Petersburg',
    cityId: 'saint-petersburg',
    image: 'https://images.unsplash.com/photo-1584467541268-b040f83be3fd?auto=format&fit=crop&w=1000&q=80',
    description: 'A breathtaking neo-Russian cathedral erected on the spot where Emperor Alexander II was assassinated, adorned with over 7,500 square meters of intricate mosaics.',
    location: 'Griboyedov Canal Embankment 2B',
    recommendedVisitingTime: '1.5 to 2 Hours',
    estimatedEntryPriceInr: 850,
    highlights: ['7,500 m² Intricate Mosaics', 'Canal Reflection Views', 'Gilded Enamel Cupolas'],
    category: 'Cultural'
  },
  {
    id: 'bolshoi-theatre',
    name: 'Bolshoi Theatre',
    city: 'Moscow',
    cityId: 'moscow',
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1000&q=80',
    description: 'The historic temple of Russian classical ballet and opera. Home to Swan Lake and Nutcracker performances beneath glistening gilded balconies.',
    location: 'Teatralnaya Square 1, Moscow',
    recommendedVisitingTime: '2 to 3 Hours (Show or Guided Tour)',
    estimatedEntryPriceInr: 3200,
    highlights: ['Russian Imperial Ballet', 'Acoustic Perfection', 'Historic Neo-classical Portico'],
    category: 'Cultural'
  },
  {
    id: 'lake-baikal',
    name: 'Lake Baikal & Olkhon Island',
    city: 'Irkutsk Region / Siberia',
    cityId: 'moscow',
    image: BAIKAL_IMAGE,
    description: 'The oldest, deepest and clearest freshwater lake on Earth. In winter it turns into a magical turquoise ice mirror with methane bubble ice formations.',
    location: 'Siberia (Accessible via Irkutsk flight)',
    recommendedVisitingTime: '2 to 3 Days Excursion',
    estimatedEntryPriceInr: 4500,
    highlights: ['Crystal Blue Ice Formations', 'Shaman Rock', 'Siberian Omul Fish Delicacy', 'Husky Treks'],
    category: 'Nature'
  },
  {
    id: 'sochi-rosa-khutor',
    name: 'Rosa Khutor & Olympic Park',
    city: 'Sochi',
    cityId: 'sochi',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80',
    description: 'Sochi 2014 Olympic coastal stadium cluster with dancing singing fountains, coupled with Rosa Khutor Caucasus cable car rides up to 2,320m peaks.',
    location: 'Olympic Park, Imeretinsky Bay & Krasnaya Polyana',
    recommendedVisitingTime: 'Full Day',
    estimatedEntryPriceInr: 2200,
    highlights: ['Gondola Peak at 2,320m', 'Olympic Stadium Cluster', 'Musical Fountain Show'],
    category: 'Nature'
  },
  {
    id: 'kazan-kremlin',
    name: 'Kazan Kremlin & Kul Sharif',
    city: 'Kazan',
    cityId: 'kazan',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1000&q=80',
    description: 'A 16th-century fortress blending Tatar and Slavic styles with the turquoise-topped Kul Sharif Mosque and the mysterious leaning Söyembikä Tower.',
    location: 'Kremlin Street, Kazan',
    recommendedVisitingTime: '2.5 to 3 Hours',
    estimatedEntryPriceInr: 650,
    highlights: ['Kul Sharif Turquoise Domes', 'Leaning Suyumbike Tower', 'Volga River Vista'],
    category: 'Historical'
  },
  {
    id: 'trans-siberian-railway',
    name: 'Trans-Siberian Railway Experience',
    city: 'Moscow to Vladivostok',
    cityId: 'moscow',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1000&q=80',
    description: 'The longest railway network on Earth stretching across two continents, 8 time zones, and endless birch forests, rivers, and Siberian vistas.',
    location: 'Departs Yaroslavsky Station, Moscow',
    recommendedVisitingTime: '1 to 7 Days Segment',
    estimatedEntryPriceInr: 8500,
    highlights: ['8 Time Zones Journey', 'Traditional Tea in Podstakannik', 'Unrivalled Cultural Immersion'],
    category: 'Cultural'
  }
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'pkg-budget-explorer',
    name: 'Budget Explorer Russia',
    subtitle: 'Essential Moscow & Saint Petersburg with Round-Trip Flights from India',
    tier: 'Budget',
    days: 6,
    nights: 5,
    cities: ['Moscow', 'Saint Petersburg'],
    hotelCategory: '3-Star Handpicked Central Hotels',
    flightIncluded: true,
    cabIncluded: true,
    sightseeingIncluded: true,
    mealsIncluded: 'Daily Continental Breakfast',
    pricePerPersonInr: 148000,
    totalEstimatedPriceInr: 296000, // 2 Pax base
    image: HERO_IMAGE,
    highlights: [
      'Round-trip international flight Delhi/Mumbai to Moscow',
      'High-speed Sapsan train ticket Moscow to St. Petersburg',
      'Pre-arranged airport pickup & drop transfers',
      'Guided walking tours of Red Square & Nevsky Prospect',
      'Assistance with Russian 16-day electronic visa (eVisa)'
    ],
    itinerarySummary: [
      { day: 1, title: 'Flight Arrival in Moscow', desc: 'Arrive at Sheremetyevo (SVO), chauffeur transfer to 3★ hotel, evening orientation walk around Arbat Street.' },
      { day: 2, title: 'Red Square & Kremlin Highlights', desc: "Visit Red Square, Saint Basil's Cathedral exterior, GUM, and historic Kremlin grounds." },
      { day: 3, title: 'Sapsan High-Speed Express to St. Petersburg', desc: 'Comfortable 4-hour bullet train journey across the Russian countryside. Check-in at St. Petersburg hotel.' },
      { day: 4, title: 'Hermitage Museum & Palace Square', desc: 'Guided entry into the Winter Palace art collections and canal boat cruise.' },
      { day: 5, title: 'Peterhof Gardens Excursion', desc: 'Visit the world-renowned Grand Cascade fountains and Baltic coast.' },
      { day: 6, title: 'Departure Flight Back to India', desc: 'Private transfer to Pulkovo Airport (LED) for return flight to India.' }
    ]
  },
  {
    id: 'pkg-russia-classic',
    name: 'Russia Classic Discovery',
    subtitle: 'The Gold Standard 8-Day Imperial Route with 4★ Comfort & Expert Guides',
    tier: 'Classic',
    days: 8,
    nights: 7,
    cities: ['Moscow', 'Saint Petersburg'],
    hotelCategory: '4-Star Premium Deluxe Hotels',
    flightIncluded: true,
    cabIncluded: true,
    sightseeingIncluded: true,
    mealsIncluded: 'Daily Buffet Breakfast + 2 Gala Russian Dinners',
    pricePerPersonInr: 225000,
    totalEstimatedPriceInr: 450000, // 2 Pax base (well under ₹5,00,000 maximum budget)
    featured: true,
    image: PETERSBURG_IMAGE,
    highlights: [
      'Round-trip international flights with checked baggage (23kg)',
      'Stay at 4★ Radisson Blu or Marriott Courtyard properties',
      'All airport & intercity transfers in air-conditioned private executive sedans',
      'Priority skip-the-line tickets to Moscow Kremlin Armoury & Hermitage',
      'Sapsan First/Business class high-speed train tickets included',
      'Bilingual English & Hindi speaking tour guide support on arrival'
    ],
    itinerarySummary: [
      { day: 1, title: 'Welcome to Moscow & Private Chauffeur', desc: 'Meet & greet at Moscow airport. Transfer in Mercedes E-Class to central 4★ hotel. Welcome drink.' },
      { day: 2, title: 'Grand Kremlin, Armoury & Red Square', desc: 'Explore the Tsar Bell, Diamond Fund, and Cathedral of the Annunciation. Evening Bolshoi photo stop.' },
      { day: 3, title: 'Metro Architecture & Tretyakov Gallery', desc: 'Tour the subterranean marble palaces of Moscow Metro, followed by Russia’s premier fine art collection.' },
      { day: 4, title: 'Sapsan Express to Saint Petersburg', desc: 'High-speed business class rail through picturesque forests. Evening Neva river illumination cruise.' },
      { day: 5, title: 'Imperial Hermitage & Winter Palace', desc: 'In-depth VIP guided tour of Catherine the Great’s gold state rooms and classical masters.' },
      { day: 6, title: 'Peterhof Palace & Catherine Palace Amber Room', desc: 'Private transfer to Tsarskoye Selo to witness the legendary reconstructed 8th Wonder Amber Room.' },
      { day: 7, title: 'Faberge Museum & Free Leisure Shopping', desc: 'Admire imperial Fabergé Easter eggs, souvenir shopping along Nevsky, and farewell Russian banquet.' },
      { day: 8, title: 'Homeward Flight to India', desc: 'Chauffeur transfer to St. Petersburg airport for your comfortable flight back home.' }
    ]
  },
  {
    id: 'pkg-premium-russia',
    name: 'Premium Russia & Black Sea Riviera',
    subtitle: 'Luxury 10-Day Triple City Experience: Moscow + Saint Petersburg + Sochi Resort',
    tier: 'Premium',
    days: 10,
    nights: 9,
    cities: ['Moscow', 'Saint Petersburg', 'Sochi'],
    hotelCategory: '5-Star Luxury Hotels (Four Seasons / Grand Hotel Europe / Swissôtel)',
    flightIncluded: true,
    cabIncluded: true,
    sightseeingIncluded: true,
    mealsIncluded: 'Gourmet Breakfasts + Private Chef Dinners',
    pricePerPersonInr: 385000,
    totalEstimatedPriceInr: 495000, // Tailored 1 or 2 pax package strictly calibrated under ₹5,00,000 budget cap
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Full round-trip international & domestic flight sector package (DEL-MOW-LED-AER-DEL)',
      '5-Star luxury heritage stays in Moscow, St. Petersburg & Sochi waterfront',
      'Dedicated private Mercedes V-Class minivan with personal chauffeur 24/7',
      'VIP private after-hours or fast-track entry to Hermitage & Kremlin Armoury',
      'Hydrofoil cruise to Peterhof and cable car pass to Rosa Khutor alpine peaks',
      'Concierge visa VIP submission assistance and local Russian SIM with unlimited data'
    ],
    itinerarySummary: [
      { day: 1, title: 'Arrival in Moscow – 5★ Luxury Check-in', desc: 'VIP meet at the aerobridge, expedited passport control, luxury transfer to Four Seasons or The Carlton Moscow.' },
      { day: 2, title: 'Private Kremlin Armoury & Diamond Fund', desc: 'Exclusive private guide through Russian tsarist jewels, followed by evening Red Square dinner.' },
      { day: 3, title: 'Moscow River Yacht Cruise & Bolshoi Ballet', desc: 'Gourmet lunch aboard Radisson Royal icebreaker yacht. Evening seats for world-class classical ballet.' },
      { day: 4, title: 'Sapsan Executive Train to St. Petersburg', desc: 'Transfer to Grand Hotel Europe, welcome caviar tasting and afternoon canal exploration.' },
      { day: 5, title: 'Hermitage Museum & Faberge VIP', desc: 'Curated 4-hour art walk through Tsarist halls, followed by dinner at Stroganoff Steak House.' },
      { day: 6, title: 'Peterhof Fountains & Catherine Palace', desc: 'Hydrofoil over the Gulf of Finland to Peterhof, followed by Amber Room tour.' },
      { day: 7, title: 'Flight to Sochi Riviera', desc: 'Domestic flight to Sochi. Check-in at 5★ Swissôtel Resort Sochi Kamelia with private Black Sea beach.' },
      { day: 8, title: 'Rosa Khutor Alpine Cable Car & Peaks', desc: 'Ascend to 2,320m mountain peak overlooking Caucasus range. Alpine lunch with panoramic views.' },
      { day: 9, title: 'Sochi Olympic Park & Thermal Springs', desc: 'Formula 1 circuit tour, botanical gardens, and relaxing seaside promenade sunset.' },
      { day: 10, title: 'Return Flight to India', desc: 'Private limousine transfer to Sochi International Airport (AER) with seamless connection back to India.' }
    ]
  },
  {
    id: 'pkg-murmansk-aurora',
    name: 'Arctic Aurora & Northern Lights Murmansk',
    subtitle: '7-Day Winter Wonderland: Moscow + Murmansk Arctic Safari',
    tier: 'Speciality',
    days: 7,
    nights: 6,
    cities: ['Moscow', 'Murmansk'],
    hotelCategory: '4-Star Central & Arctic Glass-Roof Igloo Lodge',
    flightIncluded: true,
    cabIncluded: true,
    sightseeingIncluded: true,
    mealsIncluded: 'Buffet Breakfast & Traditional Arctic Meals',
    pricePerPersonInr: 260000,
    totalEstimatedPriceInr: 475000, // 2 Pax package under ₹5,00,000 max budget
    image: MURMANSK_IMAGE,
    highlights: [
      'Two dedicated night Aurora Borealis chasing safaris with professional photographer',
      'Stay in heated Aurora Igloo with panoramic glass ceiling to watch lights from bed',
      'Husky dog sledding safari & reindeer feeding with indigenous Sami tribe',
      'Excursion to Teriberka village on the shores of the Arctic Ocean (Barents Sea)',
      'Complete thermal arctic suit & boots rental included for all outdoor excursions'
    ],
    itinerarySummary: [
      { day: 1, title: 'India to Moscow Arrival', desc: 'Arrive in Moscow, evening dinner and stay at 4★ hotel near Red Square.' },
      { day: 2, title: 'Moscow Highlights & Flight to Murmansk', desc: 'Quick morning Kremlin tour, afternoon flight to Murmansk above the Arctic Circle.' },
      { day: 3, title: 'Teriberka Arctic Ocean & Ship Graveyard', desc: 'Scenic snowmobile expedition across frozen tundra to the roaring Barents Sea.' },
      { day: 4, title: 'Husky Park & 1st Northern Lights Chase', desc: 'Drive your own team of energetic Siberian huskies. Evening Aurora hunt with astro-photographer.' },
      { day: 5, title: 'Sami Cultural Village & Glass Igloo Stay', desc: 'Reindeer sledging, traditional tea, and night stay under the celestial lights in a heated glass dome.' },
      { day: 6, title: 'Lenin Nuclear Icebreaker & Moscow Return', desc: 'Tour the world’s first nuclear icebreaker, afternoon flight back to Moscow.' },
      { day: 7, title: 'Moscow Shopping & Departure to India', desc: 'Souvenir shopping for matryoshka dolls and chocolate, transfer to airport for flight home.' }
    ]
  }
];

export const HOTELS_DATA: Hotel[] = [
  {
    id: 'h-mow-1',
    name: 'The Carlton Moscow',
    city: 'Moscow',
    cityId: 'moscow',
    category: '5-Star',
    starRating: 5,
    guestRating: 9.6,
    reviewCount: 1420,
    location: 'Tverskaya Street 3, Central Moscow',
    distanceToCenter: '0.2 km from Red Square',
    roomType: 'Superior King Room with Kremlin View',
    breakfastIncluded: true,
    facilities: ['Rooftop Champagne Bar', 'Luxury O2 Spa & Indoor Pool', 'Concierge Service', 'High-Speed WiFi', 'Fine Dining Restaurant'],
    pricePerNightInr: 28500,
    taxesAndFeesInr: 3200,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'h-mow-2',
    name: 'Radisson Collection Hotel, Moscow',
    city: 'Moscow',
    cityId: 'moscow',
    category: '5-Star',
    starRating: 5,
    guestRating: 9.4,
    reviewCount: 2180,
    location: 'Kutuzovsky Prospekt 2/1',
    distanceToCenter: '3.1 km from Red Square (Riverfront)',
    roomType: 'Deluxe City View Room',
    breakfastIncluded: true,
    facilities: ['Historic Stalin Skyscraper', '50m Olympic Pool', 'Private Flotilla Pier', '8 International Restaurants', 'Fitness Club'],
    pricePerNightInr: 21500,
    taxesAndFeesInr: 2400,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'h-mow-3',
    name: 'Mercure Moscow Paveletskaya',
    city: 'Moscow',
    cityId: 'moscow',
    category: '4-Star',
    starRating: 4,
    guestRating: 8.9,
    reviewCount: 940,
    location: 'Bakhrushina Street 11',
    distanceToCenter: '1.8 km from Red Square',
    roomType: 'Standard Queen Room',
    breakfastIncluded: true,
    facilities: ['Wellness Center & Sauna', 'Town House Bar', 'Aeroexpress Train Direct to DME Airport', 'Tea/Coffee Maker', 'Soundproof Rooms'],
    pricePerNightInr: 10500,
    taxesAndFeesInr: 1200,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'h-mow-4',
    name: 'Ibis Moscow Centre Bakhrushina',
    city: 'Moscow',
    cityId: 'moscow',
    category: '3-Star',
    starRating: 3,
    guestRating: 8.6,
    reviewCount: 1650,
    location: 'Bakhrushina St 11, Zamoskvorechye',
    distanceToCenter: '2.0 km from Red Square',
    roomType: 'Cosy Double Room',
    breakfastIncluded: true,
    facilities: ['Ibis Sweet Bed', '24-hour Snack Bar', 'Free High-speed Wi-Fi', 'Pet Friendly', 'Air Conditioning'],
    pricePerNightInr: 6200,
    taxesAndFeesInr: 750,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'h-mow-5',
    name: 'Netizen Moscow Rimskaya (Boutique Pod & Hotel)',
    city: 'Moscow',
    cityId: 'moscow',
    category: 'Budget',
    starRating: 3,
    guestRating: 8.5,
    reviewCount: 1120,
    location: 'Entuziastov Blvd 2',
    distanceToCenter: '3.5 km from City Center (Direct Metro)',
    roomType: 'Private Ensuite Double Room',
    breakfastIncluded: false,
    facilities: ['Modern Co-working Lounge', 'Shared Kitchen', 'Laundromat', 'High-Speed Fiber Wi-Fi', '24/7 Security'],
    pricePerNightInr: 3400,
    taxesAndFeesInr: 400,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'h-led-1',
    name: 'Grand Hotel Europe, St. Petersburg',
    city: 'Saint Petersburg',
    cityId: 'saint-petersburg',
    category: '5-Star',
    starRating: 5,
    guestRating: 9.7,
    reviewCount: 1890,
    location: 'Mikhailovskaya Ulitsa 1/7',
    distanceToCenter: 'Next to Nevsky Prospect & Philharmonia',
    roomType: 'Historic Deluxe Room',
    breakfastIncluded: true,
    facilities: ['Caviar & Vodka Bar', 'L’Europe Stained-Glass Restaurant', 'Luxury Spa', 'Concierge Keys', 'Historic 1875 Heritage'],
    pricePerNightInr: 26000,
    taxesAndFeesInr: 2900,
    image: PETERSBURG_IMAGE
  },
  {
    id: 'h-led-2',
    name: 'Sokos Hotel Bridge St. Petersburg',
    city: 'Saint Petersburg',
    cityId: 'saint-petersburg',
    category: '4-Star',
    starRating: 4,
    guestRating: 9.1,
    reviewCount: 1350,
    location: 'Birzhevoi Pereulok 2-4, Vasilievsky Island',
    distanceToCenter: '0.8 km from Hermitage Museum',
    roomType: 'Superior King Room',
    breakfastIncluded: true,
    facilities: ['Thermal Spa World', 'Indoor Hydro Pool', 'Spanish Sevilla Restaurant', 'Fitness Gym', 'Spacious Rooms'],
    pricePerNightInr: 11200,
    taxesAndFeesInr: 1300,
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'h-aer-1',
    name: 'Swissôtel Resort Sochi Kamelia',
    city: 'Sochi',
    cityId: 'sochi',
    category: '5-Star',
    starRating: 5,
    guestRating: 9.5,
    reviewCount: 1210,
    location: 'Kurortny Avenue 89, Sochi',
    distanceToCenter: 'Private Beach Frontage, Natural Park',
    roomType: 'Grand Sea View Balcony Room',
    breakfastIncluded: true,
    facilities: ['Heated Outdoor Flower-Shaped Pool', 'Private Sandy Beach', 'Pürovel Spa', 'Tennis Courts', 'Kids Club'],
    pricePerNightInr: 22000,
    taxesAndFeesInr: 2600,
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80'
  }
];

export const FLIGHTS_DATA: FlightOption[] = [
  {
    id: 'fl-1',
    airline: 'Aeroflot Russian Airlines',
    airlineCode: 'SU',
    flightNumber: 'SU 233 / SU 232',
    fromCity: 'New Delhi (DEL)',
    fromAirport: 'Indira Gandhi Intl, T3',
    toCity: 'Moscow (SVO)',
    toAirport: 'Sheremetyevo Intl, Term C',
    departureTime: '05:50',
    arrivalTime: '10:20',
    duration: '6h 30m (Direct non-stop)',
    stops: 0,
    stopDetails: 'Direct Non-Stop',
    baggage: '23 kg Check-in + 10 kg Cabin',
    cabinClass: 'Economy',
    roundTripPriceInr: 58500,
    taxesInr: 6800
  },
  {
    id: 'fl-2',
    airline: 'Air Arabia',
    airlineCode: 'G9',
    flightNumber: 'G9 462 / G9 955',
    fromCity: 'Mumbai (BOM)',
    fromAirport: 'Chhatrapati Shivaji Intl, T2',
    toCity: 'Moscow (DME)',
    toAirport: 'Domodedovo Intl',
    departureTime: '04:30',
    arrivalTime: '13:50',
    duration: '11h 20m',
    stops: 1,
    stopDetails: '2h 10m stopover in Sharjah (SHJ)',
    baggage: '20 kg Check-in + 7 kg Cabin',
    cabinClass: 'Economy',
    roundTripPriceInr: 44200,
    taxesInr: 5100
  },
  {
    id: 'fl-3',
    airline: 'flydubai / Emirates',
    airlineCode: 'FZ',
    flightNumber: 'FZ 444 / FZ 967',
    fromCity: 'Bengaluru (BLR)',
    fromAirport: 'Kempegowda Intl, T2',
    toCity: 'Saint Petersburg (LED)',
    toAirport: 'Pulkovo Airport',
    departureTime: '09:20',
    arrivalTime: '20:45',
    duration: '13h 25m',
    stops: 1,
    stopDetails: '2h 40m stopover in Dubai (DXB)',
    baggage: '30 kg Check-in + 7 kg Cabin',
    cabinClass: 'Economy',
    roundTripPriceInr: 62400,
    taxesInr: 7200
  },
  {
    id: 'fl-4',
    airline: 'Uzbekistan Airways',
    airlineCode: 'HY',
    flightNumber: 'HY 422 / HY 603',
    fromCity: 'New Delhi (DEL)',
    fromAirport: 'Indira Gandhi Intl, T3',
    toCity: 'Moscow (VKO)',
    toAirport: 'Vnukovo Intl',
    departureTime: '08:45',
    arrivalTime: '17:15',
    duration: '10h 30m',
    stops: 1,
    stopDetails: '1h 45m transit in Tashkent (TAS)',
    baggage: '23 kg Check-in + 8 kg Cabin',
    cabinClass: 'Economy',
    roundTripPriceInr: 39800,
    taxesInr: 4600
  },
  {
    id: 'fl-5',
    airline: 'Gulf Air',
    airlineCode: 'GF',
    flightNumber: 'GF 131 / GF 014',
    fromCity: 'Chennai (MAA)',
    fromAirport: 'Chennai International',
    toCity: 'Moscow (DME)',
    toAirport: 'Domodedovo Intl',
    departureTime: '06:10',
    arrivalTime: '18:30',
    duration: '14h 20m',
    stops: 1,
    stopDetails: '2h 20m transit in Bahrain (BAH)',
    baggage: '25 kg Check-in + 7 kg Cabin',
    cabinClass: 'Economy',
    roundTripPriceInr: 48900,
    taxesInr: 5800
  },
  {
    id: 'fl-6',
    airline: 'Aeroflot Business Suite',
    airlineCode: 'SU',
    flightNumber: 'SU 233 (Lie-flat)',
    fromCity: 'New Delhi (DEL)',
    fromAirport: 'Indira Gandhi Intl, T3',
    toCity: 'Moscow (SVO)',
    toAirport: 'Sheremetyevo Intl, Term C',
    departureTime: '05:50',
    arrivalTime: '10:20',
    duration: '6h 30m (Direct non-stop)',
    stops: 0,
    stopDetails: 'Direct Non-Stop Lie-Flat Business Bed',
    baggage: '2 x 32 kg Check-in + 15 kg Cabin',
    cabinClass: 'Business',
    roundTripPriceInr: 145000,
    taxesInr: 16500
  }
];

export const CABS_DATA: CabOption[] = [
  {
    id: 'cab-1',
    serviceType: 'Airport Pickup',
    vehicleName: 'Comfort Sedan (Toyota Camry / Skoda Octavia)',
    vehicleCategory: 'Sedan',
    capacity: 3,
    luggageCapacity: 3,
    priceInr: 3800,
    driverRating: 4.9,
    driverLanguages: ['English', 'Russian'],
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cab-2',
    serviceType: 'Airport Drop',
    vehicleName: 'Executive Business Sedan (Mercedes-Benz E-Class / BMW 5)',
    vehicleCategory: 'Business Class',
    capacity: 3,
    luggageCapacity: 3,
    priceInr: 6800,
    driverRating: 4.98,
    driverLanguages: ['Fluent English', 'Russian', 'Hindi basic assistance'],
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cab-3',
    serviceType: 'Sightseeing Vehicle',
    vehicleName: 'Full-Day Private Chauffeur Tour (8 Hours / 100 km)',
    vehicleCategory: 'Sedan',
    capacity: 4,
    luggageCapacity: 3,
    priceInr: 9500,
    perDayPrice: true,
    driverRating: 4.95,
    driverLanguages: ['English-speaking guide driver', 'Russian'],
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cab-4',
    serviceType: 'Intercity Transfer',
    vehicleName: 'Luxury Van (Mercedes-Benz Sprinter / V-Class VIP)',
    vehicleCategory: 'Minivan (Sprinter)',
    capacity: 7,
    luggageCapacity: 8,
    priceInr: 16500,
    driverRating: 4.96,
    driverLanguages: ['English', 'Russian'],
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cab-5',
    serviceType: 'Shared Cab',
    vehicleName: 'Airport Shuttle Group Transfer (Comfortable Mini-Coach)',
    vehicleCategory: 'Sedan',
    capacity: 12,
    luggageCapacity: 12,
    priceInr: 1400,
    driverRating: 4.7,
    driverLanguages: ['Basic English', 'Russian'],
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80'
  }
];

export const VISA_INFORMATION = {
  title: 'Russian Electronic Visa (e-Visa) for Indian Citizens',
  description: 'Indian passport holders are eligible for the convenient Unified Russian Electronic Visa (e-Visa), allowing entry for tourism, business, and cultural visits without visiting the embassy in person.',
  keyPoints: [
    { label: 'Validity Period', value: 'Valid for 60 days from issuance date' },
    { label: 'Permitted Stay', value: 'Up to 16 calendar days from the date of entry' },
    { label: 'Processing Time', value: 'Usually 4 calendar days on the Russian MFA portal' },
    { label: 'Consular Fee', value: 'Approx. $52 USD (~₹4,350 INR) + bank processing' },
    { label: 'Passport Requirement', value: 'Must be valid for at least 6 months with 2 blank pages' }
  ],
  requiredDocuments: [
    'Digital copy of passport bio page in high-resolution JPG',
    'Recent color digital photograph against clean white background (3.5 x 4.5 cm)',
    'Medical travel insurance policy with coverage of at least €30,000 / $35,000 valid in the Russian Federation',
    'Confirmed round-trip flight booking and hotel address details in Russia'
  ],
  currencyGuidelines: [
    'International Visa and Mastercard issued by Indian banks do not currently operate inside Russia due to international sanctions.',
    'Carry crisp, unmarked US Dollars (USD) or Euros (EUR) in cash (issued post-2013) to exchange for Russian Rubles (RUB) at bank counters across Moscow & St. Petersburg.',
    'Upon arrival, Indian travelers can easily procure a Russian Sberbank or Tinkoff "Mir" debit tourist card at airports or bank branches for contactless payments and metro taps.',
    'Estimated exchange: 1 INR ≈ 1.1 to 1.15 Russian Rubles (RUB).'
  ],
  emergencyContacts: [
    { title: 'Embassy of India in Moscow', phone: '+7 495 783 7535', address: '6-8, Vorontsovo Polye, Moscow 105064' },
    { title: 'Consulate General of India in Saint Petersburg', phone: '+7 812 640 7722', address: '35, Ryleeva Street, St. Petersburg 191123' },
    { title: 'Russian Emergency Hotline (English assistance)', phone: '112 (Police, Ambulance, Fire)' },
    { title: 'Russia Explorer 24x7 India Concierge Desk', phone: '+91 11 4988 2300 / +91 98110 54220' }
  ]
};

export const FAQS_DATA = [
  {
    q: 'Can Indian passport holders travel to Russia easily now?',
    a: 'Yes! Indian citizens can travel to Russia using the official Russian Electronic Visa (e-Visa), which is applied for online and usually approved within 4 days. It permits a stay of up to 16 days across all Russian regions including Moscow, St. Petersburg, Sochi, and Murmansk.'
  },
  {
    q: 'Are direct flights available between India and Russia?',
    a: 'Yes, Aeroflot operates direct non-stop flights connecting Indira Gandhi International Airport (DEL), New Delhi with Sheremetyevo International Airport (SVO), Moscow (flying time approx. 6.5 hours). Additionally, convenient one-stop connections operate daily via Air Arabia (Sharjah), flydubai/Emirates (Dubai), and Uzbekistan Airways (Tashkent) from Delhi, Mumbai, Bengaluru, and Chennai.'
  },
  {
    q: 'How do Indian travellers handle payments in Russia?',
    a: 'Because regular Indian credit/debit cards (Visa/Mastercard) do not work inside Russia, we advise travellers to bring clean, untorn USD or EUR cash notes to exchange for Russian Rubles at authorized bank exchange counters in cities. Alternatively, our tour managers can assist you on arrival with obtaining a pre-funded Russian Mir tourist debit card for cashless convenience.'
  },
  {
    q: 'What is the maximum budget package guarantee?',
    a: 'At Russia Explorer, our complete round-trip packages (including international flights, 4-star/5-star accommodation, transfers, Sapsan trains, and guided tours) are curated strictly under our ₹5,00,000 maximum budget threshold. We ensure absolute price transparency with no hidden mandatory resort fees.'
  },
  {
    q: 'Is Indian vegetarian or Jain food easily accessible in Russia?',
    a: 'Yes, both Moscow and Saint Petersburg boast dozens of authentic Indian restaurants (such as Dhaba, Ganga, Jai Hind, and Tandoor) offering pure vegetarian, North Indian, South Indian, and customized Jain preparations. Our guided packages include scheduled stops at these verified Indian dining partners.'
  }
];
