import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {},
  typography: {
    fontFamily: '"Open Sans", sans-serif',
    h1: {
      fontSize: '2.35rem',
      fontWeight: 300,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.6rem',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1.45rem',
      fontWeight: 700,
    },
    h5: {
      fontSize: '1.3rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1.15rem',
      fontWeight: 700,
    },
    subtitle1: {
      fontWeight: 300,
    },
    subtitle2: {
      fontWeight: 300,
    },
    body2: {
      fontSize: '.85rem',
    },
    button: {
      fontSize: '1rem',
      fontWeight: 700,
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (params) => ({
        html: {
          fontSize: '14px',
        },
        body: {
          fontSize: '1rem',
          overflow: 'hidden',
        },
        'html, body': {
          width: '100%',
          height: '100%',
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
      }),
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: 'contained',
      },
    },
  },
});

export default theme;
