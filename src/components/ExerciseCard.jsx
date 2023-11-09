import React from 'react';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import styled from '@mui/system/styled';

const StyledCard = styled(Card)(({ theme }) => ({
    margin: theme.spacing(2),
    background: 'linear-gradient(135deg, #F2F2F2 0%, #D3D3D3 100%)',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    transition: 'transform 0.2s',
    cursor: 'pointer',

    '&:hover': {
        transform: 'scale(1.03)',
    },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
}));

const ExerciseCard = ({ exercise }) => {
    return (
        <StyledCard>
            <StyledCardContent>
                <Typography variant="h6">Exercise Name: {exercise.name}</Typography>
                <Typography variant="body2">Duration: {exercise.duration}</Typography> 
                <Typography variant="body2">Fitness Level: {exercise.fitnessLevel}</Typography>
                {exercise.targetMuscles && (
                    <Typography variant="body2">
                        Target Muscles: {exercise.targetMuscles.map((muscle, index) => (
                            <Chip key={index} label={muscle} />
                        ))}
                    </Typography>
                )}
            </StyledCardContent>
        </StyledCard>
    );
};

export default ExerciseCard;