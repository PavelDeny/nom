// components/ui/booking-form.tsx
"use client";

import { useState } from "react";
import { ContactIcon } from "./contact-icon";

// === Типы ===
export interface BookingFormProps {
  title?: string;
  subtitle?: string;
  onSubmit?: (data: FormData) => void;
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  duration: string;
  message: string;
}

// === Компонент ===
export function BookingForm({
  title = "Book Your Workation",
  subtitle = "Tell us about your ideal nomad experience and we'll create a custom plan for you",
  onSubmit,
}: BookingFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    duration: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #fed7aa",
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "0.75rem",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ marginBottom: "1.5rem" }}>
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#2D5B4C",
            marginBottom: "0.5rem",
          }}
        >
          {title}
        </h3>
        <p style={{ color: "#2D5B4C", fontSize: "0.875rem" }}>{subtitle}</p>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
          }}
        >
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleChange}
            style={{
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              backgroundColor: "white",
            }}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
            style={{
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              backgroundColor: "white",
            }}
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          style={{
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            backgroundColor: "white",
          }}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone number"
          value={formData.phone}
          onChange={handleChange}
          style={{
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            backgroundColor: "white",
          }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
          }}
        >
          <input
            type="text"
            name="location"
            placeholder="Preferred location"
            value={formData.location}
            onChange={handleChange}
            style={{
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              backgroundColor: "white",
            }}
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration (weeks)"
            value={formData.duration}
            onChange={handleChange}
            style={{
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              backgroundColor: "white",
            }}
          />
        </div>
        <textarea
          name="message"
          placeholder="Tell us about your nomad journey, work requirements, and what you're looking for in your ideal workation experience..."
          value={formData.message}
          onChange={handleChange}
          rows={4}
          style={{
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            resize: "none",
            backgroundColor: "white",
          }}
        />
        <button
          type="submit"
          style={{
            background: "linear-gradient(to right, #f97316, #2D5B4C)",
            color: "white",
            padding: "0.875rem 1.5rem",
            borderRadius: "0.5rem",
            fontSize: "1rem",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <ContactIcon name="Lightning" size={16} color="white" />
          Start My Nomad Journey
        </button>
      </form>
    </div>
  );
}
