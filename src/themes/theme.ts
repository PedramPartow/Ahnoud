import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          /* STANDARD VARIANT */
          '& .MuiInput-root:before': {
            borderBottomColor: 'var(--color-gray-1-alpha-20)',
          },
          '& .MuiInput-root:hover:not(.Mui-disabled):before': {
            borderBottomColor: 'var(--color-gray-1-alpha-20)',
          },
          '& .MuiInput-root:after': {
            borderBottomColor: 'var(--color-gray-1-alpha-20)',
          },

          /* TEXT + LABEL */
          '& .MuiInputBase-input': {
            color: 'var(--color-gray-7)',
            fontSize: 'var(--body-03-size)',
            lineHeight: 'var(--body-03-line)',
            fontWeight: 'var(--body-03-weight)',
            padding: '0px 0 16px 0',
          },
          '& .MuiInputLabel-root': {
            color: 'var(--color-gray-7)',
            fontSize: 'var(--body-03-size)',
            lineHeight: 'var(--body-03-line)',
            fontWeight: 'var(--body-03-weight)',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'var(--color-gray-7)',
            fontSize: 'var(--caption-01-size)',
            lineHeight: 'var(--caption-01-line)',
            fontWeight: 'var(--caption-01-weight)',
          },
          /* LABEL - when shrunk (focused or has value) */
          '& .MuiInputLabel-root.MuiInputLabel-shrink': {
            color: 'var(--color-gray-7)',
            fontSize: 'var(--caption-01-size)',
            lineHeight: 'var(--caption-01-line)',
            fontWeight: 'var(--caption-01-weight)',
          },
        },
      },
    },
  },
});

export default theme;