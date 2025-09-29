// __tests__/ui/gallery-item-card.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { GalleryItemCard, type GalleryItem } from "@/components/ui/gallery-item-card";

describe("GalleryItemCard", () => {
  const mockItem: GalleryItem = {
    id: 'test-item',
    title: 'Test Workspace',
    description: 'A beautiful workspace for testing purposes.',
    image: '/test-image.jpg',
    icon: <div data-testid="test-icon">Icon</div>,
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
  };

  it("renders item title and description", () => {
    render(<GalleryItemCard item={mockItem} />);

    expect(screen.getByText('Test Workspace')).toBeInTheDocument();
    expect(screen.getByText('A beautiful workspace for testing purposes.')).toBeInTheDocument();
  });

  it("renders only first 2 features", () => {
    render(<GalleryItemCard item={mockItem} />);

    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
    expect(screen.queryByText('Feature 3')).not.toBeInTheDocument();
    expect(screen.queryByText('Feature 4')).not.toBeInTheDocument();
  });

  it("renders custom button text when provided", () => {
    render(<GalleryItemCard item={mockItem} buttonText="Custom Button" />);

    expect(screen.getByText('Custom Button')).toBeInTheDocument();
  });

  it("renders default button text when not provided", () => {
    render(<GalleryItemCard item={mockItem} />);

    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });

  it("renders icon", () => {
    render(<GalleryItemCard item={mockItem} />);

    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it("renders image with correct alt text", () => {
    render(<GalleryItemCard item={mockItem} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'Test Workspace');
    // Next.js Image компонент изменяет src атрибут, поэтому проверяем, что изображение присутствует
    expect(image).toBeInTheDocument();
  });
});
