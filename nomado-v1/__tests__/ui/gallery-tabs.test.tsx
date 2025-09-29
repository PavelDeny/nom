// __tests__/ui/gallery-tabs.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { GalleryTabs } from "@/components/ui/gallery-tabs";

describe("GalleryTabs", () => {
  const mockOnTabChange = jest.fn();

  beforeEach(() => {
    mockOnTabChange.mockClear();
  });

  it("renders all tab buttons", () => {
    render(<GalleryTabs activeTab="workspaces" onTabChange={mockOnTabChange} />);

    expect(screen.getByText('Workspaces')).toBeInTheDocument();
    expect(screen.getByText('Locations')).toBeInTheDocument();
    expect(screen.getByText('Community')).toBeInTheDocument();
    expect(screen.getByText('Equipment')).toBeInTheDocument();
  });

  it("calls onTabChange when tab is clicked", () => {
    render(<GalleryTabs activeTab="workspaces" onTabChange={mockOnTabChange} />);

    fireEvent.click(screen.getByText('Locations'));

    expect(mockOnTabChange).toHaveBeenCalledWith('locations');
  });

});
