import * as React from "react";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import ListAltIcon from "@mui/icons-material/ListAlt";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

// Component for rendering button navigation bar
// Takes a prop called setFilter to update the filter state
export default function ButtonNav({ setFilter }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > *": {
          m: 1, // Adds margin to all direct child elements of Box component
        },
      }}
    >
      <ButtonGroup variant="outlined">
        {/* Button to display all items */}
        <Button onClick={() => setFilter(0)}>
          <FormatListBulletedIcon /> All
        </Button>
        {/* Button to display open items */}
        <Button onClick={() => setFilter(1)}>
          <AssignmentLateIcon />
          Open
        </Button>
        {/* Button to display items in progress */}
        <Button onClick={() => setFilter(2)}>
          <ListAltIcon />
          In Progress
        </Button>
        {/* Button to display completed items */}
        <Button
          onClick={() => {
            setFilter(3);
          }}
        >
          <TaskAltIcon />
          Done
        </Button>
      </ButtonGroup>
    </Box>
  );
}
