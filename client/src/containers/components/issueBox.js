import {
  Card,
  Typography,
  CardContent,
  Button,
  Box,
  Paper,
  Avatar,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SquareIcon from "@mui/icons-material/Square";
import { updateStatus } from "../../hooks/issueContext";

import { useState, useEffect } from "react";
const IssueBox = ({ data, title, status, body, setIssues}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  
  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }


  
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
        <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
          <CardContent sx={{ width: 500, p: 0 }}>
            <Button variant="outlined" onClick={handleClick}>
              {status}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem
                sx={{ color: "gray" }}
                onClick={async () => {
                  setAnchorEl(null);
                  const d = await updateStatus({...data, state: 'open'})
                  setIssues(prev=>{return {...prev, data}})
                }}
              >
                <SquareIcon fontSize="small" /> Open
              </MenuItem>
              <MenuItem
                sx={{ color: "red" }}
                onClick={async () => {
                  setAnchorEl(null);
                  const d = await updateStatus({...data, state: 'open'});
                  setIssues(prev=>{return {...prev, data}})
                }}
              >
                <SquareIcon fontSize="small" />
                In Progress
              </MenuItem>
              <MenuItem
                sx={{ color: "green" }}
                onClick={async () => {
                  setAnchorEl(null);
                  const d = await updateStatus({...data, state: 'closed'})
                  setIssues(prev=>{return {...prev, data}})
                }}
              >
                <SquareIcon fontSize="small" />
                Done
              </MenuItem>
            </Menu>
          </CardContent>

          <CardContent sx={{ p: 1 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Avatar>A</Avatar>
              <Typography variant="h6">{title}</Typography>
            </Box>

            <Typography sx={{ p: 1 }} variant="body1">
              {body}
            </Typography>
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
            <Paper
              sx={{
                width: 120,
                height: 120,
                alignItems: "start",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Button
                size="medium"
                startIcon={<EditIcon />}
                sx={{ color: "gray" }}
              >
                Edit
              </Button>
              <Button
                size="medium"
                startIcon={<DeleteIcon />}
                sx={{ color: "red" }}
              >
                Delete
              </Button>
            </Paper>
          </CardContent>
        </Box>
      </Box>
    </Card>
  );
};
export default IssueBox;
