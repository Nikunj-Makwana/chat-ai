import React, { useEffect, useState } from "react";
import {
    Avatar, Box, Dialog, Drawer, IconButton, List, ListItem, ListItemText, Typography, useMediaQuery, Button, Grid, Fab, Snackbar, Alert
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";
import { useTheme } from "@mui/material/styles";
import { ChromePicker } from "react-color";
import { createCustomTheme } from "@/styles/theme";
import { Add, DeleteOutlineOutlined, TextsmsOutlined } from "@mui/icons-material";
import stringAvatar from "./StringAvatar";
import axios from "axios";
import { useRouter } from "next/router";

const drawerWidth = 280;
const Sidebar = ({ setTheme }) => {
    // ============ Hooks ============
    const theme = useTheme();
    const router = useRouter();

    // ============ States ============
    const [userData, setUserData] = useState(null);
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [toast, setToast] = useState({
        open: false,
        message: '',
        severity: 'success'
    });
    const [sideBarData, setSideBarData] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogTab, setDialogTab] = useState("theme");
    const [pickerColor, setPickerColor] = useState(theme.palette.background.default);

    // ============ Handler ============
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleOpenDialog = (tab) => {
        setDialogTab(tab);
        setDialogOpen(true);
    };

    const handleLogOut = () => {
        localStorage.removeItem("userData")
        localStorage.removeItem("LOGIN_TOKEN")
        router.push('/login')
    }
    // ============ Drawer Content ============
    const drawerContent = (
        <Box>
            <Box p={2}>
                <Typography fontSize={"22px"} fontWeight={700}>
                    CHAT A.I +
                </Typography>
                <Box display={'flex'} gap={1} mt={2}>

                    <Button
                        type="submit"
                        variant="contained"
                        startIcon={<Add />}
                        sx={{
                            height: '45px',
                            borderRadius: '50px',
                            flexGrow: 1,
                            textTransform: 'none',
                            boxShadow: "none",
                        }}
                        onClick={() => router.push("/")}
                    >
                        {'New chat'}
                    </Button>
                    <Fab
                        size="medium"
                        disableRipple
                        sx={{
                            boxShadow: 'none',
                            width: '45px',
                            height: '45px',
                            bgcolor: '#000',
                            '&:hover': {
                                bgcolor: '#000',
                            },
                        }}
                    >
                        <img src="/Assets/Search.svg" alt="search" style={{ width: 20, height: 20 }} />
                    </Fab>
                </Box>
            </Box>
            <Box display={"flex"} height={"calc(100vh - 150px)"} justifyContent={'space-between'} flexDirection={'column'}>
                <Box
                    sx={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                    }}
                >
                    <List>
                        {sideBarData?.map((section, index) => (
                            <Box key={section.heading}>
                                <Box
                                    sx={{
                                        px: "26px",
                                        py: 1.5,
                                        borderTop: "1px solid #efefef",
                                        borderBottom: "1px solid #efefef",
                                        display: 'flex',
                                        justifyContent: "space-between"
                                    }}>

                                    <Typography
                                        variant="subtitle2"
                                        color={"#696969"}
                                        fontWeight={"bold"}
                                    >
                                        {section.heading}
                                    </Typography>
                                    {index == 0 &&
                                        <Typography
                                            variant="subtitle2"
                                            color={"primary"}
                                            fontWeight={"bold"}
                                            sx={{ cursor: "pointer" }}
                                        >
                                            {"Clear All"}
                                        </Typography>

                                    }
                                </Box>
                                <List sx={{ padding: "10px 0px 10px 10px", display: "flex", flexDirection: "column", gap: "10px" }}>
                                    {section?.list?.map((item) => {
                                        const isActive = router.asPath === `/chat/${item?.id}`;
                                        return (
                                            <ListItem
                                                button
                                                key={item.id}
                                                onClick={() => router.push(`/chat/${item?.id}`)}
                                                sx={{
                                                    padding: "0px",
                                                    borderTopLeftRadius: "30px",
                                                    borderBottomLeftRadius: "30px",
                                                    display: "flex",
                                                    height: "44px",
                                                    justifyContent: 'space-between',
                                                    flexWrap: 'nowrap',
                                                    position: "relative",
                                                    bgcolor: isActive ? "#f6f6ff" : "transparent",
                                                    color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
                                                    "&:hover": {
                                                        bgcolor: "#f6f6ff",
                                                        ".action-icons": { visibility: "visible" },
                                                    },
                                                    ...(isActive && {
                                                        "&::before": {
                                                            content: '""',
                                                            position: "absolute",
                                                            top: "50%",
                                                            right: "-20px",
                                                            width: "38px",
                                                            height: "38px",
                                                            background: theme.palette.background.default,
                                                            borderBottomLeftRadius: "15px",
                                                            zIndex: 9,
                                                            transform: "translateY(-50%) rotate(45deg)",
                                                        },
                                                        "&::after": {
                                                            content: '""',
                                                            position: "absolute",
                                                            top: "32%",
                                                            right: "12px",
                                                            width: "7px",
                                                            height: "16px",
                                                            background: "transparent",
                                                            borderLeft: `2px solid ${theme.palette.primary.main}`,
                                                            borderRadius: "50%",
                                                            zIndex: 99,
                                                        },
                                                    }),

                                                }}
                                            >
                                                {isActive &&
                                                    <Box height={"10px"} width={'10px'} borderRadius={"50%"} sx={{ position: "absolute", right: "0px", top: "50%", transform: "translateY(-50%) rotate(45deg)", zIndex: 99 }} bgcolor={theme.palette.primary.main}></Box>
                                                }
                                                <Box sx={{ pl: 2, py: 1, display: "flex", gap: "5px", alignItems: "center" }}>
                                                    <TextsmsOutlined fontSize="12px" />
                                                    <Typography fontSize={'14px'} width={isActive ? "160px" : "100%"} noWrap>{item.title}</Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        // gap: 0.5,
                                                        visibility: isActive ? "visible" : "hidden",
                                                        bgcolor: "#eef0fd",
                                                        height: "44px",
                                                        width: "90px",
                                                        display: "flex", alignItems: 'center', gap: 1,
                                                        borderTopLeftRadius: "30px",
                                                        borderBottomLeftRadius: "30px",
                                                        pl: 1,
                                                        pr: 2,
                                                        py: 0
                                                    }}
                                                >
                                                    <DeleteOutlineOutlined sx={{ fontSize: "16px", color: '#000' }} />
                                                    <EditIcon sx={{ fontSize: "16px", color: '#000' }} />
                                                </Box>
                                            </ListItem>
                                        );
                                    })}
                                </List>

                            </Box>
                        ))}
                    </List>
                </Box>
                <List sx={{ padding: "20px", display: "flex", gap: "10px", flexDirection: "column", borderTop: "1px solid #cdcdcd" }}>
                    <ListItem
                        sx={{
                            px: 1,
                            border: "1px solid #e0e0e0",
                            borderRadius: "30px",
                            height: "46px",
                            display: "flex",
                            alignItems: "center",
                            "&:hover": {
                                backgroundColor: "#f9f9f9"
                            }
                        }}
                        onClick={() => handleOpenDialog("theme")}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Box
                                sx={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: "50%",
                                    backgroundColor: "#efefef",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <SettingsIcon sx={{ fontSize: "18px", color: "#000" }} />
                            </Box>
                            <ListItemText primary="Settings" />
                        </Box>
                    </ListItem>
                    <ListItem
                        sx={{
                            px: 1,
                            border: "1px solid #e0e0e0",
                            borderRadius: "30px",
                            height: "46px",
                            display: "flex",
                            alignItems: "center",
                            "&:hover": {
                                backgroundColor: "#f9f9f9"
                            }
                        }}
                        onClick={() => handleOpenDialog("profile")}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Avatar
                                {...stringAvatar(userData?.name || "Nikunj Makwana")}
                                sx={{
                                    ...stringAvatar(userData?.name || "Nikunj Makwana").sx,
                                    height: "30px",
                                    width: "30px",
                                    fontSize: "14px"
                                }}
                            />
                            <ListItemText primary={userData?.name || "Nikunj Makwana"} />
                        </Box>
                    </ListItem>
                </List>
            </Box >
        </Box>
    );

    // ============ Sidebar Data API ============
    const getSidebarData = () => {
        const token = localStorage.getItem('LOGIN_TOKEN');

        axios.get('/api/chatData', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log('Data:', response.data);
                setToast({
                    open: true,
                    message: response.data?.message || 'Data loaded successfully!',
                    severity: 'success'
                });
                setSideBarData(response.data?.data)
            })
            .catch((error) => {
                const errorMessage = error?.response?.data?.message || 'Something went wrong';

                setToast({
                    open: true,
                    message: errorMessage,
                    severity: 'error'
                });
            })
            .finally(() => {
                console.log('Request completed');
            });
    };

    // ============ Use Effects ============
    useEffect(() => {
        getSidebarData();
    }, [])

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedData = localStorage.getItem("userData");
            if (storedData) {
                setUserData(JSON.parse(storedData));
            }
        }
    }, []);

    return (
        <>
            <Box position={"fixed"} top={0} left={"15px"}>
                {isMobile && (
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                )}

            </Box>
            <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
                <Drawer
                    variant={isMobile ? "temporary" : "permanent"}
                    open={isMobile ? mobileOpen : true}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box",
                            borderRadius: 2,
                            height: 'calc(100vh - 20px)',
                            m: "10px",
                            border: "0px",
                            overflowX: "hidden",
                        },
                    }}
                >
                    {drawerContent}
                </Drawer>
                <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md">
                    <Box display="flex" minHeight="350px">
                        <Box width="200px" p={2} borderRight="1px solid #ddd" display="flex" flexDirection="column" gap={1}>
                            <Button
                                fullWidth
                                color="primary"
                                variant={dialogTab === "theme" ? "contained" : "text"}
                                onClick={() => setDialogTab("theme")}
                                sx={{ boxShadow: "none", borderRadius: "30px", textTransform: "capitalize" }}
                            >
                                Change Theme
                            </Button>
                            <Button
                                fullWidth
                                color="primary"
                                variant={dialogTab === "profile" ? "contained" : "text"}
                                onClick={() => setDialogTab("profile")}
                                sx={{ boxShadow: "none", borderRadius: "30px", textTransform: "capitalize" }}
                            >
                                Profile
                            </Button>
                            <Button
                                fullWidth
                                color="primary"
                                variant={dialogTab === "logout" ? "contained" : "text"}
                                onClick={() => setDialogTab("logout")}
                                sx={{ boxShadow: "none", borderRadius: "30px", textTransform: "capitalize" }}
                            >
                                Logout
                            </Button>
                        </Box>

                        <Box p={3} flexGrow={1}>
                            {dialogTab === "theme" && (
                                <Box textAlign={'center'}>
                                    <Typography fontSize={"18px"} fontWeight={700} mb={2}>Pick a theme color</Typography>
                                    <ChromePicker
                                        color={pickerColor}
                                        onChange={(color) => {
                                            setPickerColor(color.hex);
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        sx={{ mt: 2, borderRadius: "20px", textTransform: "capitalize" }}
                                        onClick={() => {
                                            setTheme((prev) =>
                                                createCustomTheme({
                                                    palette: {
                                                        ...prev.palette,
                                                        background: {
                                                            ...prev.palette.background,
                                                            default: pickerColor,
                                                        },
                                                    },
                                                })
                                            );
                                        }}
                                    >
                                        Save
                                    </Button>

                                </Box>
                            )}
                            {dialogTab === "profile" && (
                                <>
                                    <Typography fontSize={"18px"} fontWeight={700} mb={2}>Profile Information</Typography>
                                    <Grid container rowSpacing={1}>
                                        <Grid item xs={12}>
                                            <Typography fontSize={"12px"} fontWeight={400} >Name </Typography>
                                            <Typography fontSize={"15px"} fontWeight={700} >{userData?.name || "Nikunj Makwana"}</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography fontSize={"12px"} fontWeight={400} >Email</Typography>
                                            <Typography fontSize={"15px"} fontWeight={700} >{userData?.email || "nikunjmakwanab704@gmail.com"}</Typography>
                                        </Grid>
                                    </Grid>
                                </>
                            )}
                            {dialogTab === "logout" && (
                                <Box textAlign={'center'}>
                                    <Typography fontSize={"18px"} fontWeight={700} mb={2}>Are you sure you want to logout?</Typography>
                                    <Button variant="contained" color="error" sx={{ textTransform: "capitalize" }} onClick={() => handleLogOut()}>
                                        Yes
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Dialog>
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
            </Box>
        </>
    );
};

export default Sidebar;
