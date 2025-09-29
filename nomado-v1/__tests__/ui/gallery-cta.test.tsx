// __tests__/ui/gallery-cta.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { GalleryCTA } from "@/components/ui/gallery-cta";

describe("GalleryCTA", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it("renders default text", () => {
    render(<GalleryCTA />);

    expect(screen.getByText('Take Virtual Tour')).toBeInTheDocument();
  });

  it("renders custom text", () => {
    render(<GalleryCTA text="Custom CTA Text" />);

    expect(screen.getByText('Custom CTA Text')).toBeInTheDocument();
  });

  it("calls onClick when button is clicked", () => {
    render(<GalleryCTA onClick={mockOnClick} />);

    fireEvent.click(screen.getByText('Take Virtual Tour'));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("renders icon", () => {
    render(<GalleryCTA />);

    const button = screen.getByRole('button');
    const svg = button.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it("has correct button styles", () => {
    render(<GalleryCTA />);

    const button = screen.getByRole('button');
    expect(button).toHaveStyle({
      backgroundColor: 'rgb(45, 156, 120)',
      color: 'rgb(255, 255, 255)',
      fontWeight: 'bold',
    });
  });
});
