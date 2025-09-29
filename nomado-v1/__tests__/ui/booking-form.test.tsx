// __tests__/ui/booking-form.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BookingForm } from '@/components/ui/booking-form';

describe('BookingForm', () => {
  it('renders form fields correctly', () => {
    render(<BookingForm />);

    expect(screen.getByPlaceholderText('First name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Preferred location')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Duration (weeks)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start my nomad journey/i })).toBeInTheDocument();
  });

  it('renders default title and subtitle', () => {
    render(<BookingForm />);

    expect(screen.getByText('Book Your Workation')).toBeInTheDocument();
    expect(screen.getByText(/tell us about your ideal nomad experience/i)).toBeInTheDocument();
  });

  it('renders custom title and subtitle', () => {
    const customTitle = 'Custom Title';
    const customSubtitle = 'Custom subtitle text';

    render(<BookingForm title={customTitle} subtitle={customSubtitle} />);

    expect(screen.getByText(customTitle)).toBeInTheDocument();
    expect(screen.getByText(customSubtitle)).toBeInTheDocument();
  });

  it('handles form input changes', () => {
    render(<BookingForm />);

    const firstNameInput = screen.getByPlaceholderText('First name');
    const emailInput = screen.getByPlaceholderText('Email address');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    expect(firstNameInput).toHaveValue('John');
    expect(emailInput).toHaveValue('john@example.com');
  });

  it('calls onSubmit when form is submitted', () => {
    const mockOnSubmit = jest.fn();
    render(<BookingForm onSubmit={mockOnSubmit} />);

    const form = screen.getByRole('button', { name: /start my nomad journey/i }).closest('form');
    fireEvent.submit(form!);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      duration: '',
      message: '',
    });
  });

  it('renders as a div element', () => {
    const { container } = render(<BookingForm />);

    const formContainer = container.firstChild as HTMLElement;
    expect(formContainer.tagName).toBe('DIV');
  });
});
