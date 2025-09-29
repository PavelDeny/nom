// __tests__/ui/service-highlight-card.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ServiceHighlightCard } from '@/components/ui/service-highlight-card';

const mockServiceHighlight = {
  icon: 'Clock',
  title: 'Response Time',
  description: '< 2 hours during business hours',
  iconColor: '#2D5B4C',
};

describe('ServiceHighlightCard', () => {
  it('renders service highlight information correctly', () => {
    render(<ServiceHighlightCard {...mockServiceHighlight} />);

    expect(screen.getByText('Response Time')).toBeInTheDocument();
    expect(screen.getByText('< 2 hours during business hours')).toBeInTheDocument();
  });

  it('renders with custom icon color', () => {
    const customService = {
      ...mockServiceHighlight,
      iconColor: '#F9A825',
    };

    render(<ServiceHighlightCard {...customService} />);

    expect(screen.getByText('Response Time')).toBeInTheDocument();
  });

  it('renders with different service data', () => {
    const globalSupport = {
      icon: 'Globe',
      title: 'Global Support',
      description: 'Available in 15+ languages',
      iconColor: '#F9A825',
    };

    render(<ServiceHighlightCard {...globalSupport} />);

    expect(screen.getByText('Global Support')).toBeInTheDocument();
    expect(screen.getByText('Available in 15+ languages')).toBeInTheDocument();
  });

  it('renders as a div element', () => {
    const { container } = render(<ServiceHighlightCard {...mockServiceHighlight} />);

    const card = container.firstChild as HTMLElement;
    expect(card.tagName).toBe('DIV');
  });
});
