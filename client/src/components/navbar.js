import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Paper,
  InputBase,
  IconButton,
  Modal,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useIssueContext, createIssue } from "../hooks/issueContext";
import { useState } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
};

function CreateIssueButton() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { setIssues } = useIssueContext();
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [state, setState] = useState("Open");

  const handleCreateIssue = () => {
    if (body.length >= 30) {
      // Call createIssue function here to post issue to API
      handleClose();

      createIssue({ owner, repo, title, body, state }, setIssues);
    } else {
      alert("Title must be at least 30 characters.");
    }
  };

  return (
    <Box>
      <Button onClick={handleOpen} color="inherit" variant="outlined">
        Create Issue
      </Button>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Box sx={style}>
          <TextField
            label="Owner"
            id="outlined-size-small"
            value={owner}
            onChange={(ev) => {
              setOwner(ev.target.value);
            }}
            size="normal"
            sx={{ mb: 2 }}
            fullWidth
          />
          <TextField
            label="Repo"
            id="outlined-size-small"
            value={repo}
            onChange={(ev) => {
              setRepo(ev.target.value);
            }}
            size="normal"
            sx={{ mb: 2 }}
            fullWidth
          />
          <TextField
            label="Title"
            id="outlined-size-small"
            value={title}
            onChange={(ev) => {
              setTitle(ev.target.value);
            }}
            size="normal"
            sx={{ mb: 2 }}
            fullWidth
          />
          <TextField
            label="Body"
            id="outlined-size-small"
            value={body}
            onChange={(ev) => {
              setBody(ev.target.value);
            }}
            size="normal"
            sx={{ mb: 2 }}
            fullWidth
            multiline
            rows={4}
          />
          <FormControl sx={{ mb: 2 }}>
            <InputLabel id="demo-simple-select-label">State</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={state}
              onChange={(ev) => {
                setState(ev.target.value);
              }}
            >
              <MenuItem value={"Open"}>Open</MenuItem>
              <MenuItem value={"In Progress"}>In Progress</MenuItem>
              <MenuItem value={"Done"}>Done</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateIssue}
            >
              Complete
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

function SearchBar({}) {
  const { setSearch } = useIssueContext();
  const [input, setInput] = useState("");
  function handleSearch() {
    setSearch(input);
    setInput("");
  }
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 200,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search for issues..."
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        onClick={() => {
          handleSearch();
        }}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

function ColorModeButton({ colorMode, theme }) {
  return (
    <Box sx={{}}>
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Box>
  );
}

export default function NavBar({ handleLogOut, theme, colorMode }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <SearchBar></SearchBar>
          <CreateIssueButton></CreateIssueButton>
          <ColorModeButton
            theme={theme}
            colorMode={colorMode}
          ></ColorModeButton>
          <Button color="inherit" variant="outlined" onClick={handleLogOut}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
