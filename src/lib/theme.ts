"use client";

import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "brand",
  colors: {
    brand: [
      "#e6f0fd",
      "#cce1fb",
      "#99c3f7",
      "#66a5f3",
      "#3388ef",
      "#2B7DE9",
      "#2264ba",
      "#1a4b8c",
      "#11325d",
      "#09192f",
    ],
  },
  fontFamily: "var(--font-inter), sans-serif",
  headings: {
    fontFamily: "var(--font-inter), sans-serif",
  },
});
