import { createTheme } from '@mui/material/styles';

const colors = {
    primary: {
        main: '#5661F6',
    },
    success: {
        main: '#388E3C',
    },
    warning: {
        main: '#F57C00',
    },
    error: {
        main: '#D32F2F',
    },
    background: {
        default: '#f0f1f2',
    },
};

const theme = createTheme({
    palette: {
        ...colors,
    },
    typography: {
        fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    },
});
export const createCustomTheme = (overrides = {}) =>
    createTheme({
        ...theme,
        ...overrides,
        palette: {
            ...theme.palette,
            ...overrides.palette,
        },
    });

export const lightTheme = createCustomTheme();