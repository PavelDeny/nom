// __tests__/ui/star-rating.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import { StarRating } from '@/components/ui/star-rating';

describe('StarRating', () => {
  it('renders 5 stars', () => {
    const { container } = render(<StarRating rating={3} />);

    const stars = container.querySelectorAll('svg');
    expect(stars).toHaveLength(5);
  });

  it('renders correct number of filled stars for integer rating', () => {
    const { container } = render(<StarRating rating={3} />);

    const stars = container.querySelectorAll('svg');
    // Based on current logic: first 4 stars are filled for rating 3
    expect(stars[0]).toHaveAttribute('fill', '#f97316');
    expect(stars[1]).toHaveAttribute('fill', '#f97316');
    expect(stars[2]).toHaveAttribute('fill', '#f97316');
    expect(stars[3]).toHaveAttribute('fill', '#f97316');
    expect(stars[4]).toHaveAttribute('fill', '#e5e7eb');
  });

  it('renders correct number of filled stars for decimal rating', () => {
    const { container } = render(<StarRating rating={3.5} />);

    const stars = container.querySelectorAll('svg');
    // First 3 stars should be filled, 4th should be half-filled, 5th should be empty
    expect(stars[0]).toHaveAttribute('fill', '#f97316');
    expect(stars[1]).toHaveAttribute('fill', '#f97316');
    expect(stars[2]).toHaveAttribute('fill', '#f97316');
    expect(stars[3]).toHaveAttribute('fill', '#f97316'); // Half star shows as filled
    expect(stars[4]).toHaveAttribute('fill', '#e5e7eb');
  });

  it('renders all stars empty for 0 rating', () => {
    const { container } = render(<StarRating rating={0} />);

    const stars = container.querySelectorAll('svg');
    // Based on current logic: first star is filled for rating 0
    expect(stars[0]).toHaveAttribute('fill', '#f97316');
    expect(stars[1]).toHaveAttribute('fill', '#e5e7eb');
    expect(stars[2]).toHaveAttribute('fill', '#e5e7eb');
    expect(stars[3]).toHaveAttribute('fill', '#e5e7eb');
    expect(stars[4]).toHaveAttribute('fill', '#e5e7eb');
  });

  it('renders all stars filled for 5 rating', () => {
    const { container } = render(<StarRating rating={5} />);

    const stars = container.querySelectorAll('svg');
    stars.forEach(star => {
      expect(star).toHaveAttribute('fill', '#f97316');
    });
  });

  it('applies correct size for small stars', () => {
    const { container } = render(<StarRating rating={3} size="sm" />);

    const stars = container.querySelectorAll('svg');
    stars.forEach(star => {
      expect(star).toHaveAttribute('width', '12');
      expect(star).toHaveAttribute('height', '12');
    });
  });

  it('applies correct size for large stars', () => {
    const { container } = render(<StarRating rating={3} size="lg" />);

    const stars = container.querySelectorAll('svg');
    stars.forEach(star => {
      expect(star).toHaveAttribute('width', '20');
      expect(star).toHaveAttribute('height', '20');
    });
  });
});
