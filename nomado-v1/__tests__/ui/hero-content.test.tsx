// __tests__/ui/hero-content.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { HeroContent } from '@/components/ui/hero-content';

describe('HeroContent', () => {
  it('renders title', () => {
    render(<HeroContent title="Test Title" />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<HeroContent title="Test Title" subtitle="Test Subtitle" />);

    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders badge when provided', () => {
    render(<HeroContent title="Test Title" badgeText="Test Badge" />);

    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('does not render badge when not provided', () => {
    render(<HeroContent title="Test Title" />);

    expect(screen.queryByText('Test Badge')).not.toBeInTheDocument();
  });

  it('renders title with gradient styling', () => {
    const { container } = render(<HeroContent title="Test Title" />);
    const title = container.querySelector('h1');

    expect(title).toHaveStyle({
      fontSize: '3.5rem',
      fontWeight: 'bold',
    });
  });
});
