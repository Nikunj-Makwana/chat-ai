import Layout from "@/Layout";
import "@/styles/globals.css";
import { createCustomTheme } from "@/styles/theme";
import { ThemeProvider, useTheme } from "@mui/material";
import { useEffect, useState } from "react";


function BodyBackgroundSetter() {
  const theme = useTheme();
  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
  }, [theme]);
  return null;
}

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState(createCustomTheme());
  return (
    <ThemeProvider theme={theme}>
      <BodyBackgroundSetter />
      <Layout setTheme={setTheme}>
        <Component {...pageProps} setTheme={setTheme} />
      </Layout>
    </ThemeProvider>
  );
}
