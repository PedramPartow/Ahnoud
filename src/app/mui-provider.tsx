'use client';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import EmotionCacheProvider from '../themes/EmotionCacheProvider';
import { getTheme } from '../themes/theme';

export default function MuiProvider({
  children,
  direction = 'ltr',
}: {
  children: React.ReactNode;
  direction?: 'ltr' | 'rtl';
}) {
  const theme = getTheme(direction);

  return (
    <EmotionCacheProvider direction={direction}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </EmotionCacheProvider>
  );
}
