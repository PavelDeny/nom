// __tests__/ui/pricing-features.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { PricingFeatures } from '@/components/ui/pricing-features';

describe('PricingFeatures', () => {
  const mockFeatures = [
    'Access to basic workstation',
    'High-speed internet',
    'Coffee & tea included',
  ];

  it('renders features list for explorer variant', () => {
    render(<PricingFeatures features={mockFeatures} variant="explorer" />);
    
    expect(screen.getByText('Access to basic workstation')).toBeInTheDocument();
    expect(screen.getByText('High-speed internet')).toBeInTheDocument();
    expect(screen.getByText('Coffee & tea included')).toBeInTheDocument();
  });

  it('renders features list for pro variant', () => {
    render(<PricingFeatures features={mockFeatures} variant="pro" />);
    
    expect(screen.getByText('Access to basic workstation')).toBeInTheDocument();
    expect(screen.getByText('High-speed internet')).toBeInTheDocument();
    expect(screen.getByText('Coffee & tea included')).toBeInTheDocument();
  });

  it('renders features list for elite variant', () => {
    render(<PricingFeatures features={mockFeatures} variant="elite" />);
    
    expect(screen.getByText('Access to basic workstation')).toBeInTheDocument();
    expect(screen.getByText('High-speed internet')).toBeInTheDocument();
    expect(screen.getByText('Coffee & tea included')).toBeInTheDocument();
  });

  it('renders correct number of features', () => {
    render(<PricingFeatures features={mockFeatures} variant="explorer" />);
    
    const featureElements = screen.getAllByText(/Access to basic workstation|High-speed internet|Coffee & tea included/);
    expect(featureElements).toHaveLength(3);
  });
});
