import { Button } from '@mui/material';
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    type: 'dark'
  }
});

const LoginPage = ({loginWithGithub}) => {
  return (
    <>
      <p>User is not logged in</p>
      <Button theme={theme}  variant="outlined" onClick={loginWithGithub}>Login with Github</Button>
    </>
  );
};

export default LoginPage;
