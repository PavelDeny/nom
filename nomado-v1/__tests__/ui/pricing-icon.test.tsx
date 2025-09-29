// __tests__/ui/pricing-icon.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import { PricingIcon } from '@/components/ui/pricing-icon';

describe('PricingIcon', () => {
  it('renders briefcase icon for explorer variant', () => {
    const { container } = render(<PricingIcon icon="briefcase" variant="explorer" />);
    
    const iconContainer = container.querySelector('div[style*="width: 64px"]');
    expect(iconContainer).toBeInTheDocument();
    expect(iconContainer).toHaveStyle({
      backgroundColor: '#E0F7F3',
      color: '#2D5B4C',
    });
  });

  it('renders crown icon for pro variant', () => {
    const { container } = render(<PricingIcon icon="crown" variant="pro" />);
    
    const iconContainer = container.querySelector('div[style*="width: 64px"]');
    expect(iconContainer).toBeInTheDocument();
    expect(iconContainer).toHaveStyle({
      backgroundColor: '#FEF3C7',
      color: '#f97316',
    });
  });

  it('renders award icon for elite variant', () => {
    const { container } = render(<PricingIcon icon="award" variant="elite" />);
    
    const iconContainer = container.querySelector('div[style*="width: 64px"]');
    expect(iconContainer).toBeInTheDocument();
    expect(iconContainer).toHaveStyle({
      backgroundColor: '#E0F7F3',
      color: '#2D5B4C',
    });
  });

  it('has correct dimensions and styling', () => {
    const { container } = render(<PricingIcon icon="briefcase" variant="explorer" />);
    
    const iconContainer = container.querySelector('div[style*="width: 64px"]');
    expect(iconContainer).toHaveStyle({
      width: '64px',
      height: '64px',
      borderRadius: '50%',
    });
  });
});
