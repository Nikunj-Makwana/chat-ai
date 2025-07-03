import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Box, Divider, Fab, IconButton, InputAdornment, ListItemText, TextField } from '@mui/material';
import stringAvatar from '@/Component/Common/StringAvatar';
import { ContentCopy, Mic, MoreVertOutlined, Send, ThumbDownOffAlt, ThumbUpOffAlt } from '@mui/icons-material';

const Index = () => {

    // ============ Hooks ============
    const router = useRouter();
    const { id: productId } = router.query;

    // ============ States ============
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [text, setText] = useState("");

    // ============ Handler ============
    let recognition;

    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
        recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = "en-US";
    } else {
        console.error("Speech recognition is not supported in this browser.");
    }

    const startRecording = () => {
        if (!recognition) return;

        setIsRecording(true);
        setText(""); // Clear previous text

        recognition.start();

        recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map((result) => result[0].transcript)
                .join("");
            setText(transcript);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            setIsRecording(false);
        };

        recognition.onend = () => {
            setIsRecording(false);
        };
    };

    const stopRecording = () => {
        if (recognition) {
            recognition.stop();
            setIsRecording(false);
        }
    };
    // ============ Use Effect ============
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('LOGIN_TOKEN');
            if (!productId || !token) return;
            try {
                const response = await axios.get('/api/chatData', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const allItems = response.data?.data
                    ?.flatMap(section => section?.list || []);

                const foundItem = allItems?.find(item => item?.id === productId);
                console.log('allItems', foundItem)
                if (foundItem?.id) {
                    setProductData(foundItem);
                } else {
                    setError('Item not found.');
                }
            } catch (err) {
                setError('Failed to load chat data.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [productId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: "red" }}>{error}</div>;

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box
                sx={{
                    flex: 1,
                    width: '100%',
                    maxWidth: '700px',
                    overflowY: 'auto',
                    px: 2,
                    py: 2,
                    boxSizing: 'border-box',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',

                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                }}
            >
                <h1>{productData?.title}</h1>
                <Box display="flex" gap={1} alignItems="center">
                    <Avatar
                        {...stringAvatar('Nikunj Makwana')}
                        sx={{
                            ...stringAvatar('Nikunj Makwana').sx,
                            height: "30px",
                            width: "30px",
                            fontSize: "14px"
                        }}
                    />
                    <ListItemText primary={productData?.question} />
                </Box>
                <Box dangerouslySetInnerHTML={{ __html: productData?.description }} />
                <Box display={'flex'} alignItems={"center"} gap={1}>
                    <Box
                        sx={{
                            background: "#efefef",
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 1,
                            p: 1,
                            borderRadius: "30px",
                            width: "fit-content"
                        }}
                    >
                        {[ThumbUpOffAlt, ThumbDownOffAlt, ContentCopy].map((Icon, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    '&:hover svg': {
                                        color: 'primary.main',
                                    },
                                    cursor: 'pointer',
                                }}
                            >
                                <Icon sx={{ fontSize: 16 }} />
                                {index < 2 && <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />}
                            </Box>
                        ))}
                    </Box>
                    <Fab
                        size="small"
                        sx={{
                            height: "32px",
                            width: "32px",
                            bgcolor: '#efefef',
                            boxShadow: 'none',
                            minHeight: "32px",
                            '&:hover': {
                                bgcolor: '#efefef',
                            },
                        }}
                    >
                        <MoreVertOutlined />
                    </Fab>
                </Box>
            </Box>
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '700px',
                    px: 2,
                    py: 1,
                    position: 'sticky',
                    bottom: 0,
                    zIndex: 10,
                }}
            >
                <TextField
                    fullWidth
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    variant="outlined"
                    placeholder="What's in your mind?..."
                    inputProps={{ maxLength: 1000 }}
                    sx={{
                        backgroundColor: '#fff',
                        borderRadius: '9999px',
                        '& .MuiOutlinedInput-root': {
                            paddingRight: '8px',
                            borderRadius: '9999px',
                            color: '#000',
                            '& fieldset': {
                                borderColor: 'rgba(0, 0, 0, 0.2)',
                            },
                            '&:hover fieldset': {
                                borderColor: 'rgba(0, 0, 0, 0.4)',
                            },
                        },
                        '& input::placeholder': {
                            color: '#666',
                            opacity: 1,
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">🧠</InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={isRecording ? stopRecording : startRecording}
                                    sx={{
                                        mr: 1,
                                        background: "#efefef",
                                        color: '#555',
                                        width: 36,
                                        height: 36,
                                        borderRadius: '50%',
                                        '&:hover': {
                                            background: '#e0e0e0',
                                        },
                                    }}
                                >
                                    <Mic fontSize="small" />
                                </IconButton>
                                <IconButton
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
            </Box>
        </Box>
    );
};

export default Index;
