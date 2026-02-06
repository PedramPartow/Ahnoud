"use client";

import { ThemeProvider } from '@mui/material/styles';
import theme from '../themes/theme';

export default function MuiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};