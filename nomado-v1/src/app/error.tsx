"use client";

import { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Refresh } from "@mui/icons-material";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: 4,
        textAlign: "center",
      }}
    >
      <Typography
        variant="h1"
        component="h1"
        gutterBottom
        sx={{ fontSize: "4rem", fontWeight: 700 }}
      >
        Oops!
      </Typography>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 2 }}>
        Something went wrong
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 4, maxWidth: "600px" }}
      >
        We&apos;re sorry, but something unexpected happened. Our team has been
        notified and we&apos;re working to fix it.
      </Typography>

      <Button
        variant="contained"
        size="large"
        startIcon={<Refresh />}
        onClick={reset}
        sx={{ mb: 2 }}
      >
        Try again
      </Button>

      <Typography variant="body2" color="text.secondary">
        Error ID: {error.digest || "Unknown"}
      </Typography>
    </Box>
  );
}
