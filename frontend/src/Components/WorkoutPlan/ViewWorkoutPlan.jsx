import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
    outline: "none",
    borderRadius: 4,
};

const WorkoutPlanDetails = ({ workoutPlan, handleClose }) => {
    return (
        <div>
            <Box sx={style}>
                <div className='hideScrollBar overflow-y-scroll overflow-x-hidden h-[80vh]'>
                    <div className='space-y-6 mt-4'>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Workout Plan Details
                        </Typography>
                        <Typography variant="body1">
                            <strong>Title:</strong> {workoutPlan.workoutPlanName}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Description:</strong> {workoutPlan.description}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Intensity Level:</strong> {workoutPlan.intensity}
                        </Typography>
                        <Typography variant="body1" style={{ marginBottom: '40px' }}>
                            <strong>Routine:</strong> {workoutPlan.routine}
                        </Typography>

                        <Typography variant="h5" gutterBottom>
                            Exercises
                        </Typography>
                        {workoutPlan.exercises.map((exercise, index) => (
                            <Box key={index} sx={{ mb: 2 }}>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Exercise {index + 1}:</strong> {exercise.name}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Sets:</strong> {exercise.sets}
                                </Typography>
                                <Typography variant="body1" gutterBottom style={{ marginBottom: '40px' }}>
                                    <strong>Repetitions:</strong> {exercise.reps}
                                </Typography>
                            </Box>
                        ))}
                        <Typography variant="body1" gutterBottom>
                            <strong>Duration:</strong> {workoutPlan.duration}
                        </Typography>
                        <Typography variant="body1" gutterBottom style={{ marginBottom: '80px' }}>
                            <strong>Notes:</strong> {workoutPlan.notes}
                        </Typography>
                        <Button onClick={handleClose} variant="contained" sx={{ bgcolor: '#20207D' }}>
                            Close
                        </Button>
                    </div>
                </div>
            </Box>
        </div>
    );
};

export default WorkoutPlanDetails;
