import { useEffect, useState, useContext, createContext, useMemo } from "react";
import LoginPage from "./pages/loginPage"
import MainPage from "./pages/mainPage"
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { Button, IconButton, Box } from "@mui/material"
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const CLIENT_ID = "4b7feddfcd88aa615d89";

const ColorModeContext = createContext({ toggleColorMode: () => {} });


function App() {
  const [renderer, setRenderer] = useState(false);
  const [user, setUser] = useState(null);
  const [issues, setIssues] = useState()
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParams = urlParams.get("code");
    console.log(codeParams);

    if (codeParams && localStorage.getItem("access_token") === null) {
      async function getAccessToken() {
        await fetch("http://localhost:4000/getAccessToken?code=" + codeParams, {
          method: "GET",
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            if (data.access_token) {
              localStorage.setItem("access_token", data.access_token);
              setRenderer(!renderer);
            }
          });
      }
      getAccessToken();
    }
  }, []);

  async function getUserData() {
    await fetch("http://localhost:4000/getUserData", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        
        return response.json();
      })
      .then((data) => {
        setUser(data);
        console.log(data);
      });
  }


  async function getPrivateIssues() {
    
    await fetch("http://localhost:4000/getPrivateIssues", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        
        return response.json();
      })
      .then((data) => {
        setIssues(data.items);
        console.log(data);
      });
  }

  function loginWithGithub() {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID
    );
  }

  function handleLogOut() {
    localStorage.removeItem("access_token"); setRenderer(!renderer);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        p: 3,
      }}
    >
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>

      <Box sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        p: 3,
      }}>
        {localStorage.getItem("access_token") ? (
          
          <MainPage handleLogOut={handleLogOut} getUserData={getUserData} getPrivateIssues={getPrivateIssues} issues={issues}/>
        ) : (
          <LoginPage loginWithGithub={loginWithGithub} />
        )}
      </Box>
      
    </Box>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = useState('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}



