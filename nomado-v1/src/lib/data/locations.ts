// lib/data/locations.ts

export interface Location {
  id: string;
  name: string;
  image: string;
  price: string;
  rating: number;
  description: string;
  openingHours: string;
  features: string[];
}

export interface ComingSoonLocation {
  id: string;
  name: string;
  image: string;
  openingDate: string;
  description: string;
  concept: string;
  features: string[];
}

export interface SeasonalRoute {
  id: string;
  name: string;
  image: string;
  season: string;
  locations: string;
  description: string;
  perks: string[];
  icon: string;
}

export const activeLocations: Location[] = [
  {
    id: "bali",
    name: "Bali, Indonesia",
    image: "/images/bali-nomado.png",
    price: "$35",
    rating: 4.9,
    description:
      "Tropical paradise with world-class surf breaks and vibrant nomad community. Modern workspace with ocean views.",
    openingHours: "7:00 AM - 10:00 PM",
    features: ["Ocean View", "Surf Lessons", "Yoga Classes", "24/7 Access"],
  },
  {
    id: "tulum",
    name: "Tulum, Mexico",
    image: "/images/tulum-nomado.png",
    price: "$30",
    rating: 4.9,
    description:
      "Ancient Mayan ruins meet pristine Caribbean beaches. Eco-friendly workspace surrounded by jungle.",
    openingHours: "6:00 AM - 11:00 PM",
    features: ["Cenote Access", "Mayan Tours", "Beach Club", "Wellness Center"],
  },
  {
    id: "costa-rica",
    name: "Costa Rica, Tamarindo",
    image: "/images/costa-rica-nomado.png",
    price: "$28",
    rating: 4.8,
    description:
      "Pura Vida lifestyle with incredible biodiversity. Sustainable workspace with adventure sports access.",
    openingHours: "6:30 AM - 9:00 PM",
    features: ["Zip Lining", "Wildlife Tours", "Surfing", "Volcano Hikes"],
  },
  {
    id: "lisbon",
    name: "Lisbon, Portugal",
    image: "/images/lisbon-nomado.png",
    price: "$40",
    rating: 4.7,
    description:
      "Historic charm meets modern tech scene. Elegant workspace in the heart of Europe's startup capital.",
    openingHours: "8:00 AM - 10:00 PM",
    features: [
      "Tech Meetups",
      "Historic Tours",
      "Wine Tastings",
      "Coworking Events",
    ],
  },
  {
    id: "thailand",
    name: "Koh Samui, Thailand",
    image: "/images/thailand-nomado.png",
    price: "$25",
    rating: 4.8,
    description:
      "Island paradise with pristine beaches and Buddhist temples. Peaceful workspace with tropical vibes.",
    openingHours: "7:00 AM - 9:00 PM",
    features: [
      "Beach Access",
      "Temple Visits",
      "Thai Cooking",
      "Massage Therapy",
    ],
  },
  {
    id: "greece",
    name: "Santorini, Greece",
    image: "/images/location-greece-sunset.png",
    price: "$45",
    rating: 4.9,
    description:
      "Iconic white buildings and stunning sunsets. Premium workspace overlooking the Aegean Sea.",
    openingHours: "8:00 AM - 11:00 PM",
    features: ["Sunset Views", "Wine Tours", "Sailing Trips", "Cultural Sites"],
  },
];

export const comingSoonLocations: ComingSoonLocation[] = [
  {
    id: "maldives",
    name: "Maldives",
    image: "/images/location-maldives.jpg",
    openingDate: "March 2025",
    description:
      "Overwater bungalow workspace with crystal-clear lagoons and world-class diving.",
    concept: "Floating coworking pods with underwater meeting rooms",
    features: [
      "Overwater Offices",
      "Diving Center",
      "Spa Services",
      "Private Beach",
    ],
  },
  {
    id: "iceland",
    name: "Reykjavik, Iceland",
    image: "/images/location-iceland.jpg",
    openingDate: "May 2025",
    description:
      "Northern lights and geothermal energy. Sustainable workspace powered by renewable energy.",
    concept: "Glass dome workspace for aurora viewing while working",
    features: [
      "Northern Lights",
      "Geothermal Spa",
      "Glacier Tours",
      "Renewable Energy",
    ],
  },
  {
    id: "dubai",
    name: "Dubai, UAE",
    image: "/images/location-dubai.jpg",
    openingDate: "September 2025",
    description:
      "Futuristic city meets traditional culture. High-tech workspace in the world's most innovative city.",
    concept:
      "Sky-high workspace with panoramic city views and AI-powered amenities",
    features: [
      "City Skyline",
      "Desert Safari",
      "Luxury Shopping",
      "Tech Innovation",
    ],
  },
  {
    id: "patagonia",
    name: "Patagonia, Chile",
    image: "/images/location-patagonia.jpg",
    openingDate: "November 2025",
    description:
      "Dramatic landscapes and pristine wilderness. Remote workspace for digital detox and adventure.",
    concept: "Eco-lodge workspace with glacier views and wildlife encounters",
    features: [
      "Glacier Views",
      "Hiking Trails",
      "Wildlife Watching",
      "Stargazing",
    ],
  },
];

export const seasonalRoutes: SeasonalRoute[] = [
  {
    id: "summer-scandinavia",
    name: "Scandinavian Summer Circuit",
    image: "/images/location-scandinavia.jpg",
    season: "June - August",
    locations: "Stockholm → Copenhagen → Oslo",
    description:
      "Midnight sun and Nordic design. Experience the best of Scandinavian work-life balance.",
    perks: [
      "Midnight Sun Sessions",
      "Design Workshops",
      "Fjord Cruises",
      "Sauna Meetings",
    ],
    icon: "Sun",
  },
  {
    id: "winter-alps",
    name: "Alpine Winter Retreat",
    image: "/images/location-alps.jpg",
    season: "December - March",
    locations: "Chamonix → St. Moritz → Innsbruck",
    description:
      "Ski-in coworking with mountain views. Perfect blend of productivity and powder days.",
    perks: [
      "Ski-in Access",
      "Mountain Views",
      "Après-Ski Networking",
      "Wellness Spas",
    ],
    icon: "Snowflake",
  },
  {
    id: "monsoon-asia",
    name: "Asian Monsoon Route",
    image: "/images/location-asia-monsoon.jpg",
    season: "September - November",
    locations: "Ubud → Chiang Mai → Hoi An",
    description:
      "Post-monsoon serenity across Southeast Asia. Cultural immersion with modern amenities.",
    perks: [
      "Cultural Workshops",
      "Temple Meditation",
      "Local Cuisine",
      "Artisan Markets",
    ],
    icon: "Waves",
  },
  {
    id: "spring-mediterranean",
    name: "Mediterranean Spring",
    image: "/images/location-mediterranean.jpg",
    season: "March - May",
    locations: "Barcelona → Nice → Amalfi Coast",
    description:
      "Perfect weather and blooming landscapes. Coastal workspace with European charm.",
    perks: [
      "Coastal Walks",
      "Wine Tastings",
      "Art Galleries",
      "Outdoor Meetings",
    ],
    icon: "Mountain",
  },
];
