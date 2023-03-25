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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useIssueContext } from "../hooks/issueContext";
import { useState } from "react";
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
};

function CreateIssueButton() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Button onClick={handleOpen} color="inherit" variant="outlined">Create Issue</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}

function SearchBar({}) {
  const { search, setSearch } = useIssueContext();
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
export default function NavBar({ handleLogOut }) {
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
          
          <Button color="inherit" variant="outlined" onClick={handleLogOut}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
