import React from 'react';
import { Container, Typography, Paper, styled } from '@mui/material';
import { useLocation } from 'react-router-dom';
import ExerciseCard from './ExerciseCard';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  whiteSpace: 'pre-line',
  background: '#f8f8f8',
  padding: theme.spacing(2),
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#5D4361',
  marginBottom: theme.spacing(2),
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
}));

const Workout = () => {
  const location = useLocation();
  const { workoutPlan } = location.state;
  //parsing of JSON data present in workoutPlan into a JS object.
  const exercisesData = JSON.parse(workoutPlan);

  return (
    <StyledContainer maxWidth="md">
      <StyledTypography variant="h4" align='center'>Your Personalized Workout Plan</StyledTypography>
      <StyledPaper>
        {exercisesData.exercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </StyledPaper>
    </StyledContainer>
  );
};

export default Workout;