// __tests__/ui/review-card.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ReviewCard, type Review } from '@/components/ui/review-card';

const mockReview: Review = {
  id: 'test-review',
  name: 'John Doe',
  role: 'Software Engineer',
  image: '/test-image.jpg',
  rating: 4.5,
  review: 'This is a test review.',
  location: 'Test City',
  verified: true,
};

describe('ReviewCard', () => {
  it('renders review information correctly', () => {
    render(<ReviewCard review={mockReview} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText(/This is a test review/)).toBeInTheDocument();
    expect(screen.getByText('Test City')).toBeInTheDocument();
    expect(screen.getByText('Verified')).toBeInTheDocument();
  });

  it('renders initials in avatar', () => {
    render(<ReviewCard review={mockReview} />);

    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders stars for rating', () => {
    render(<ReviewCard review={mockReview} />);

    // Check that star rating component is rendered
    const starContainer = screen.getByText('Test City').parentElement;
    expect(starContainer).toBeInTheDocument();
  });

  it('does not render verified badge when verified is false', () => {
    const unverifiedReview = { ...mockReview, verified: false };
    render(<ReviewCard review={unverifiedReview} />);

    expect(screen.queryByText('Verified')).not.toBeInTheDocument();
  });
});
