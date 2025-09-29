// __tests__/ui/enterprise-contact.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { EnterpriseContact } from '@/components/ui/enterprise-contact';

describe('EnterpriseContact', () => {
  it('renders with default props', () => {
    render(<EnterpriseContact />);
    
    expect(screen.getByText('Need a custom plan for your team or company?')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact enterprise sales/i })).toBeInTheDocument();
  });

  it('renders with custom props', () => {
    render(
      <EnterpriseContact 
        title="Custom title" 
        buttonText="Custom button" 
        href="/custom" 
      />
    );
    
    expect(screen.getByText('Custom title')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /custom button/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /custom button/i })).toHaveAttribute('href', '/custom');
  });

  it('has correct link href', () => {
    render(<EnterpriseContact />);
    
    const link = screen.getByRole('link', { name: /contact enterprise sales/i });
    expect(link).toHaveAttribute('href', '/contact');
  });

  it('displays users icon', () => {
    render(<EnterpriseContact />);
    
    const link = screen.getByRole('link', { name: /contact enterprise sales/i });
    const icon = link.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });
});
