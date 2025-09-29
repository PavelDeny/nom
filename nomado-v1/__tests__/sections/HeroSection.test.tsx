// __tests__/sections/HeroSection.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import HeroSection from "@/components/sections/HeroSection";

describe("HeroSection", () => {
  it("renders hardcoded title in h1", () => {
    render(<HeroSection title="" />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Work Where the Breeze.*Takes You/i);
  });

  it("renders default subtitle content", () => {
    render(<HeroSection title="" />);

    expect(screen.getByText(/Join thousands of digital nomads following the Nomado Breeze Plan/i)).toBeInTheDocument();
  });

  it("renders primary button with correct href", () => {
    render(<HeroSection title="" />);

    const button = screen.getByRole("link", { name: /start your workation/i });
    expect(button).toHaveAttribute("href", "/booking");
  });

  it("renders hero image with overlay text", () => {
    render(<HeroSection title="" />);

    expect(screen.getByText(/Freedom to Roam, Space to Focus/i)).toBeInTheDocument();
    expect(screen.getByText(/Premium mobile coworking units in paradise locations/i)).toBeInTheDocument();
  });
});