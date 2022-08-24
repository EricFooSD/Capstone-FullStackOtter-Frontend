/* eslint-disable max-len */
/* eslint-disable react/prop-types */

// =================  IMPORT =========================>
import React, { useState } from 'react';
import {
  Box, Table, TableRow, TableBody, TableCell, TableContainer, TableHead, TablePagination, Paper, Avatar, Typography, Tooltip, Zoom,
} from '@mui/material';
import SingleProjectModal from './SingleProjectModal.jsx';
// ===================================================>

// .... Setting Chart Headers .... //
const TABLE_HEAD = [
  { id: 'name', label: 'Name', minWidth: 300 },
  { id: 'stage', label: 'Stage', minWidth: 100 },
  { id: 'enrollment', label: 'Enrollment', minWidth: 100 },
  { id: 'enrollmentDeadline', label: 'Enrollment Deadline', minWidth: 100 },
  { id: 'deliveryDeadline', label: 'Delivery Deadline', minWidth: 100 },
  { id: 'viewProfile', label: '', minWidth: 0 },
];

/**
 * @desc to convert date to desired formate
 * @param {string} date in ISO xs:dateTime format
 * @returns date in DDD, DD MMMM YYYY format
 */
const convertToDate = (date) => {
  const event = new Date(date);
  const dateOptions = {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
  };
  return event.toLocaleDateString(undefined, dateOptions);
};

export default function DashboardTable({
  type, data, setJustSubmitted, user,
}) {
  // .......... STATES ............ //
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // .......... HELPER FUNCTIONS ............ //
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let newData = [...data];

  // change data format depending on user
  if (type === 'completed' || type === 'current') {
    if (user.accountType === 'manager') {
      newData = [...data];
    } else {
      newData = [];
      data.forEach((obj) => newData.push(obj.project));
    }
  }

  /**
 * @desc return icon depending on stage of project
 * @param {string} stage stage that project is in
 * @returns icon source file
 */
  const getIconSrc = (stage) => {
    const allIcons = [{
      name: 'contracting', src: 'https://cdn-icons-png.flaticon.com/512/2666/2666501.png',
    },
    {
      name: 'sourcing', src: 'https://cdn-icons-png.flaticon.com/512/1466/1466848.png',
    },
    {
      name: 'in-progress', src: 'https://cdn-icons-png.flaticon.com/512/5695/5695864.png',
    },
    {
      name: 'client-review', src: 'https://cdn-icons-png.flaticon.com/512/792/792181.png',
    },
    {
      name: 'payment-pending', src: 'https://cdn-icons-png.flaticon.com/512/1019/1019607.png',
    },
    {
      name: 'completed', src: 'https://cdn-icons-png.flaticon.com/512/4698/4698094.png',
    },
    ];
    const icon = allIcons.find((o) => o.name === stage);
    return icon.src;
  };

  // .......... COMPONENT .......... //
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 520 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell />
              {TABLE_HEAD.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: 'bold', whiteSpace: 'nowrap' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {newData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover tabIndex={-1} key={row.id}>
                  <TableCell align="center">
                    <SingleProjectModal key={row.name} rowContent={row} setJustSubmitted={setJustSubmitted} />
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      sx={{ fontWeight: 'bold', maxWidth: 300 }}
                    >
                      {row.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ margin: 1 }}>
                      <Tooltip TransitionComponent={Zoom} title={row.stage} placement="top" arrow>
                        <Avatar alt={row.stage} src={getIconSrc(row.stage)} />
                      </Tooltip>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    {row.user_projects.length}
                    /
                    {row.noEngineersRequired}
                    {' '}
                    Engineers
                  </TableCell>
                  <TableCell align="left">
                    {convertToDate(row.enrolmentDeadline)}
                  </TableCell>
                  <TableCell align="left">
                    {convertToDate(row.deliveryDeadline)}
                  </TableCell>

                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={newData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
