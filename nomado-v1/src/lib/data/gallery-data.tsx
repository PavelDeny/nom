// lib/data/gallery-data.tsx
import React from "react";

// === Типы ===
export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  features: string[];
}

// === Данные workspace types ===
export const workspaceTypes: GalleryItem[] = [
  {
    id: "private-offices",
    title: "Private Offices",
    description:
      "Quiet, focused atmosphere perfect for deep work and confidential calls. Fully equipped with ergonomic furniture and premium amenities.",
    image: "/images/workspace-private-office.jpg",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2d9c78"
        strokeWidth="2"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9,22 9,12 15,12 15,22" />
      </svg>
    ),
    features: ["Sound-proof walls", "Premium furniture"],
  },
  {
    id: "open-coworking",
    title: "Open Coworking Areas",
    description:
      "Collaborative vibe with flexible seating arrangements. Perfect for networking and spontaneous interactions with fellow nomads.",
    image: "/images/workspace-open-area.jpg",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2d9c78"
        strokeWidth="2"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    features: ["Flexible seating", "Community atmosphere"],
  },
  {
    id: "meeting-rooms",
    title: "Meeting Rooms",
    description:
      "Fully equipped conference spaces with large screens, whiteboards, and professional lighting for video calls and presentations.",
    image: "/images/workspace-meeting-room.jpg",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2d9c78"
        strokeWidth="2"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    features: ["4K displays", "Whiteboard walls"],
  },
  {
    id: "outdoor-terraces",
    title: "Outdoor Terraces",
    description:
      "Work with a view in our beautiful outdoor spaces. Weather-protected workstations with natural lighting and fresh air.",
    image: "/images/workspace-outdoor-terrace.jpg",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2d9c78"
        strokeWidth="2"
      >
        <path d="M12 2v2M12 12v2M12 22v2M2 12h2M22 12h2M2 6h2M2 18h2M12 18h2M22 6h2M22 18h2" />
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
      </svg>
    ),
    features: ["Ocean/mountain views", "Weather protection"],
  },
];

// === Данные location types ===
export const locationTypes: GalleryItem[] = [
  {
    id: "beachside",
    title: "Beachside Coworking",
    description:
      "Work with stunning ocean views and the sound of waves. Perfect for inspiration and relaxation between productive sessions.",
    image: "/images/location-beachside-workspace.jpg",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#f97316"
        strokeWidth="2"
      >
        <path d="M12 2v2M12 12v2M12 22v2M2 12h2M22 12h2M2 6h2M2 18h2M12 18h2M22 6h2M22 18h2" />
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
      </svg>
    ),
    features: [
      "Ocean views",
      "Beach access",
      "Surf breaks nearby",
      "Sunset workspaces",
    ],
  },
  {
    id: "city-center",
    title: "City Center Hubs",
    description:
      "Located in the heart of vibrant cities with easy access to transport, restaurants, cultural sites, and business districts.",
    image: "/images/location-city-center.jpg",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2d9c78"
        strokeWidth="2"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9,22 9,12 15,12 15,22" />
      </svg>
    ),
    features: [
      "Public transport",
      "Cultural attractions",
      "Business networking",
      "Urban amenities",
    ],
  },
  {
    id: "mountain-retreats",
    title: "Mountain Retreats",
    description:
      "Fresh mountain air and calm atmosphere surrounded by nature. Perfect for focused work and digital detox experiences.",
    image: "/images/location-mountain-retreat.jpg",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2d9c78"
        strokeWidth="2"
      >
        <path d="M12 2v2M12 12v2M12 22v2M2 12h2M22 12h2M2 6h2M2 18h2M12 18h2M22 6h2M22 18h2" />
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
      </svg>
    ),
    features: [
      "Fresh air",
      "Hiking trails",
      "Peaceful environment",
      "Scenic views",
    ],
  },
  {
    id: "suburban-escapes",
    title: "Suburban Escapes",
    description:
      "Green surroundings and quiet neighborhoods offering the perfect balance between urban convenience and natural tranquility.",
    image: "/images/location-suburban.jpg",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2d9c78"
        strokeWidth="2"
      >
        <path d="M12 2v2M12 12v2M12 22v2M2 12h2M22 12h2M2 6h2M2 18h2M12 18h2M22 6h2M22 18h2" />
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
      </svg>
    ),
    features: [
      "Green spaces",
      "Quiet atmosphere",
      "Local community",
      "Work-life balance",
    ],
  },
];

// === Данные community programs ===
export const communityPrograms: GalleryItem[] = [
  {
    id: "networking-events",
    title: "Networking Events & Meetups",
    description:
      "Regular social and professional gatherings to connect with like-minded nomads, entrepreneurs, and local professionals.",
    image: "/images/community-networking.jpg",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2d9c78"
        strokeWidth="2"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    features: [
      "Weekly happy hours",
      "Industry meetups",
      "Cultural exchanges",
      "Business mixers",
    ],
  },
  {
    id: "international-community",
    title: "International Community",
    description:
      "Join a diverse global network of remote workers from 50+ countries. Share experiences, collaborate, and build lasting friendships.",
    image: "/images/community-international.jpg",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2d9c78"
        strokeWidth="2"
      >
        <path d="M12 2v2M12 12v2M12 22v2M2 12h2M22 12h2M2 6h2M2 18h2M12 18h2M22 6h2M22 18h2" />
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
      </svg>
    ),
    features: [
      "Global member directory",
      "Cross-location visits",
      "Cultural celebrations",
      "Language exchanges",
    ],
  },
  {
    id: "skill-sharing",
    title: "Skill-Sharing Workshops",
    description:
      "Learn new skills and share your expertise through regular workshops, masterclasses, and peer-to-peer learning sessions.",
    image: "/images/community-workshops.jpg",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2d9c78"
        strokeWidth="2"
      >
        <path d="M12 2v2M12 12v2M12 22v2M2 12h2M22 12h2M2 6h2M2 18h2M12 18h2M22 6h2M22 18h2" />
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
      </svg>
    ),
    features: [
      "Tech workshops",
      "Creative sessions",
      "Business seminars",
      "Personal development",
    ],
  },
  {
    id: "mentorship",
    title: "Mentorship & Collaboration",
    description:
      "Connect with experienced professionals for guidance or collaborate on exciting projects with fellow community members.",
    image: "/images/community-mentorship.jpg",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2d9c78"
        strokeWidth="2"
      >
        <path d="M12 2v2M12 12v2M12 22v2M2 12h2M22 12h2M2 6h2M2 18h2M12 18h2M22 6h2M22 18h2" />
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
      </svg>
    ),
    features: [
      "1-on-1 mentoring",
      "Project partnerships",
      "Startup incubation",
      "Career guidance",
    ],
  },
];

// === Данные equipment facilities ===
export const equipmentFacilities: GalleryItem[] = [
  {
    id: "internet-connectivity",
    title: "High-Speed Internet & Backup",
    description:
      "Ultra-fast fiber internet with Starlink satellite backup ensuring 99.9% uptime for your critical work needs.",
    image: "/images/equipment-internet.jpg",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#f97316"
        strokeWidth="2"
      >
        <path d="M12 2v2M12 12v2M12 22v2M2 12h2M22 12h2M2 6h2M2 18h2M12 18h2M22 6h2M22 18h2" />
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
      </svg>
    ),
    features: [
      "1GB+ fiber connection",
      "Starlink backup",
      "Dedicated bandwidth",
      "Network monitoring",
    ],
  },
  {
    id: "ergonomic-furniture",
    title: "Ergonomic Furniture & Standing Desks",
    description:
      "Premium Herman Miller chairs, adjustable standing desks, and ergonomic accessories for optimal comfort and health.",
    image: "/images/equipment-furniture.jpg",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2d9c78"
        strokeWidth="2"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9,22 9,12 15,12 15,22" />
      </svg>
    ),
    features: [
      "Herman Miller chairs",
      "Height-adjustable desks",
      "Monitor arms",
      "Footrests & supports",
    ],
  },
  {
    id: "printing-scanning",
    title: "Printing & Scanning Stations",
    description:
      "Professional-grade printers, scanners, and document services available 24/7 for all your business needs.",
    image: "/images/equipment-printing.jpg",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#f97316"
        strokeWidth="2"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9,22 9,12 15,12 15,22" />
      </svg>
    ),
    features: [
      "Color laser printing",
      "High-speed scanning",
      "Document binding",
      "Business cards",
    ],
  },
  {
    id: "av-equipment",
    title: "Video Conference & Podcast Rooms",
    description:
      "Professional AV setups with 4K cameras, studio lighting, and acoustic treatment for content creation and meetings.",
    image: "/images/equipment-av.jpg",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2d9c78"
        strokeWidth="2"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    features: [
      "4K cameras",
      "Studio lighting",
      "Acoustic panels",
      "Professional microphones",
    ],
  },
];
