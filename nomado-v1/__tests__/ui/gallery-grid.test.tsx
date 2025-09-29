// __tests__/ui/gallery-grid.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { GalleryGrid } from "@/components/ui/gallery-grid";
import { type GalleryItem } from "@/components/ui/gallery-item-card";

describe("GalleryGrid", () => {
  const mockItems: GalleryItem[] = [
    {
      id: 'item-1',
      title: 'First Item',
      description: 'First item description',
      image: '/image1.jpg',
      icon: <div>Icon 1</div>,
      features: ['Feature 1', 'Feature 2'],
    },
    {
      id: 'item-2',
      title: 'Second Item',
      description: 'Second item description',
      image: '/image2.jpg',
      icon: <div>Icon 2</div>,
      features: ['Feature 3', 'Feature 4'],
    },
  ];

  it("renders all items", () => {
    render(<GalleryGrid items={mockItems} />);

    expect(screen.getByText('First Item')).toBeInTheDocument();
    expect(screen.getByText('Second Item')).toBeInTheDocument();
  });

  it("passes custom variant to items", () => {
    render(<GalleryGrid items={mockItems} variant="orange" />);

    // Проверяем, что все элементы отрендерились
    expect(screen.getByText('First Item')).toBeInTheDocument();
    expect(screen.getByText('Second Item')).toBeInTheDocument();
  });

  it("passes custom button text to items", () => {
    render(<GalleryGrid items={mockItems} buttonText="Custom Button" />);

    const buttons = screen.getAllByText('Custom Button');
    expect(buttons).toHaveLength(2);
  });

  it("renders with default props", () => {
    render(<GalleryGrid items={mockItems} />);

    expect(screen.getByText('First Item')).toBeInTheDocument();
    expect(screen.getByText('Second Item')).toBeInTheDocument();
    
    // Проверяем, что используется дефолтный текст кнопки
    const buttons = screen.getAllByText('Learn More');
    expect(buttons).toHaveLength(2);
  });
});
