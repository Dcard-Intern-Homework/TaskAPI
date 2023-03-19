import { Button, Box } from '@mui/material';
import StackedBox from '../containers/stackedBox';

const MainPage = ({handleLogOut,getUserData, getPrivateIssues, issues }) =>{

    
    return(
        <Box >
        <h1> We have the access_token
          </h1>
          <Button variant="outlined" onClick={handleLogOut}>
            Log out
          </Button>
          <h3>Get user data from github api</h3>
          <Button variant="outlined" onClick={getUserData}>get</Button>
          
          <h3>Get issues from github api</h3>
          <Button variant="outlined" onClick={getPrivateIssues}>get</Button>
          {issues && <StackedBox data={issues}/>}
        </Box>
    )
}


export default MainPage;