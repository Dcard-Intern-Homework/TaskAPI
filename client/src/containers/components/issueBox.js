import { Box } from "@mui/material";

const IssueBox = ({user, title, status, body}) => {
    console.log("IssueBox")

    return (
    <Box sx={{ p: 2, bgcolor: "background.paper", borderRadius: 1, mb: 2 }}>
      <h1>{title}</h1>
      <h1>{status}</h1>
      <h1>{body}</h1>
    </Box>
    )
  
}
export default IssueBox;