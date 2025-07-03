import React, { useState } from 'react';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    Snackbar,
    Typography,
    useTheme
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import TextFieldComponent from '../Common/TextFieldComponent';
import { Apple } from '@mui/icons-material';


// ============ Google ICON Svg ============

const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 48 48">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.72 1.23 9.22 3.25l6.85-6.85C35.07 2.76 29.83.5 24 .5 14.94.5 6.99 5.86 2.86 13.17l7.94 6.18C13.06 14.3 18.14 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.5 24c0-1.57-.14-3.09-.41-4.54H24v9.09h12.66c-.55 2.98-2.27 5.52-4.8 7.21l7.5 5.83C43.53 37.87 46.5 31.4 46.5 24z" />
        <path fill="#FBBC05" d="M10.8 28.61a14.51 14.51 0 0 1 0-9.22l-7.94-6.18a23.99 23.99 0 0 0 0 21.58l7.94-6.18z" />
        <path fill="#34A853" d="M24 46.5c6.48 0 11.92-2.14 15.9-5.84l-7.5-5.83c-2.1 1.41-4.76 2.17-8.4 2.17-5.86 0-10.94-4.8-13.2-11.28L2.86 34.83C6.99 42.14 14.94 46.5 24 46.5z" />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
);

const Login = () => {
    // ============ Hooks ============
    const theme = useTheme();
    const router = useRouter();

    // ============ States ============
    const [data, setData] = useState({
        emailId: '',
        password: ''
    });
    const [toast, setToast] = useState({
        open: false,
        message: '',
        severity: 'success'
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // ============ Handler ============
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    // ============ Validation ============
    const validateForm = () => {
        let isValid = true;
        const tempErrors = {};

        if (!data.emailId?.trim()) {
            isValid = false;
            tempErrors.emailId = '* Enter Email Id!';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.emailId)) {
            isValid = false;
            tempErrors.invalidEmailId = '* Invalid Email Id!';
        }

        if (!data.password?.trim()) {
            isValid = false;
            tempErrors.password = '* Enter Password!';
        }

        setErrors(tempErrors);
        return isValid;
    };

    // ============ Login API ============
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await axios.post('/api/auth/login', {
                email: data.emailId,
                password: data.password
            });

            if (response?.status === 200) {
                console.log('response', response)
                const token = response.data?.token;
                if (token) {
                    localStorage.setItem('LOGIN_TOKEN', token);
                    localStorage.setItem('userData', JSON.stringify(response.data.user));
                }
                setToast({
                    open: true,
                    message: 'Login successful!',
                    severity: 'success'
                });
                router.push('/');
            }
        } catch (error) {
            console.log('error', error)
            setToast({
                open: true,
                message: error?.response?.data?.message || 'Login failed',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card
            elevation={0}
            sx={{
                textAlign: 'center',
                height: '100vh',
                overflowY: 'scroll',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}
        >
            <CardContent sx={{ px: { xs: 2, sm: 5, md: 8, lg: 18 } }}>
                <Typography fontSize={'24px'} fontWeight={700} color={'#000'}>
                    Sign in with free trial
                </Typography>
                <Typography fontSize={'14px'} fontWeight={400} color={'#777'}>
                    Empower your experience, sign up for a free account today
                </Typography>
                <Box
                    onSubmit={handleLogin}
                    component="form"
                    autoComplete="off"
                    textAlign="start"
                    mt={3}
                >
                    <Grid container rowSpacing={2}>
                        <Grid item xs={12}>
                            <TextFieldComponent
                                text="Email Address"
                                valid
                                name="emailId"
                                placeholder="Enter email"
                                value={data.emailId}
                                onChange={handleChangeInput}
                            />
                            <Typography variant="caption" color="error">{data.emailId ? "" : errors.emailId}</Typography>
                            <Typography variant="caption" color="error">
                                {!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.emailId) ? errors.invalidEmailId : ""}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextFieldComponent
                                text="Password"
                                valid
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                value={data.password}
                                onChange={handleChangeInput}
                                showPasswordToggle
                            />
                            <Typography variant="caption" color="error">{data.password ? "" : errors.password}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography textAlign="justify" fontSize="12px">
                                By registering for an account, you are consenting to our{' '}
                                <span style={{ textDecoration: 'underline', color: theme.palette.primary.main }}>
                                    Terms of Service
                                </span>{' '}
                                and confirming that you have reviewed and accepted the{' '}
                                <span style={{ color: theme.palette.primary.main }}>
                                    Global Privacy Policy.
                                </span>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="center">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    disabled={loading}
                                    sx={{
                                        height: '40px',
                                        borderRadius: '50px',
                                        textTransform: 'none',
                                        fontWeight: 600
                                    }}
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </Button>
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography textAlign="center" fontSize="14px">
                                Don’t have an account?{' '}
                                <Link href="/signup" style={{ color: theme.palette.primary.main }}>
                                    Sign up
                                </Link>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider><Typography fontSize="12px" color={"#46464670"}>Or better yet...</Typography></Divider>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" flexDirection="column" gap={2} mt={3}>

                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    gap={1.5}
                                    border="1px solid #e0e0e0"
                                    borderRadius="50px"
                                    py={1.2}
                                    sx={{
                                        cursor: 'pointer',
                                        color: "#000",
                                        transition: 'all 0.3s',
                                        '&:hover': {
                                            backgroundColor: '#f9f9f9',
                                        },
                                    }}
                                >
                                    <GoogleIcon sx={{ fontSize: 22 }} />
                                    <Typography fontSize={14} fontWeight={500}>Continue with Google</Typography>
                                </Box>

                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    gap={1.5}
                                    border="1px solid #e0e0e0"
                                    borderRadius="50px"
                                    py={1.2}
                                    sx={{
                                        cursor: 'pointer',
                                        color: "#000",
                                        transition: 'all 0.3s',
                                        '&:hover': {
                                            backgroundColor: '#f9f9f9',
                                        },
                                    }}
                                >
                                    <Apple sx={{ fontSize: 28 }} />
                                    <Typography fontSize={14} fontWeight={500}>Continue with Apple</Typography>
                                </Box>

                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </CardContent>
            <Snackbar
                open={toast.open}
                autoHideDuration={3000}
                onClose={() => setToast({ ...toast, open: false })}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setToast({ ...toast, open: false })}
                    severity={toast.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {toast.message}
                </Alert>
            </Snackbar>
        </Card>
    );
};

export default Login;
