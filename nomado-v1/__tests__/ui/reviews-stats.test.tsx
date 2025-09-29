// __tests__/ui/reviews-stats.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ReviewsStats } from '@/components/ui/reviews-stats';

const mockStats = {
  averageRating: 4.8,
  totalReviews: '5,000+',
  locationsVisited: '25+',
};

describe('ReviewsStats', () => {
  it('renders all statistics correctly', () => {
    render(<ReviewsStats {...mockStats} />);

    expect(screen.getByText('4.8')).toBeInTheDocument();
    expect(screen.getByText('5,000+')).toBeInTheDocument();
    expect(screen.getByText('25+')).toBeInTheDocument();
  });

  it('renders correct labels', () => {
    render(<ReviewsStats {...mockStats} />);

    expect(screen.getByText('Average Rating')).toBeInTheDocument();
    expect(screen.getByText('Happy Nomads')).toBeInTheDocument();
    expect(screen.getByText('Locations Visited')).toBeInTheDocument();
  });

  it('renders star rating component', () => {
    const { container } = render(<ReviewsStats {...mockStats} />);

    // Check that star rating component is rendered (5 stars)
    const stars = container.querySelectorAll('svg');
    expect(stars).toHaveLength(5);
  });

  it('handles different stat values', () => {
    const differentStats = {
      averageRating: 3.2,
      totalReviews: '100',
      locationsVisited: '5',
    };

    render(<ReviewsStats {...differentStats} />);

    expect(screen.getByText('3.2')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
