// components/sections/FeaturesSection.tsx
"use client";

import { Box, Container, Typography } from "@mui/material";
import { FeatureCard } from "@/components/ui/feature-card";
import { defaultFeatures, type Feature } from "@/lib/data/features";
import { AppContainer } from "@/components/ui";

export interface FeaturesSectionProps {
  title?: string;
  subtitle?: string;
  features?: Feature[];
}

// === Компонент ===
export function FeaturesSection({
  title = "Everything You Need to Work & Thrive",
  subtitle = "Premium amenities, professional equipment, and exclusive services designed for the modern digital nomad",
  features = defaultFeatures,
}: FeaturesSectionProps) {
  const titleToShow = (title ?? "").trim() || "Everything You Need to Work & Thrive";
  const subtitleToShow =
    (subtitle ?? "").trim() ||
    "Premium amenities, professional equipment, and exclusive services designed for the modern digital nomad";

  return (
    <Box
      component="section"
      id="features"
      sx={(theme) => ({
        py: { xs: 6, md: 10 },
        background: `linear-gradient(to bottom, ${theme.palette.action.hover}, ${theme.palette.background.default})`,
      })}
    >
      <AppContainer>
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
          <Typography
            component="h2"
            variant="h2"
            sx={{
              fontWeight: 800,
              color: "text.primary",
              fontSize: { xs: "2rem", md: "2.5rem" },
              mb: 2,
            }}
          >
            {titleToShow}
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              maxWidth: 700,
              mx: "auto",
              fontSize: { xs: "1rem", md: "1.125rem" },
            }}
          >
            {subtitleToShow}
          </Typography>
        </Box>

        {/* Grid 3 cols responsive */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: { xs: 2, md: 3 },
            maxWidth: 1200,
            mx: "auto",
          }}
        >
          {features.map((feature) => (
            <FeatureCard key={feature.id} {...feature} />
          ))}
        </Box>
      </AppContainer>
    </Box>
  );
}
