'use client';

import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import rtlCache from '../themes/rtl-cache';
import { getTheme } from '../themes/theme';

export default function MuiProvider({
  children,
  direction = 'rtl',
}: {
  children: React.ReactNode;
  direction?: 'ltr' | 'rtl';
}) {
  const theme = getTheme(direction);

  if (direction === 'rtl') {
    return (
      <CacheProvider value={rtlCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </CacheProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}