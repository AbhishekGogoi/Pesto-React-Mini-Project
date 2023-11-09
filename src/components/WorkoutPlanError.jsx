import React from 'react';
import Typography from '@mui/material/Typography';

const WorkoutPlanError = ({ message }) => {
  return (
    <Typography align='center' color="error" style={{ marginTop: '16px' }}>
      {message}
    </Typography>
  );
};

export default WorkoutPlanError;