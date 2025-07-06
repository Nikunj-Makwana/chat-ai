import { Bolt, FlashOn, Info, Mic, NextPlanOutlined, Send, TrendingFlat, Warning, WarningAmber } from "@mui/icons-material";
import { Avatar, Box, Button, Card, Chip, Grid, Hidden, IconButton, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { motion } from 'framer-motion';
import React, { useEffect, useState } from "react";

const SideCard = ({ icon, title, desc }) => (
  <motion.div
    whileHover={{ y: -8 }}
    transition={{ duration: 0.3 }}
  >
    <Paper
      elevation={0}
      sx={{
        bgcolor: "#000",
        color: "white",
        borderRadius: 2,
        p: 1.5,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {icon}
      <Typography fontWeight={600} fontSize={"14px"} mt={1} >
        {title}
      </Typography>
      <Typography variant="caption" fontSize={"12px"} color="grey.400">
        {desc}
      </Typography>
    </Paper>
  </motion.div>
);

const MainCard = ({ img, title, desc }) => (
  <motion.div
    whileHover={{ y: -8 }}
    transition={{ duration: 0.3 }}
  >
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        width: "100%",
        height: "100%",
        display: "flex",
        gap: 2,
        alignItems: "start",
        flexDirection: "column"
      }}
    >
      <Avatar src={img} alt={title} />
      <Box display={'flex'} width={'100%'} justifyContent={"space-between"} alignItems={'end'}>
        <Box >
          <Typography fontWeight={600} fontSize={"14px"} >
            {title}
          </Typography>
          <Typography variant="body2" fontSize={"12px"} >{desc}</Typography>
        </Box>
        <Typography fontWeight={600} ml="auto">
          <TrendingFlat />
        </Typography>
      </Box>
    </Paper>
  </motion.div>
);

const DividerDots = () => (
  <motion.div
    whileHover={{ y: -8 }}
    transition={{ duration: 0.3 }}
  >
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Box display="flex" gap={0.5} alignItems={"center"} height={'100%'}>
        <Box width={4} height={48} bgcolor="#b6b7b8" borderRadius={5} />
        <Box width={4} height={48} bgcolor="#b6b7b8" borderRadius={5} />
        <Box width={4} height={48} bgcolor="#b6b7b8" borderRadius={5} />
      </Box>
    </Box>
  </motion.div>
);

export default function Home() {
  // ============ Hooks ============
  const router = useRouter();

  // ============ States ============
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
    setText("");

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
    const login_Token = typeof window !== "undefined" ? localStorage.getItem("LOGIN_TOKEN") : null;
    if (!login_Token) {
      router.push("/login");
    }
  }, [router]);

  // ============ Dashboard Data Json ============
  const dashboardJson = [
    {
      leftData: "Explore",
      icon: <Info fontSize="small" />,
      description: "Learn how to use chatbot platform for your needs",
      ridhtSideData: [
        {
          title: '"Explain"',
          description: "Quantum computing in simple terms",
          avtar: `https://picsum.photos/40/40?random=${Math.floor(Math.random() * 1000)}`,
        },
        {
          title: '"How to"',
          description: "Make a search engine platform like Google",
          avtar: `https://picsum.photos/40/40?random=${Math.floor(Math.random() * 1000)}`,
        },
      ],
    },
    {
      leftData: "Capabilities",
      icon: <FlashOn fontSize="small" />,
      description: "How much capable chat.ai to fulfill your needs",
      ridhtSideData: [
        {
          title: '"Remember"',
          description: "Quantum computing in simple terms",
          avtar: `https://picsum.photos/40/40?random=${Math.floor(Math.random() * 1000)}`,
        },
        {
          title: '"Allows"',
          description: "User to provide follow-up corrections",
          avtar: `https://picsum.photos/40/40?random=${Math.floor(Math.random() * 1000)}`,
        },
      ],
    },
    {
      leftData: "Limitation",
      icon: <WarningAmber fontSize="small" />,
      description: "Where chat.ai has limitations",
      ridhtSideData: [
        {
          title: '"May"',
          description: "Occasionally generate incorrect information",
          avtar: `https://picsum.photos/40/40?random=${Math.floor(Math.random() * 1000)}`,
        },
        {
          title: '"Limited"',
          description: "Knowledge of world and events after 2021",
          avtar: `https://picsum.photos/40/40?random=${Math.floor(Math.random() * 1000)}`,
        },
      ],
    },
  ];

  return (
    <>
      <Head>
        <title>Chat AI</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box
          sx={{
            flex: 1,
            width: '100%',
            maxWidth: '900px',
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
          <Box textAlign="center" mb={6}>
            <Chip
              label="CHAT A.I+"
              sx={{
                px: 2,
                height: "30px",
                bgcolor: "white",
                borderRadius: "999px",
                fontWeight: 600,
                fontSize: "0.875rem",
              }}
            />
            <Typography fontSize={"28px"} fontWeight={700} mt={2}>
              Good day! How may I assist you today?
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {dashboardJson?.map((ele, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12} sm={3} md={2}>
                  <SideCard
                    icon={ele?.icon}
                    title={ele?.leftData}
                    desc={ele?.description}
                  />
                </Grid>
                <Hidden smDown>
                  <Grid item xs={12} sm={1} display="flex" justifyContent="center" alignItems="center">
                    <DividerDots />
                  </Grid>
                </Hidden>

                <Grid container item xs={12} sm={8} md={9} spacing={2}>
                  {ele?.ridhtSideData?.map((item, subIndex) => (
                    <Grid item xs={12} sm={6} key={subIndex}>
                      <MainCard
                        img={item?.avtar}
                        title={item?.title}
                        desc={item?.description}
                      />
                    </Grid>
                  ))}
                </Grid>
              </React.Fragment>
            ))}
          </Grid>

        </Box>
        <Box
          sx={{
            width: '100%',
            maxWidth: '900px',
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
    </>
  );
}
