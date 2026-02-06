import { createTheme } from '@mui/material/styles';

export const getTheme = (direction: 'ltr' | 'rtl' = 'ltr') =>
  createTheme({
    direction,

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

            '& .css-elo8k2-MuiInputAdornment-root': {
              width: '24px',
              height: '24px',
          
              '& .MuiButtonBase-root': {
                width: '24px',
                height: '24px',
                marginBottom: '16px',
                padding: '0',
              },
            },

            /* INPUT TEXT */
            '& .MuiInputBase-input': {
              color: 'var(--color-gray-7)',
              fontSize: 'var(--body-03-size)',
              lineHeight: 'var(--body-03-line)',
              fontWeight: 'var(--body-03-weight)',
              padding: '0 0 16px 0',

              /* REMOVE AUTOFILL BACKGROUND */
              '&:-webkit-autofill': {
                WebkitBoxShadow: '0 0 0px 1000px var(--color-bg-paper) inset',
                WebkitTextFillColor: 'var(--color-gray-7)',
                caretColor: 'var(--color-gray-7)',
              },
              '&:-webkit-autofill:hover': {
                WebkitBoxShadow: '0 0 0px 1000px var(--color-bg-paper) inset',
              },
              '&:-webkit-autofill:focus': {
                WebkitBoxShadow: '0 0 0px 1000px var(--color-bg-paper) inset',
              },
              '&:-internal-autofill-selected': {
                backgroundColor: 'transparent !important',
                color: 'var(--color-gray-7) !important',
              },
            },

            /* LABEL */
            '& .MuiInputLabel-root': {
              color: 'var(--color-gray-7)',
              fontSize: 'var(--body-03-size)',
              lineHeight: 'var(--body-03-line)',
              fontWeight: 'var(--body-03-weight)',
              transformOrigin: direction === 'rtl' ? 'top right' : 'top left',
            },

            /* LABEL – focused */
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'var(--color-gray-7)',
              fontSize: 'var(--caption-01-size)',
              lineHeight: 'var(--caption-01-line)',
              fontWeight: 'var(--caption-01-weight)',
            },

            /* LABEL – shrunk */
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