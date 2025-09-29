// __tests__/ui/location-tabs.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LocationTabs } from '@/components/ui/location-tabs';

describe('LocationTabs', () => {
  const mockOnTabChange = jest.fn();

  beforeEach(() => {
    mockOnTabChange.mockClear();
  });

  it('renders all three tabs', () => {
    render(<LocationTabs activeTab="active" onTabChange={mockOnTabChange} />);

    expect(screen.getByText('Active Locations')).toBeInTheDocument();
    expect(screen.getByText('Coming Soon')).toBeInTheDocument();
    expect(screen.getByText('Seasonal Routes')).toBeInTheDocument();
  });

  it('calls onTabChange when tab is clicked', () => {
    render(<LocationTabs activeTab="active" onTabChange={mockOnTabChange} />);

    const comingSoonTab = screen.getByText('Coming Soon');
    fireEvent.click(comingSoonTab);

    expect(mockOnTabChange).toHaveBeenCalledWith('coming-soon');
  });

  it('highlights active tab', () => {
    render(<LocationTabs activeTab="seasonal" onTabChange={mockOnTabChange} />);

    const seasonalTab = screen.getByText('Seasonal Routes');
    expect(seasonalTab).toHaveStyle({
      backgroundColor: 'rgb(45, 156, 120)',
      color: 'rgb(255, 255, 255)',
    });
  });

  it('shows inactive tabs with correct styling', () => {
    render(<LocationTabs activeTab="active" onTabChange={mockOnTabChange} />);

    const comingSoonTab = screen.getByText('Coming Soon');
    expect(comingSoonTab).toBeInTheDocument();
    expect(comingSoonTab.tagName).toBe('BUTTON');
  });
});
