import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css'
import {
  genderOptions,
  fitnessLevelOptions,
  targetMusclesOptions,
  durationOptions
} from '../utils';
import WorkoutPlanError from './WorkoutPlanError';

const HomePage = () => {
  const [userData, setUserData] = useState({
    age: '',
    gender: [],
    fitnessLevel: [],
    targetMuscles: [],
    duration: [],
  });

  const [workoutPlan, setWorkoutPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');


  const navigate = useNavigate();

  const openErrorDialog = (message) => {
    setDialogMessage(message);
    setOpenDialog(true);
  };

  const closeErrorDialog = () => {
    setOpenDialog(false);
  };


  const handleGenerateWorkoutPlan = async () => {

    if (
      !userData.age ||
      !/^\d+$/.test(userData.age) ||
      userData.gender.length === 0 ||
      userData.fitnessLevel.length === 0 ||
      userData.duration.length === 0
    ) {
      setError('Please fill out all the fields or provide a valid age!');
      setWorkoutPlan('');
      return;
    }


    setError('');

    setLoading(true);

    const TOKEN = 'YOUR_API_KEY';
    const topic = `give me a list of exercises, the number of sets,the number of reps and target muscles for each exercise for the following parameters in the form of a JSON schema ${JSON.stringify(userData)}`;

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        {
          prompt: topic,
          max_tokens: 3500,
          n: 1,
          stop: null,
          temperature: 0,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        },
        {
          headers: {
            'Authorization': `Bearer ${TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const responseData = response.data;
      setWorkoutPlan(responseData.choices[0].text);
      navigate('/workout', { state: { workoutPlan: responseData.choices[0].text } });
    } catch (error) {
      console.error('Error generating workout plan:', error);
      openErrorDialog('An error occurred while generating the workout plan.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className='home-page-container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Container maxWidth="sm">
        <Typography className='page-title' variant='h4' align='center' style={{ marginBottom: '16px' }}>AI Workout Generator</Typography>
        <TextField
          label="Age"
          fullWidth
          value={userData.age}
          onChange={(e) => setUserData({ ...userData, age: e.target.value })}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          style={{ marginBottom: '16px' }}
          className='text-field'
        />
        <Select
          options={genderOptions}
          value={userData.gender}
          onChange={(selected) => setUserData({ ...userData, gender: selected })}
          placeholder="Select Gender"
          styles={{ control: (provided) => ({ ...provided, marginBottom: '16px' }) }}
          className='select-field'
        />
        <Select
          options={fitnessLevelOptions}
          value={userData.fitnessLevel}
          onChange={(selected) => setUserData({ ...userData, fitnessLevel: selected })}
          placeholder="Select Fitness Level"
          styles={{ control: (provided) => ({ ...provided, marginBottom: '16px' }) }}
          className='select-field'
        />
        <Select
          options={targetMusclesOptions}
          isMulti
          value={userData.targetMuscles}
          onChange={(selected) => setUserData({ ...userData, targetMuscles: selected })}
          placeholder="Select Target Muscles"
          styles={{ control: (provided) => ({ ...provided, marginBottom: '16px' }) }}
          className='select-field'
        />
        <Select
          options={durationOptions}
          value={userData.duration}
          onChange={(selected) => setUserData({ ...userData, duration: selected })}
          placeholder="Select Duration"
          styles={{ control: (provided) => ({ ...provided, marginBottom: '16px' }) }}
          className='select-field'
        />
        <Button className='generate-button' variant="contained" color="primary" onClick={handleGenerateWorkoutPlan} style={{ display: 'block', margin: '0 auto', marginBottom: '16px' }}>
          Generate Workout Plan
        </Button>
        {loading && (
          <div className='loading-container' style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
            <CircularProgress />
          </div>
        )}
        {
          error && (<WorkoutPlanError message={error} />
          )
        }
      </Container>
      <Dialog open={openDialog} onClose={closeErrorDialog}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>{dialogMessage}</DialogContent>
        <DialogActions>
          <Button onClick={closeErrorDialog} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HomePage;
