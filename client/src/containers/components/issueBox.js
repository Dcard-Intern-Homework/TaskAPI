import {
  Card,
  Typography,
  CardContent,
  Button,
  Box,
  Paper,
  Avatar,
  Divider,
} from "@mui/material";

const IssueBox = ({ user, title, status, body }) => {
  return (
    <Card
      sx={{
        display: "flex",
        bgcolor: "background.paper",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ width: 250 }}>
            <Button variant="contained">{status}</Button>
          </CardContent>
          <Divider />
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Avatar>A</Avatar>
              <Typography>{title}</Typography>
            </Box>
            
            <Typography>{body}</Typography>
          </CardContent>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Paper sx={{ width: 120, height: 120 }}>HI</Paper>
          </CardContent>
        </Box>
      </Box>
    </Card>
  );
};
export default IssueBox;
