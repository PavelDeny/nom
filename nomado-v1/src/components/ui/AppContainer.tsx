import React from "react";
import { Container } from "@mui/material";

export interface AppContainerProps {
  children: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  disableGutters?: boolean;
}

export default function AppContainer({
  children,
  maxWidth = "lg",
  disableGutters,
}: AppContainerProps) {
  return (
    <Container
      maxWidth={maxWidth}
      disableGutters={disableGutters}
      sx={{
        px: { xs: 2, sm: 3, md: 0 },
        mx: "auto",
        width: "100%",
      }}
    >
      {children}
    </Container>
  );
}

