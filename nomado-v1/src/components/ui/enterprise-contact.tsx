// components/ui/enterprise-contact.tsx
"use client";

import Link from "next/link";

export interface EnterpriseContactProps {
  title?: string;
  buttonText?: string;
  href?: string;
}

export function EnterpriseContact({
  title = "Need a custom plan for your team or company?",
  buttonText = "Contact Enterprise Sales",
  href = "/contact",
}: EnterpriseContactProps) {
  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ color: "#6B7280", marginBottom: "1rem", fontSize: "1rem" }}>
        {title}
      </p>
      <Link
        href={href}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          border: "1px solid #f97316",
          color: "#f97316",
          padding: "0.75rem 1.5rem",
          borderRadius: "0.5rem",
          textDecoration: "none",
          fontSize: "0.875rem",
          fontWeight: "600",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#f97316";
          e.currentTarget.style.color = "white";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "#f97316";
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
        {buttonText}
      </Link>
    </div>
  );
}
