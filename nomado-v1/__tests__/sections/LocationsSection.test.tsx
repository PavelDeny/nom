// __tests__/sections/LocationsSection.test.tsx
import { render, screen } from "@testing-library/react"
import { LocationsSection } from "@/components/sections/LocationsSection"

describe("LocationsSection", () => {
  it("renders with default title", () => {
    render(<LocationsSection />)

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Discover Our Global Network")
  })

  it("renders custom title when provided", () => {
    render(<LocationsSection title="Custom Title" />)

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Custom Title")
  })

  it("renders location tabs", () => {
    render(<LocationsSection />)

    expect(screen.getByRole("button", { name: "Active Locations" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Coming Soon" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Seasonal Routes" })).toBeInTheDocument()
  })

  it("renders subtitle when provided", () => {
    render(<LocationsSection subtitle="Test subtitle" />)

    expect(screen.getByText("Test subtitle")).toBeInTheDocument()
  })

  it("renders location cards", () => {
    render(<LocationsSection />)

    // Проверяем, что хотя бы одна карточка отрендерилась (по заголовку локации)
    expect(screen.getByText("Bali, Indonesia")).toBeInTheDocument()
  })
})