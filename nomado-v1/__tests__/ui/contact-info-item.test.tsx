// __tests__/ui/contact-info-item.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ContactInfoItem } from '@/components/ui/contact-info-item';

const mockContactInfo = {
  icon: 'Mail',
  title: 'Email',
  content: 'test@example.com',
  description: 'Test description',
};

describe('ContactInfoItem', () => {
  it('renders contact information correctly', () => {
    render(<ContactInfoItem {...mockContactInfo} />);

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders icon container', () => {
    const { container } = render(<ContactInfoItem {...mockContactInfo} />);

    const iconContainer = container.querySelector('div[style*="width: 48px"]');
    expect(iconContainer).toBeInTheDocument();
  });

  it('renders with different contact data', () => {
    const phoneContact = {
      icon: 'Phone',
      title: 'Phone',
      content: '+1 (555) 123-4567',
      description: 'Call us anytime',
    };

    render(<ContactInfoItem {...phoneContact} />);

    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('+1 (555) 123-4567')).toBeInTheDocument();
    expect(screen.getByText('Call us anytime')).toBeInTheDocument();
  });
});
