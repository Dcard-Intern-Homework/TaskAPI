import * as React from "react";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import ListAltIcon from "@mui/icons-material/ListAlt";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

export default function ButtonNav({ filter, setFilter }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > *": {
          m: 1,
        },
      }}
    >
      <ButtonGroup variant="outlined">
        <Button onClick={() => setFilter(0)}>
          <FormatListBulletedIcon /> All
        </Button>
        <Button onClick={() => setFilter(1)}>
          <AssignmentLateIcon />
          Open
        </Button>
        <Button onClick={() => setFilter(2)}>
          <ListAltIcon />
          In Progress
        </Button>
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
