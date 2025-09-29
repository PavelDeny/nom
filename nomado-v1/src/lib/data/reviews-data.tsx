// lib/data/reviews-data.tsx

// === Типы ===
export interface Review {
  id: string;
  name: string;
  role: string;
  image: string;
  rating: number;
  review: string;
  location: string;
  verified: boolean;
}

// === Данные отзывов ===
export const defaultReviews: Review[] = [
  {
    id: "sofia",
    name: "Sofia Andersson",
    role: "Digital Consultant",
    image: "/images/sofia-nomad.png",
    rating: 5,
    review:
      "I've worked from 15+ coworking spaces worldwide, but nothing compares to Nomado Breeze. The attention to detail and member experience is absolutely outstanding.",
    location: "Stockholm, Sweden",
    verified: true,
  },
  {
    id: "james",
    name: "James O'Connor",
    role: "Content Strategist",
    image: "/images/james-nomad.png",
    rating: 4.5,
    review:
      "The community events and skill-sharing sessions have expanded my network tremendously. It's not just a workspace, it's a lifestyle that's transformed how I approach work and travel.",
    location: "Dublin, Ireland",
    verified: true,
  },
  {
    id: "sarah",
    name: "Sarah Chen",
    role: "Digital Marketing Manager",
    image: "/images/sarah-nomad.png",
    rating: 5,
    review:
      "Nomado Breeze changed my life! Working from their Bali unit while watching surfers was pure magic. The eco-friendly approach and reliable internet made it perfect for my remote work needs.",
    location: "Bali, Indonesia",
    verified: true,
  },
  {
    id: "marcus",
    name: "Marcus Rodriguez",
    role: "Full-Stack Developer",
    image: "/images/marcus-nomad.png",
    rating: 5,
    review:
      "As a developer, I need reliable internet and a distraction-free environment. Nomado Breeze delivers both while letting me work in paradise. The community is incredible too!",
    location: "Tulum, Mexico",
    verified: true,
  },
  {
    id: "emma",
    name: "Emma Thompson",
    role: "UX Designer & Content Creator",
    image: "/images/emma-nomad.png",
    rating: 5,
    review:
      "The perfect blend of productivity and adventure! I've never been more creative than when working from their Costa Rica location. The equipment rental saved me so much hassle.",
    location: "Costa Rica",
    verified: true,
  },
  {
    id: "alex",
    name: "Alex Kumar",
    role: "Startup Founder",
    image: "/images/alex-nomad.png",
    rating: 5,
    review:
      "Running my startup remotely seemed impossible until I found Nomado Breeze. The professional setup and networking opportunities have been game-changing for my business growth.",
    location: "Lisbon, Portugal",
    verified: true,
  },
  {
    id: "lisa",
    name: "Lisa Wang",
    role: "Freelance Designer",
    image: "/images/lisa-nomad.png",
    rating: 4,
    review:
      "Amazing workspace with stunning views! The creative energy here is infectious. I've completed some of my best projects while enjoying the ocean breeze and connecting with fellow creatives.",
    location: "Santorini, Greece",
    verified: true,
  },
  {
    id: "david",
    name: "David Miller",
    role: "Remote Sales Manager",
    image: "/images/david-nomad.png",
    rating: 5,
    review:
      "The video call quality is crystal clear, which is crucial for my client meetings. Plus, having such an inspiring backdrop during calls has actually helped close more deals!",
    location: "Koh Samui, Thailand",
    verified: true,
  },
  {
    id: "maria",
    name: "Maria Santos",
    role: "Digital Nomad Coach",
    image: "/images/maria-nomad.png",
    rating: 5,
    review:
      "As a coach helping others transition to remote work, I recommend Nomado Breeze to all my clients. The community support and professional environment make it perfect for productivity.",
    location: "Medellín, Colombia",
    verified: true,
  },
];

// === Статистика по умолчанию ===
export const defaultStats = {
  averageRating: 4.9,
  totalReviews: "10,000+",
  locationsVisited: "50+",
};
