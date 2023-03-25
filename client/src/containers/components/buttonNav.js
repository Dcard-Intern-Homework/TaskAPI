import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

export default function ButtonNav({filter, setFilter}) {
  

  return (
    <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <BottomNavigation
        showLabels
        value={filter}
        onChange={(event, newValue) => {
          setFilter(newValue);
        }}
        
      >
        <BottomNavigationAction label="Show All" icon={<FormatListBulletedIcon />} />
        <BottomNavigationAction label="Open" icon={<AssignmentLateIcon />} />
        <BottomNavigationAction label="In Progress" icon={<ListAltIcon />} />
        <BottomNavigationAction label="Done" icon={<TaskAltIcon />} />
      </BottomNavigation>
    </Box>
  );
}