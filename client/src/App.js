import { useState, useContext, createContext, useMemo } from "react";
import LoginPage from "./pages/loginPage";
import MainPage from "./pages/mainPage";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";

import loginWithGithub from "./hooks/auth";
import Navbar from "./components/navbar";
import { IssueContextProvider, useIssueContext } from "./hooks/issueContext";

//the color mode context, which handle the theme color
const ColorModeContext = createContext({ toggleColorMode: () => {} });

const style = {
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: "background.default",
  color: "text.primary",
  borderRadius: 1,
  p: 3,
};

function App() {
  const { renderer, setRenderer } = useIssueContext();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  function handleLogOut() {
    localStorage.removeItem("access_token");
    setRenderer(!renderer);
  }

  return (
    <>
      {localStorage.getItem("access_token") && (
        <Navbar
          handleLogOut={handleLogOut}
          theme={theme}
          colorMode={colorMode}
        ></Navbar>
      )}
      <Box sx={style}>
        <Box sx={style}>
          {localStorage.getItem("access_token") ? (
            <MainPage handleLogOut={handleLogOut} />
          ) : (
            <LoginPage loginWithGithub={loginWithGithub} />
          )}
        </Box>
      </Box>
      <div
        id="watermark"
        style={{
          position: "fixed",
          right: "10px",
          bottom: "10px",
          fontSize: "12px",
          fontStyle: "italic",
          color: "#aaa",
        }}
      >
        Copyright &copy; 2023 You Ming-Yeh
      </div>
    </>
  );
}

//export the themed app with color mode
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
