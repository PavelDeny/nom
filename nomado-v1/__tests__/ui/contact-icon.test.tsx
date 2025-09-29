// __tests__/ui/contact-icon.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import { ContactIcon } from '@/components/ui/contact-icon';

describe('ContactIcon', () => {
  it('renders Mail icon', () => {
    const { container } = render(<ContactIcon name="Mail" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders Phone icon', () => {
    const { container } = render(<ContactIcon name="Phone" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders MapPin icon', () => {
    const { container } = render(<ContactIcon name="MapPin" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders Clock icon', () => {
    const { container } = render(<ContactIcon name="Clock" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders Globe icon', () => {
    const { container } = render(<ContactIcon name="Globe" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders Lightning icon', () => {
    const { container } = render(<ContactIcon name="Lightning" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders with custom size', () => {
    const { container } = render(<ContactIcon name="Mail" size={32} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
  });

  it('renders with custom color', () => {
    const { container } = render(<ContactIcon name="Mail" color="#FF0000" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('stroke', '#FF0000');
  });

  it('returns null for unknown icon', () => {
    const { container } = render(<ContactIcon name="UnknownIcon" />);
    expect(container.firstChild).toBeNull();
  });
});
