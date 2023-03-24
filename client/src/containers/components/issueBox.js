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
  TextField,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SquareIcon from "@mui/icons-material/Square";
import { updateStatus } from "../../hooks/issueContext";

import { useState, useEffect } from "react";
const IssueBox = ({ data, title, status, body, labels}) => {
  console.log(labels[0])
  const [anchorEl, setAnchorEl] = useState(null);
  const [state, setState] = useState(labels[0]?labels[0].name : "Open")
  const [editTitle, setEditTitle] = useState(title);
  const [editBody, setEditBody] = useState(body);
  const [editing, setEditing] = useState(false);

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
        margin: 2
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
              {state}
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
                onClick={() => {
                  setAnchorEl(null);
                  updateStatus({...data, labels: ['Open']})
                  setState('Open')
                }}
              >
                <SquareIcon fontSize="small" /> Open
              </MenuItem>
              <MenuItem
                sx={{ color: "red" }}
                onClick={() => {
                  setAnchorEl(null);
                  updateStatus({...data, labels: ['In Progress']});
                  setState('In Progress')
                }}
              >
                <SquareIcon fontSize="small" />
                In Progress
              </MenuItem>
              <MenuItem
                sx={{ color: "green" }}
                onClick={() => {
                  setAnchorEl(null);
                  updateStatus({...data, labels: ['Done']})
                  setState('Done')
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
                p:1,
                height: 50
              }}
            >
              <Avatar>A</Avatar>
              {editing?
              <TextField variant="outlined" value={editTitle} onChange={(event)=>{
                setEditTitle(event.target.value);
              }}/>
              :
              <Typography variant="h6">{editTitle}</Typography>}
            </Box>
              {
                editing? <TextField variant="outlined" multiline value={editBody} fullWidth rows={3}onChange={(event)=>{
                  setEditBody(event.target.value);
                }}/>
                :
                <Typography sx={{ p: 1 }} variant="body1">
              {editBody}
            </Typography>
                
              }
            
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
                onClick={()=>{
                  if(editing){
                    updateStatus({...data, title: editTitle, body: editBody})
                  }
                  setEditing(!editing);
                }}
              >
                {editing? 'Complete' : 'Edit'}
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
