import React from "react";
import { Button, ButtonProps } from "@mui/material";

export default function OutlineButton(props: ButtonProps) {
  return (
    <Button
      variant="outlined"
      {...props}
      sx={(theme) => ({
        borderRadius: 2,
        fontWeight: 700,
        textTransform: "none",
        borderColor: theme.palette.brand?.green ?? theme.palette.secondary.main,
        color: theme.palette.brand?.green ?? theme.palette.secondary.main,
        px: { xs: 4, md: 6 },
        py: { xs: 1.4, md: 2 },
        transition: "all .22s ease",
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
          borderColor: theme.palette.brand?.green ?? theme.palette.secondary.dark,
          transform: 'translateY(-2px)'
        },
        ...(props.sx as object),
      })}
    />
  );
}

