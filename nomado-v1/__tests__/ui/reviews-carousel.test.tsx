// __tests__/ui/reviews-carousel.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ReviewsCarousel } from '@/components/ui/reviews-carousel';
import { type Review } from '@/components/ui/review-card';

const mockReviews: Review[] = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Engineer',
    image: '/test1.jpg',
    rating: 5,
    review: 'Great service!',
    location: 'City 1',
    verified: true,
  },
  {
    id: '2',
    name: 'Jane Smith',
    role: 'Designer',
    image: '/test2.jpg',
    rating: 4,
    review: 'Amazing experience!',
    location: 'City 2',
    verified: true,
  },
  {
    id: '3',
    name: 'Bob Johnson',
    role: 'Manager',
    image: '/test3.jpg',
    rating: 5,
    review: 'Excellent work!',
    location: 'City 3',
    verified: false,
  },
  {
    id: '4',
    name: 'Alice Brown',
    role: 'Developer',
    image: '/test4.jpg',
    rating: 4.5,
    review: 'Very satisfied!',
    location: 'City 4',
    verified: true,
  },
];

describe('ReviewsCarousel', () => {
  it('renders first 3 reviews on initial load', () => {
    render(<ReviewsCarousel reviews={mockReviews} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    expect(screen.queryByText('Alice Brown')).not.toBeInTheDocument();
  });

  it('renders correct number of slide indicators', () => {
    render(<ReviewsCarousel reviews={mockReviews} />);

    // With 4 reviews, should have 2 slides (3 + 1)
    const indicators = screen.getAllByRole('button');
    expect(indicators).toHaveLength(2);
  });

  it('switches to second slide when indicator is clicked', () => {
    render(<ReviewsCarousel reviews={mockReviews} />);

    const indicators = screen.getAllByRole('button');
    fireEvent.click(indicators[1]);

    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    expect(screen.queryByText('Bob Johnson')).not.toBeInTheDocument();
    expect(screen.getByText('Alice Brown')).toBeInTheDocument();
  });

  it('renders all reviews when there are 3 or fewer', () => {
    const threeReviews = mockReviews.slice(0, 3);
    render(<ReviewsCarousel reviews={threeReviews} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();

    // Should have only 1 indicator
    const indicators = screen.getAllByRole('button');
    expect(indicators).toHaveLength(1);
  });

  it('handles empty reviews array', () => {
    render(<ReviewsCarousel reviews={[]} />);

    // Should not crash and should not render any indicators
    const indicators = screen.queryAllByRole('button');
    expect(indicators).toHaveLength(0);
  });
});
