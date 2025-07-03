import { EmojiEmotionsOutlined, Image, Send } from '@mui/icons-material';
import {
    Chip, Grid, IconButton, InputAdornment, TextField, Typography
} from '@mui/material';
import React, { useState } from 'react';

const LeftSideInfo = () => {
    // ============ States ============
    const [value, setValue] = useState('');

    // ============ Handler ============
    const handleSend = () => {
        if (value.trim()) {
            setValue('');
        }
    };

    const handleKeyDown = (event) => {
        if (event.code === 'Enter' || event.code === 'NumpadEnter') {
            handleSend();
        }
    };

    return (
        <Grid
            container
            p={3}
            height={'100%'}
            minHeight="100vh"
            sx={{
                backgroundImage: `radial-gradient(circle at top right, rgb(134, 174, 255) 10%, transparent 30%), linear-gradient(to right bottom, #5661F6 50%, #9d79cc, #f6a3a3, #fa95b5)`,
                backgroundBlendMode: 'overlay',
                color: '#FFF',
            }}
        >
            <Grid item xs={12}>
                <Typography variant="h5">CHAT A.I +</Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant="h3">Learn, Discover &</Typography>
                <Typography variant="h3" ml={10}>
                    Automate in One Place.
                </Typography>
            </Grid>

            <Grid item xs={12} sx={{ px: { xs: 2, lg: 6 } }}>
                <Typography fontSize="14px" fontWeight={500}>
                    Create a chatbot GPT using Python language. What will be the steps for that?
                </Typography>

                <Chip
                    label="CHAT A.I +"
                    variant="outlined"
                    sx={{ color: '#FFF', fontStyle: 'italic', height: '26px', my: 1 }}
                />

                <Typography fontSize="14px" fontWeight={500}>
                    <span style={{ fontWeight: 700 }}>
                        Sure, I can help you get started with creating a chatbot using GPT in Python.
                    </span>{' '}
                    Here are the basic steps you'll need to follow:
                </Typography>

                <ol>
                    <li style={{ fontSize: '14px', fontWeight: 400, margin: '10px 0px' }}>
                        <strong>Install the required libraries:</strong> You'll need to install the
                        <code> transformers </code>
                        library from Hugging Face. You can install it using pip.
                    </li>
                    <li style={{ fontSize: '14px', fontWeight: 400, margin: '10px 0px' }}>
                        <strong>Load the pre-trained model:</strong> GPT comes in several sizes and versions, so you'll
                        need to choose the one that fits your needs. You can load a pre-trained GPT model.
                    </li>
                </ol>

                <Typography fontSize="14px" fontWeight={500} mb={4}>
                    These are just the basic steps to get started with a GPT chatbot in Python. Depending on your
                    requirements, you may need to add more features or complexity to the chatbot. Good luck!
                </Typography>

                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Reply ..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    inputProps={{ maxLength: 1000 }}
                    sx={{
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(6px)',
                        borderRadius: '9999px',
                        '& .MuiOutlinedInput-root': {
                            paddingRight: '8px',
                            borderRadius: '9999px',
                            color: '#fff',
                            '& fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.2)',
                            },
                            '&:hover fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.4)',
                            },
                        },
                        '& input::placeholder': {
                            color: '#fff',
                            opacity: 1,
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmojiEmotionsOutlined sx={{ fontSize: 20, color: '#fff' }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <Image sx={{ fontSize: 20, color: '#fff', mx: 1 }} />
                                <IconButton
                                    onClick={handleSend}
                                    sx={{
                                        background: 'linear-gradient(to bottom right, #5B61F5, #AE6BE9)',
                                        color: '#fff',
                                        width: 36,
                                        height: 36,
                                        borderRadius: '50%',
                                        '&:hover': {
                                            background: 'linear-gradient(to bottom right, #4a50e0, #9e5dd9)',
                                        },
                                    }}
                                >
                                    <Send fontSize="small" />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default LeftSideInfo;
