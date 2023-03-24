import { Button, Box } from '@mui/material';
import StackedBox from '../containers/stackedBox';
import {useIssue} from "../hooks/issueContext"
const MainPage = ({handleLogOut}) =>{
  const [issues, setIssues] = useIssue();

    return(
        <Box >
          <StackedBox issues={issues} setIssues={setIssues}/>
        </Box>
    )
}


export default MainPage;