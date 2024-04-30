import React, { useState } from 'react';
import { Button, TextField, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';

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

const EditWorkoutPlanForm = ({ workoutPlan, handleClose, handleUpdate }) => {
    const [editedWorkoutPlan, setEditedWorkoutPlan] = useState(workoutPlan);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedWorkoutPlan(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleExerciseChange = (index, field, value) => {
        const updatedExercises = [...editedWorkoutPlan.exercises];
        updatedExercises[index][field] = value;
        setEditedWorkoutPlan(prevState => ({
            ...prevState,
            exercises: updatedExercises
        }));
    };

    const handleAddExerciseField = () => {
        const newExercise = { name: '', sets: '', reps: '' };
        setEditedWorkoutPlan(prevState => ({
            ...prevState,
            exercises: [...prevState.exercises, newExercise]
        }));
    };

    const handleRemoveExerciseField = (index) => {
        const updatedExercises = [...editedWorkoutPlan.exercises];
        updatedExercises.splice(index, 1);
        setEditedWorkoutPlan(prevState => ({
            ...prevState,
            exercises: updatedExercises
        }));
    };

    const handleSubmit = () => {
        handleUpdate(editedWorkoutPlan);
        handleClose();
    };

    return (
        <div>
            <Box sx={style}>
                <div className='hideScrollBar overflow-y-scroll overflow-x-hidden h-[80vh]'>
                    <div className='space-y-6 mt-4'>
                        <TextField
                            name="workoutPlanName"
                            label="Workout Plan Name"
                            value={editedWorkoutPlan.workoutPlanName}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            name="description"
                            label="Description"
                            value={editedWorkoutPlan.description}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            name="intensity"
                            label="Intensity"
                            value={editedWorkoutPlan.intensity}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            name="routine"
                            label="Routine"
                            value={editedWorkoutPlan.routine}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <div id="exercises">
                            {editedWorkoutPlan.exercises.map((exercise, index) => (
                                <div key={index} className="form-group" style={{ marginBottom: '30px' }}>
                                    <div className="flex items-center justify-between mb-2">
                                        <label htmlFor={`exercise${index + 1}`}><strong>{`Exercise ${index + 1}`}</strong></label>
                                        <IconButton onClick={() => handleRemoveExerciseField(index)} aria-label="delete exercise" color="primary">
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                    <TextField
                                        fullWidth
                                        id={`exercise${index + 1}`}
                                        name={`exercises[${index}].name`}
                                        value={editedWorkoutPlan.exercises[index].name}
                                        onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                                        label="Exercise Name"
                                        required
                                        style={{ marginBottom: '10px' }}
                                    />
                                    <div className="flex justify-between">
                                        <TextField
                                            id={`sets${index + 1}`}
                                            name={`exercises[${index}].sets`}
                                            value={editedWorkoutPlan.exercises[index].sets}
                                            onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
                                            label="Sets"
                                            required
                                        />
                                        <TextField
                                            id={`reps${index + 1}`}
                                            name={`exercises[${index}].reps`}
                                            value={editedWorkoutPlan.exercises[index].reps}
                                            onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
                                            label="Repetitions"
                                            required
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button onClick={handleSubmit} variant="contained" sx={{ bgcolor: '#20207D' }}>
                            Save Changes
                        </Button>
                    </div>
                </div>
            </Box>
        </div>
    );
};

export default EditWorkoutPlanForm;
