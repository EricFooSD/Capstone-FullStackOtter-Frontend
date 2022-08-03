/* eslint-disable react/prop-types */
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SingleProjectModal from '../SingleProjectModal.jsx';

export default function DashboardGridRow({ row, setJustSubmitted }) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <Typography gutterBottom variant="h5" component="h2">
          {row.name}
        </Typography>

        <CardMedia
          component="img"
          sx={{
            // 16:9
            pt: '10.25%',
          }}
          image="https://source.unsplash.com/random"
          alt="random"
        />
        <CardContent sx={{ flexGrow: 1 }}>

          <Typography component="div" variant="h6">
            {row.user_projects.length}
            /
            {row.noEngineersRequired}
            {' '}
            Engineers Enrolled
          </Typography>
          <Typography component="div">
            Stage:
            {' '}
            {row.stage}
            <br />
            Delivery Deadline:
            {' '}
            {row.deliveryDeadline}
          </Typography>

        </CardContent>
        <CardActions>
          {/* <SingleProjectModal key={row.name} rowContent={row} setJustSubmitted={setJustSubmitted} /> */}
        </CardActions>
      </Card>
    </Grid>
  );
}
