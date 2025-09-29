// __tests__/ui/hero-buttons.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { HeroButtons } from '@/components/ui/hero-buttons';

describe('HeroButtons', () => {
  it('renders primary button with default text', () => {
    render(<HeroButtons />);

    expect(screen.getByText('Start Your Workation')).toBeInTheDocument();
  });

  it('renders secondary button with default text', () => {
    render(<HeroButtons />);

    expect(screen.getByText('Watch Demo')).toBeInTheDocument();
  });

  it('renders custom button texts', () => {
    render(
      <HeroButtons
        primaryButtonText="Custom Primary"
        secondaryButtonText="Custom Secondary"
      />
    );

    expect(screen.getByText('Custom Primary')).toBeInTheDocument();
    expect(screen.getByText('Custom Secondary')).toBeInTheDocument();
  });

  it('primary button has correct href', () => {
    render(<HeroButtons primaryButtonHref="/custom-path" />);

    const primaryButton = screen.getByRole('link', { name: /start your workation/i });
    expect(primaryButton).toHaveAttribute('href', '/custom-path');
  });

  it('primary button has default href', () => {
    render(<HeroButtons />);

    const primaryButton = screen.getByRole('link', { name: /start your workation/i });
    expect(primaryButton).toHaveAttribute('href', '/test');
  });

  it('secondary button is a button element', () => {
    render(<HeroButtons />);

    const secondaryButton = screen.getByRole('button', { name: /watch demo/i });
    expect(secondaryButton.tagName).toBe('BUTTON');
  });
});
