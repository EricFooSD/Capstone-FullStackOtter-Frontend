/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

// =================  IMPORT =========================>
import React, { forwardRef, useState } from 'react';
import {
  Button, ListItemIcon, ListItemText, Tooltip, Dialog, Divider, AppBar, Toolbar, IconButton, Typography, Slide,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Board from 'react-trello';
import axios from 'axios';
import Iconify from '../../SupportComponents/Iconify.jsx';
import BACKEND_URL from '../../../supportFunctions.js';
// ====================================================>

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function SingleProjectKanbanModal({
  projectId, name, data, setJustSubmitted,
}) {
  // .......... STATES ............ //
  const [open, setOpen] = useState(false);
  const [currentKanbanData, setCurrentKanbanData] = useState(data);

  // .......... HELPER FUNCTIONS ............ //
  async function updateKanban() {
    try {
      const currentKanbanDataObject = {
        id: projectId,
        kanbanData: currentKanbanData,
      };
      const updatedKanbanQuery = await axios.put(`${BACKEND_URL}/project/update-kanban/${projectId}`, currentKanbanDataObject);
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
    setCurrentKanbanData(newData);
  };

  // .......... COMPONENT .......... //

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
          <Board style={{ backgroundColor: '#4E9258' }} data={data} editable onDataChange={handleKanbanChanges} />
        </AppBar>
      </Dialog>
    </div>
  );
}
