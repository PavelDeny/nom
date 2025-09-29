// __tests__/ui/feature-card.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { FeatureCard } from '@/components/ui/feature-card';
import { type Feature } from '@/lib/data/features';

const mockFeature: Feature = {
  id: 'test-feature',
  icon: 'Laptop',
  title: 'Test Feature',
  description: 'This is a test feature description',
  color: 'from-teal-100 to-teal-200',
  iconColor: 'text-teal-600',
};

describe('FeatureCard', () => {
  it('renders feature title and description', () => {
    render(<FeatureCard {...mockFeature} />);

    expect(screen.getByText('Test Feature')).toBeInTheDocument();
    expect(screen.getByText('This is a test feature description')).toBeInTheDocument();
  });


  it('renders icon container with gradient background', () => {
    const { container } = render(<FeatureCard {...mockFeature} />);
    const iconContainer = container.querySelector('div[style*="background"]');

    expect(iconContainer).toBeInTheDocument();
  });
});
