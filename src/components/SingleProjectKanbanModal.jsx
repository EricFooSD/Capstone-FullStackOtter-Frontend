/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {
  Button, ListItemIcon, ListItemText, Tooltip,
} from '@mui/material';
import Board from 'react-trello';
import axios from 'axios';
import Iconify from './Iconify.jsx';
import BACKEND_URL from '../supportFunctions.js';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function SingleProjectKanbanModal({
  projectId, name, data, setJustSubmitted,
}) {
  const [open, setOpen] = useState(false);
  const [currentKanbanData, setCurrentKanbanData] = useState(data);

  async function updateKanban() {
    try {
      const currentKanbanDataObject = {
        id: projectId,
        kanbanData: currentKanbanData,
      };
      console.log(currentKanbanDataObject);

      const updatedKanbanQuery = await axios.put(`${BACKEND_URL}/project/update-kanban/${projectId}`, currentKanbanDataObject);
      console.log(updatedKanbanQuery);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    updateKanban();
    setJustSubmitted(true);
    setOpen(false);
  };

  const handleKanbanChanges = (newData) => {
    console.log(newData);
    setCurrentKanbanData(newData);
  };

  return (
    <div>
      <Button color="success" onClick={handleClickOpen}>
        <ListItemIcon>
          <Iconify
            icon="ph:kanban-duotone"
            width={24}
            height={24}
          />
        </ListItemIcon>
        <ListItemText primary="Open Kanban" primaryTypographyProps={{ variant: 'body2' }} />
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <Tooltip title="Save and Close">
                <CloseIcon />
              </Tooltip>
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {name}
              {' '}
              Kanban
            </Typography>

          </Toolbar>
          <Divider />
          {/* {JSON.stringify(row.kanbanData)} */}
          <Board data={data} editable onDataChange={handleKanbanChanges} />
        </AppBar>

      </Dialog>
    </div>
  );
}
