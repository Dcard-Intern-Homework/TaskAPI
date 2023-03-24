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
  Modal,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SquareIcon from "@mui/icons-material/Square";
import { updateStatus } from "../../hooks/issueContext";

import { useState, useEffect } from "react";
const IssueBox = ({ data, title, status, body, labels }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [state, setState] = useState(labels[0] ? labels[0].name : "Open");
  const [editTitle, setEditTitle] = useState(title);
  const [editBody, setEditBody] = useState(body);
  const [editing, setEditing] = useState(false);
  const [deleted, setDeleted] = useState(status === "closed");
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = useState(false);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }

  return deleted ? (
    <></>
  ) : (
    <Card
      sx={{
        display: "flex",
        bgcolor: "background.paper",
        alignItems: "center",
        margin: 2,
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
                  updateStatus({ ...data, labels: ["Open"] });
                  setState("Open");
                }}
              >
                <SquareIcon fontSize="small" /> Open
              </MenuItem>
              <MenuItem
                sx={{ color: "red" }}
                onClick={() => {
                  setAnchorEl(null);
                  updateStatus({ ...data, labels: ["In Progress"] });
                  setState("In Progress");
                }}
              >
                <SquareIcon fontSize="small" />
                In Progress
              </MenuItem>
              <MenuItem
                sx={{ color: "green" }}
                onClick={() => {
                  setAnchorEl(null);
                  updateStatus({ ...data, labels: ["Done"] });
                  setState("Done");
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
                p: 1,
                height: 50,
              }}
            >
              <Avatar src={data.user.avatar_url}>A</Avatar>
              {editing ? (
                <TextField
                  variant="outlined"
                  value={editTitle}
                  onChange={(event) => {
                    setEditTitle(event.target.value);
                  }}
                />
              ) : (
                <Typography variant="h6">{editTitle}</Typography>
              )}
            </Box>
            {editing ? (
              <TextField
                variant="outlined"
                multiline
                value={editBody}
                fullWidth
                rows={3}
                onChange={(event) => {
                  setEditBody(event.target.value);
                }}
              />
            ) : (
              <Typography sx={{ p: 1 }} variant="body1">
                {editBody}
              </Typography>
            )}
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
                onClick={() => {
                  if (editing) {
                    updateStatus({ ...data, title: editTitle, body: editBody });
                  }
                  setEditing(!editing);
                }}
              >
                {editing ? "Complete" : "Edit"}
              </Button>
              <Button
                size="medium"
                startIcon={<DeleteIcon />}
                sx={{ color: "red" }}
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                Delete
              </Button>
              <Modal
                open={openModal}
                onClose={() => {
                  setOpenModal(false);
                }}
                BackdropProps={{ style: { backgroundColor: "white" } }}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  height: 150,
                  bgcolor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "5px",
                  boxShadow: 10,
                }}
              >
                <Box>
                  <Button
                    onClick={() => {
                      setDeleted(true);
                      updateStatus({ ...data, state: "closed" });
                      setOpenModal(false);
                    }}
                    variant="outlined"
                    color="error"
                    sx={{ m: 2 }}
                  >
                    Click to confirm
                  </Button>
                  <Button
                    onClick={() => {
                      setOpenModal(false);
                    }}
                    variant="outlined"
                    colo="primary"
                    sx={{ m: 2 }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Modal>
            </Paper>
          </CardContent>
        </Box>
      </Box>
    </Card>
  );
};
export default IssueBox;
