import React, { useState } from 'react';
import {
    Alert, Box, Button, Card, CardContent, Grid, Snackbar, Typography, useTheme
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import TextFieldComponent from '../Common/TextFieldComponent';

const SignUp = () => {
    // ============ Hooks ============
    const theme = useTheme();
    const router = useRouter();

    // ============ States ============
    const [data, setData] = useState({
        name: '',
        emailId: '',
        password: '',
        confirmPassword: '',
        city: '',
        state: '',
        country: ''
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
        let formIsValid = true;
        const errors = {};

        if (!data.name?.trim()) {
            formIsValid = false;
            errors.name = '* Enter Full Name!';
        }
        if (!data.emailId?.trim()) {
            formIsValid = false;
            errors.emailId = '* Enter Email Id!';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.emailId)) {
            formIsValid = false;
            errors.invalidEmailId = '* Invalid Email Id!';
        }
        if (!data.password) {
            formIsValid = false;
            errors.password = '* Enter Password!';
        }
        setErrors(errors);
        return formIsValid;
    };

    // ============ Sign Up API ============
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);

        try {
            const response = await axios.post('/api/auth/signup', {
                name: data.name,
                email: data.emailId,
                password: data.password,
            });

            if (response?.status === 200) {
                setToast({
                    open: true,
                    message: `Signup successful! ${response.data?.message || ''}`,
                    severity: 'success'
                });
                router.push('/login');
            }
        } catch (error) {
            setToast({
                open: true,
                message: error?.response?.data?.message || 'Something went wrong',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card elevation={0} sx={{ textAlign: 'center', height: '100vh', overflowY: 'scroll', display: 'flex', flexDirection: "column", justifyContent: "center" }}>
            <CardContent sx={{ px: { xs: 2, sm: 5, md: 8, lg: 18 } }}>
                <Typography fontSize={'24px'} fontWeight={700} color={'#000'}>
                    Sign up with free trial
                </Typography>
                <Typography fontSize={'14px'} fontWeight={400} color={'#777'}>
                    Empower your experience, sign up for a free account today
                </Typography>

                <Box
                    onSubmit={handleSubmit}
                    component="form"
                    autoComplete="off"
                    textAlign="start"
                    mt={3}
                >
                    <Grid container rowSpacing={2}>
                        <Grid item xs={12}>
                            <TextFieldComponent
                                text="Full Name"
                                valid
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                value={data.name}
                                onChange={handleChangeInput}
                            />
                            <Typography variant="caption" color="error">{data.name ? "" : errors.name}</Typography>
                        </Grid>
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
                            <Typography variant="caption" color="error">{!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.emailId) ? errors.invalidEmailId : ""}</Typography>
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
                                    {loading ? 'Creating...' : 'Create'}
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography textAlign="center" fontSize="14px">
                                Already have an account?{' '}
                                <Link href="/login" style={{ color: theme.palette.primary.main }}>
                                    Login
                                </Link>
                            </Typography>
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

export default SignUp;
