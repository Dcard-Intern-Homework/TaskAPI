import {
  useEffect,
  useRef,
  useState,
  useContext,
  createContext,
  useMemo,
} from "react";
import LoginPage from "./pages/loginPage";
import MainPage from "./pages/mainPage";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import { Button, IconButton, Box, CssBaseline } from "@mui/material";

import loginWithGithub from "./hooks/auth";
import Navbar from "./components/navbar";
import {
  IssueContextProvider,
  handleScroll,
  useIssueContext,
} from "./hooks/issueContext";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const { issues, setIssues, user, renderer, setRenderer } = useIssueContext();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  function handleLogOut() {
    localStorage.removeItem("access_token");
    setRenderer(!renderer);
  }

  return (
    <div >
      {renderer && (
        <Navbar
          handleLogOut={handleLogOut}
          theme={theme}
          colorMode={colorMode}
        ></Navbar>
      )}
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
        <IssueContextProvider>
          
          <App />
        </IssueContextProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
