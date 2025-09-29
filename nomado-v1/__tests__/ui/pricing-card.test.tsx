// __tests__/ui/pricing-card.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { PricingCard } from '@/components/ui/pricing-card';

const mockPlan = {
  title: 'Test Plan',
  subtitle: 'Test subtitle',
  price: 99,
  billingCycle: 'month' as const,
  features: ['Feature 1', 'Feature 2'],
  buttonLabel: 'Test Button',
  buttonVariant: 'explorer' as const,
  icon: 'briefcase' as const,
};

describe('PricingCard', () => {
  it('renders plan information correctly', () => {
    render(<PricingCard plan={mockPlan} />);
    
    expect(screen.getByText('Test Plan')).toBeInTheDocument();
    expect(screen.getByText('Test subtitle')).toBeInTheDocument();
    expect(screen.getByText('$99')).toBeInTheDocument();
    expect(screen.getByText('/ month')).toBeInTheDocument();
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
  });

  it('renders button with correct label', () => {
    render(<PricingCard plan={mockPlan} />);
    
    const button = screen.getByRole('link', { name: /test button/i });
    expect(button).toBeInTheDocument();
  });

  it('renders highlighted plan with badge', () => {
    const highlightedPlan = { ...mockPlan, highlighted: true };
    render(<PricingCard plan={highlightedPlan} />);
    
    expect(screen.getByText('Most Popular')).toBeInTheDocument();
  });

  it('does not render badge for non-highlighted plan', () => {
    render(<PricingCard plan={mockPlan} />);
    
    expect(screen.queryByText('Most Popular')).not.toBeInTheDocument();
  });

  it('has correct button href', () => {
    render(<PricingCard plan={mockPlan} />);
    
    const button = screen.getByRole('link', { name: /test button/i });
    expect(button).toHaveAttribute('href', '/booking?plan=test-plan');
  });
});
