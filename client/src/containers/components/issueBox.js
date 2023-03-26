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
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { updateStatus } from "../../hooks/issueContext";

import { useState, useEffect } from "react";

function StateButton({ data, labels, state, setState }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }

  return (
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
  );
}

function TitleAndBody({ data, editTitle, editBody }) {
  return (
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
        <Avatar src={data.user.avatar_url}></Avatar>

        <Typography variant="h6">{editTitle}</Typography>
      </Box>
      <Typography sx={{ p: 1 }} variant="body1">
        {editBody}
      </Typography>
    </CardContent>
  );
}

const IssueBox = ({ data, filter }) => {
  const title = data.title;
  const status = data.state;
  const body = data.body;
  const labels = data.labels;

  const [editTitle, setEditTitle] = useState(title);
  const [editBody, setEditBody] = useState(body);
  const [editing, setEditing] = useState(false);
  const [deleted, setDeleted] = useState(status === "closed");
  const [state, setState] = useState(labels[0] ? labels[0].name : "Open");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  useEffect(() => {
    setState(labels[0].name);
    setEditTitle(title);
    setEditBody(body);
    setEditing(false);
    setDeleted(status === "closed");
  }, [filter]);

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
          <StateButton
            data={data}
            labels={labels}
            state={state}
            setState={setState}
          />
          <TitleAndBody data={data} editTitle={editTitle} editBody={editBody} />
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
                variant="outlined"
                startIcon={<EditIcon />}
                sx={{ color: "gray" }}
                onClick={() => {
                  setOpenEditModal(true);
                  setEditing(true);
                }}
              >
                Edit
              </Button>
              <Modal
                open={openEditModal}
                onClose={() => {
                  updateStatus({ ...data, title: editTitle, body: editBody });
                  setOpenEditModal(false);
                  setEditing(false);
                }}
                BackdropProps={{ style: { backgroundColor: "white" } }}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 500,
                  height: 300,
                  bgcolor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "5px",
                  boxShadow: 10,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexGrow: 1,
                    flexDirection: "column",
                    p: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 1,
                      p: 1,
                      height: 100,
                    }}
                  >
                    <Avatar src={data.user.avatar_url}></Avatar>
                    <TextField
                      onChange={(event) => {
                        setEditTitle(event.target.value);
                      }}
                      value={editTitle}
                    />
                  </Box>

                  <TextField
                    onChange={(event) => {
                      setEditBody(event.target.value);
                    }}
                    value={editBody}
                    multiline
                    rows={4}
                    fullWidth
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      m: 2,
                      p: 1,
                    }}
                  >
                    <Button
                      onClick={() => {
                        updateStatus({
                          ...data,
                          title: editTitle,
                          body: editBody,
                        });
                        setOpenEditModal(false);
                        setEditing(false);
                      }}
                      variant="outlined"
                    >
                      <CheckCircleOutlineIcon></CheckCircleOutlineIcon>Complete
                    </Button>
                  </Box>
                </Box>
              </Modal>

              <Button
                size="medium"
                startIcon={<DeleteIcon />}
                sx={{ color: "red" }}
                onClick={() => {
                  setOpenDeleteModal(true);
                }}
              >
                Delete
              </Button>
              <Modal
                open={openDeleteModal}
                onClose={() => {
                  setOpenDeleteModal(false);
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
                      setOpenDeleteModal(false);
                    }}
                    variant="outlined"
                    color="error"
                    sx={{ m: 2 }}
                  >
                    Click to confirm
                  </Button>
                  <Button
                    onClick={() => {
                      setOpenDeleteModal(false);
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
