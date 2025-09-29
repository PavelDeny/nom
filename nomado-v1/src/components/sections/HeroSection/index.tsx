'use client';

import React from 'react';
import Image from 'next/image';
import { Box, Container, Typography, Button } from '@mui/material';
import { ArrowForward, PlayArrow, Language } from '@mui/icons-material';
import { alpha } from '@mui/material';
import styles from './HeroSection.module.css'; // CSS Module для object-fit и height fallback

export interface HeroProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  heroImage?: string;
  heroImageAlt?: string;
  badgeText?: string;
}

export default function HeroSection({
  title = "Work Where the Breeze Takes You",
  subtitle = "Join thousands of digital nomads following the Nomado Breeze Plan. Book premium coworking spaces, rent professional equipment, and unlock exclusive workation experiences worldwide.",
  primaryButtonText = "Start Your Workation",
  primaryButtonHref = "/booking",
  secondaryButtonText = "Watch Our Story",
  heroImage = "/images/nomado-breeze-hero.png",
  heroImageAlt = "Nomado Breeze mobile beachside coworking space",
  badgeText = "Follow the Nomad Breeze Plan - Your Workation Booking Coworking Around the World",
}: HeroProps) {
  return (
    <Box
      component="section"
      sx={{
        // общие отступы: вертикальный padding (responsive)
        py: { xs: 6, md: 10 }, // xs: 48px, md: 80px (MUI spacing * value when used in spacing shorthand)
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        {/* Вложенный контейнер с responsive horizontal padding */}
        <Box sx={{ px: { xs: 2, sm: 3, md: 0 }, mx: 'auto', maxWidth: 1200 }}>
          {/* Badge */}
          {badgeText && (
            <Box
              sx={(theme) => ({
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.5,
                background: `linear-gradient(90deg,#7DD3FC 0%, #FED7AA 100%)`,
                color: theme.palette.text.primary,
                px: { xs: 2.5, md: 4 },
                py: 1,
                borderRadius: '999px',
                fontSize: { xs: '0.9rem', md: '1rem' },
                fontWeight: 600,
                mb: { xs: 4, md: 6 },
                boxShadow: `0 4px 12px ${alpha(theme.palette.text.primary, 0.08)}`,
                border: `1px solid ${alpha(theme.palette.common.white, 0.06)}`,
              })}
            >
              <Language sx={{ width: 18, height: 18, color: 'inherit' }} />
              {badgeText}
            </Box>
          )}

          {/* Заголовок */}
          <Typography
            component="h1"
            variant="h1"
            sx={{
              fontWeight: 800,
              lineHeight: 1.05,
              color: 'text.primary',
              // Responsive font sizes: compact object notation
              fontSize: { xs: '2.4rem', sm: '3.2rem', md: '4.4rem', lg: '5.2rem' },
              mb: { xs: 2.5, md: 4 },
            }}
          >
            {/* пример переносов — можно вставлять <br/> для контроля */}
            {title}
          </Typography>

          {/* Подзаголовок */}
          <Typography
            variant="subtitle1"
            sx={{
              maxWidth: { xs: '100%', md: 800 },
              color: 'text.secondary',
              fontSize: { xs: '1rem', md: '1.25rem' },
              mb: { xs: 3.5, md: 6 },
              fontWeight: 400,
              lineHeight: 1.45,
              mx: 'auto',
            }}
          >
            {subtitle}
          </Typography>

          {/* Кнопки — responsive layout: вертикально на xs, рядом на sm+ */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, sm: 3 },
              justifyContent: 'center',
              alignItems: 'center',
              mb: { xs: 4, md: 6 },
            }}
          >
            <Button
              href={primaryButtonHref}
              variant="contained"
              size="large"
              startIcon={<ArrowForward />}
              sx={(theme) => ({
                px: { xs: 4, md: 6 },
                py: { xs: 1.4, md: 2 },
                borderRadius: 2,
                fontWeight: 700,
                textTransform: 'none',
                backgroundColor: theme.palette.brand?.orange ?? theme.palette.primary.main,
                color: theme.palette.brand?.textOnBrand ?? theme.palette.primary.contrastText,
                '&:hover': {
                  backgroundColor: theme.palette.brand?.orangeDark ?? theme.palette.primary.dark,
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                },
                transition: 'all .22s ease',
              })}
            >
              {primaryButtonText}
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<PlayArrow />}
              sx={(theme) => ({
                px: { xs: 4, md: 6 },
                py: { xs: 1.4, md: 2 },
                borderRadius: 2,
                fontWeight: 700,
                textTransform: 'none',
                borderColor: theme.palette.brand?.green ?? theme.palette.secondary.main,
                color: theme.palette.brand?.green ?? theme.palette.secondary.main,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                  borderColor: theme.palette.brand?.green ?? theme.palette.secondary.dark,
                  transform: 'translateY(-2px)',
                },
                transition: 'all .22s ease',
              })}
            >
              {secondaryButtonText}
            </Button>
          </Box>
        </Box>

        {/* Hero image block: wrapper height responsive via sx */}
        <Box
          sx={{
            mt: { xs: 4, md: 8 },
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
            position: 'relative',
            maxWidth: 1200,
            mx: 'auto',
          }}
        >
          {/* imageWrapper: задаём responsive height через sx — это удобно и server-friendly */}
          <Box
            className={styles.imageWrapper} /* CSS module keeps object-fit on img */
            sx={{
              position: 'relative',
              height: { xs: 360, sm: 420, md: 600 }, // число = px
            }}
          >
            <Image src={heroImage} alt={heroImageAlt} fill className={styles.objectCover} priority />
            {/* gradient overlay — можно сделать через sx */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: (theme) => `linear-gradient(to top, ${alpha(theme.palette.common.black, 0.45)}, transparent 30%)`,
                pointerEvents: 'none',
              }}
            />
            {/* caption on image (absolute, responsive positioning) */}
            <Box
              sx={{
                position: 'absolute',
                bottom: { xs: 20, md: 40 },
                left: { xs: 16, md: 40 },
                color: '#fff',
                textShadow: '0 2px 8px rgba(0,0,0,0.65)',
                maxWidth: { xs: '80%', md: 560 },
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 800, fontSize: { xs: '1.1rem', md: '1.6rem' }, mb: 1 }}>
                Freedom to Roam, Space to Focus
              </Typography>
              <Typography sx={{ fontSize: { xs: '0.95rem', md: '1.15rem' }, opacity: 0.95 }}>
                Premium mobile coworking units in paradise locations
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
