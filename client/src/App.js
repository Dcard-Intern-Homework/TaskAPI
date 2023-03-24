import { useEffect, useState, useContext, createContext, useMemo } from "react";
import LoginPage from "./pages/loginPage";
import MainPage from "./pages/mainPage";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import { Button, IconButton, Box, CssBaseline } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import useUser from "./hooks/userContext";
import useRenderer from "./hooks/renderer";
import { handleScroll, useIssue } from "./hooks/issueContext";
import loginWithGithub from "./hooks/auth";
import Navbar from "./components/navbar";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const [renderer, setRenderer] = useRenderer();
  const [user, setUser] = useUser();
  const [issues, setIssues] = useIssue();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  function handleLogOut() {
    localStorage.removeItem("access_token");
    setRenderer(!renderer);
  }

  return (
    <div onScroll={(event)=>{handleScroll(event, issues, setIssues)}}>
      {!renderer && <Navbar handleLogOut={handleLogOut}></Navbar>}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          color: "text.primary",
          borderRadius: 1,
          p: 3,
        }}
      >
        <IconButton
          sx={{ ml: 1 }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>

        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "background.default",
            color: "text.primary",
            borderRadius: 1,
            p: 3,
          }}
        >
          {localStorage.getItem("access_token") ? (
            <MainPage handleLogOut={handleLogOut} />
          ) : (
            <LoginPage loginWithGithub={loginWithGithub} />
          )}
        </Box>
      </Box>
    </div>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
