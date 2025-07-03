import React, { useState } from "react";
import {
    InputLabel,
    Typography,
    Box,
    InputAdornment,
    IconButton,
    TextField,
    useTheme,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const TextFieldComponent = ({
    text,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
    showPasswordToggle,
    multiline,
    rows,
    disabled,
    error,
    valid,
    maxInputLength = 200,
    ...props
}) => {
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    return (
        <Box >
            {text && (
                <Box
                    display="flex"
                    flexDirection={"row"}
                    mb={1}
                >
                    <InputLabel
                        sx={{
                            fontWeight: 600,
                            fontSize: "12px",
                            color: "#5c5c5d"
                        }}
                    >
                        {text}
                    </InputLabel>
                    {valid && (
                        <Typography height={'5px'} color="#EF627A" component={"caption"} variant={"body2"}>
                            *
                        </Typography>
                    )}
                </Box>
            )}
            <TextField
                fullWidth
                size="medium"
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                type={
                    type === "password" && showPasswordToggle
                        ? showPassword
                            ? "text"
                            : "password"
                        : type
                }
                multiline={multiline}
                rows={rows}
                disabled={disabled}
                error={error}
                inputProps={{ maxLength: maxInputLength }}
                InputProps={{
                    endAdornment:
                        type === "password" && showPasswordToggle ? (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ) : null,
                }}
                sx={{
                    "& .MuiOutlinedInput-input": {
                        padding: "12px"
                    },
                    "& .MuiOutlinedInput-root": {
                        backgroundColor: "#f5f5f5",
                        borderRadius: "10px",
                        "& fieldset": {
                            border: 0,
                            borderRadius: "10px",
                        },
                        "& textarea": {
                            color: "#9b9b9c",
                        },
                    },
                }}
                {...props}
            />
        </Box>
    );
};

export default TextFieldComponent;
