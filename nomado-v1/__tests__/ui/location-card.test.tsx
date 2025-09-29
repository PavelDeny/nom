// __tests__/ui/location-card.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { LocationCard } from '@/components/ui/location-card';
import { type Location } from '@/lib/data/locations';

const mockLocation: Location = {
  id: 'test-location',
  name: 'Test Location',
  image: '/test-image.jpg',
  price: '$50',
  rating: 4.8,
  description: 'This is a test location description',
  openingHours: '9:00 AM - 6:00 PM',
  features: ['Feature 1', 'Feature 2', 'Feature 3'],
};

describe('LocationCard', () => {
  it('renders location name and description', () => {
    render(<LocationCard location={mockLocation} />);

    expect(screen.getByText('Test Location')).toBeInTheDocument();
    expect(screen.getByText('This is a test location description')).toBeInTheDocument();
  });

  it('renders price and rating', () => {
    render(<LocationCard location={mockLocation} />);

    expect(screen.getByText('$50')).toBeInTheDocument();
    expect(screen.getByText('4.8')).toBeInTheDocument();
  });

  it('renders opening hours', () => {
    render(<LocationCard location={mockLocation} />);

    expect(screen.getByText('9:00 AM - 6:00 PM')).toBeInTheDocument();
  });

  it('renders features', () => {
    render(<LocationCard location={mockLocation} />);

    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
    expect(screen.getByText('Feature 3')).toBeInTheDocument();
  });

  it('renders "Active Now" badge', () => {
    render(<LocationCard location={mockLocation} />);

    expect(screen.getByText('Active Now')).toBeInTheDocument();
  });

  it('renders book button with correct href', () => {
    render(<LocationCard location={mockLocation} />);

    const bookButton = screen.getByRole('link', { name: /book day pass/i });
    expect(bookButton).toHaveAttribute('href', '/booking?location=Test%20Location');
  });
});
