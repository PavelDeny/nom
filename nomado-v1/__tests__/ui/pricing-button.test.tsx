// __tests__/ui/pricing-button.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { PricingButton } from '@/components/ui/pricing-button';

describe('PricingButton', () => {
  it('renders explorer button with correct styling', () => {
    render(<PricingButton label="Book Day Pass" variant="explorer" href="/booking" />);
    
    const button = screen.getByRole('link', { name: /book day pass/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '/booking');
  });

  it('renders pro button with correct styling', () => {
    render(<PricingButton label="Start Pro Membership" variant="pro" href="/booking" />);
    
    const button = screen.getByRole('link', { name: /start pro membership/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '/booking');
  });

  it('renders elite button with correct styling', () => {
    render(<PricingButton label="Apply for Elite" variant="elite" href="/booking" />);
    
    const button = screen.getByRole('link', { name: /apply for elite/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '/booking');
  });

  it('displays correct button text', () => {
    render(<PricingButton label="Test Button" variant="explorer" href="/test" />);
    
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });
});
