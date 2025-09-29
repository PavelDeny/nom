import React from "react";
import { Button, ButtonProps } from "@mui/material";

export default function PrimaryButton(props: ButtonProps) {
  return (
    <Button
      variant="contained"
      {...props}
      sx={(theme) => ({
        borderRadius: 2,
        fontWeight: 700,
        textTransform: "none",
        backgroundColor: theme.palette.brand?.orange ?? theme.palette.primary.main,
        color: theme.palette.brand?.textOnBrand ?? theme.palette.primary.contrastText,
        px: { xs: 4, md: 6 },
        py: { xs: 1.4, md: 2 },
        transition: "all .22s ease",
        '&:hover': {
          backgroundColor: theme.palette.brand?.orangeDark ?? theme.palette.primary.dark,
          transform: 'translateY(-2px)'
        },
        ...(props.sx as object),
      })}
    />
  );
}

