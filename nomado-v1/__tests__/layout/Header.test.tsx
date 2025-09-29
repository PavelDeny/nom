import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from '@/components/layout/Header';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('Header', () => {
  it('renders without crashing', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('displays the logo and brand name', () => {
    render(<Header />);
    expect(screen.getByAltText('Nomado Breeze Logo')).toBeInTheDocument();
    expect(screen.getByText('Nomado Breeze')).toBeInTheDocument();
    expect(screen.getByText('Follow the Nomad Breeze Plan')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Header />);
    
    const links = [
      'Locations',
      'Features',
      'Gallery',
      'Reviews',
      'Pricing',
      'Contact'
    ];

    links.forEach(link => {
      expect(screen.getByRole('link', { name: link })).toBeInTheDocument();
    });
  });

  it('renders admin and book now buttons', () => {
    render(<Header />);
    
    expect(screen.getByRole('link', { name: /admin/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /book now/i })).toBeInTheDocument();
  });

  it('hides navigation when showNavigation=false', () => {
    render(<Header showNavigation={false} />);
    
    const navLinks = screen.queryAllByRole('link', { name: /(locations|features|gallery|reviews|pricing|contact)/i });
    expect(navLinks).toHaveLength(0);
  });

  it('hides admin link when showAdminLink=false', () => {
    render(<Header showAdminLink={false} />);
    
    const adminLink = screen.queryByRole('link', { name: /admin/i });
    expect(adminLink).not.toBeInTheDocument();
  });

  it('uses correct hrefs for navigation links', () => {
    render(<Header />);
    
    expect(screen.getByRole('link', { name: 'Locations' })).toHaveAttribute('href', '#locations');
    expect(screen.getByRole('link', { name: 'Features' })).toHaveAttribute('href', '#features');
    expect(screen.getByRole('link', { name: 'Gallery' })).toHaveAttribute('href', '#gallery');
    expect(screen.getByRole('link', { name: 'Reviews' })).toHaveAttribute('href', '#reviews');
    expect(screen.getByRole('link', { name: 'Pricing' })).toHaveAttribute('href', '#pricing');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact');
  });

  it('uses correct hrefs for action buttons', () => {
    render(<Header />);
    
    expect(screen.getByRole('link', { name: /admin/i })).toHaveAttribute('href', '/admin');
    expect(screen.getByRole('link', { name: /book now/i })).toHaveAttribute('href', '/booking');
  });

  it('renders with custom props', () => {
    const customProps = {
      logoSrc: '/custom-logo.png',
      logoAlt: 'Custom Logo',
      brandName: 'Custom Brand',
      tagline: 'Custom Tagline'
    };

    render(<Header {...customProps} />);
    
    expect(screen.getByAltText('Custom Logo')).toBeInTheDocument();
    expect(screen.getByText('Custom Brand')).toBeInTheDocument();
    expect(screen.getByText('Custom Tagline')).toBeInTheDocument();
  });

});