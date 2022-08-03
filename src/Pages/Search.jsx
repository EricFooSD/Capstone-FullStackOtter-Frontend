/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Grid,
  Box,
  Container,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  Paper,
  Avatar,
  Typography,
} from '@mui/material';
import SearchBar from '../components/SearchBar.jsx';
import BACKEND_URL from '../supportFunctions.js';
import ProfileModalForSearch from '../components/ProfileModalForSearch.jsx';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'location', label: 'Location', minWidth: 100 },
  { id: 'accountType', label: 'Role', minWidth: 100 },
  { id: 'minSalary', label: 'Minimum Salary', minWidth: 100 },
  { id: 'portfolio', label: 'Portfolio', minWidth: 100 },
  {
    id: 'viewProfile', label: '', minWidth: 50,
  },
];

// ----------------------------------------------------------------------

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  async function getAllUsers() {
    try {
      const results = await axios.get(`${BACKEND_URL}/users`);
      const { data } = results;
      const currentArray = [];
      data.forEach((user) => {
        if (user.accountType === 'engineer') {
          currentArray.push(user);
        }
      });
      setUsers(currentArray);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  const filterData = (query, data) => {
    // if (!query) {
    //   return null;
    // }
    const searchResults = data.filter((user) => user.skills.find((skill) => skill.name.toLowerCase().includes(query)) || user.name.toLowerCase().includes(query));
    return searchResults;
  };

  const dataFiltered = filterData(searchQuery, users);

  return (
    <>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 4,
          pb: 1,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Search Users
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph>
            Search all engineers by name or skillset
          </Typography>
        </Container>
      </Box>
      <Box sx={{ margin: 2 }}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {' '}
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </Grid>
          </Grid>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 520 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow key="header-row">
                    <TableCell />
                    {TABLE_HEAD.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={users.indexOf(row)}>
                        <TableCell align="center">
                          <ProfileModalForSearch key={row.id} user={row} />
                        </TableCell>
                        <TableCell align="left" sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ margin: 1 }}>
                            <Avatar alt={row.name} src={row.profilePhoto} />
                          </Box>
                          <Box>
                            <Typography
                              noWrap
                              sx={{ fontWeight: 'bold' }}
                            >
                              {row.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="left">
                          {row.location}
                        </TableCell>
                        <TableCell align="left">
                          {row.accountType}
                        </TableCell>
                        <TableCell align="left">
                          $
                          {' '}
                          {row.minimumSalary}
                        </TableCell>
                        <TableCell align="left">
                          {row.portfolioUrl}
                        </TableCell>

                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              component="div"
              count={dataFiltered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Container>
      </Box>
    </>
  );
}
