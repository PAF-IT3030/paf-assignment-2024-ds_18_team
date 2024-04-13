import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { TextField } from '@mui/material';

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

export default function WorkoutPlan({ open, handleClose }) {

  const handleSubmit = (values) => {
    console.log("handle submit", values)
  }

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      intensity: "",
      routine: "",
      exercises: [{ name: "", sets: "", reps: "" }], // Initialize exercises array with an empty object
      duration: "",
      notes: ""
    },
    onSubmit: handleSubmit
  });

  const addExerciseField = () => {
    formik.setValues(prevState => ({
      ...prevState,
      exercises: [...prevState.exercises, { name: "", sets: "", reps: "" }]
    }));
  };

  const handleExerciseChange = (index, field, value) => {
    const exercises = [...formik.values.exercises];
    exercises[index][field] = value;
    formik.setValues({ ...formik.values, exercises });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <IconButton onClick={handleClose} aria-label='delete'>
                  <CloseIcon />
                </IconButton>
                <p className=''>Add Workout Plan</p>
              </div>
              <Button type='submit'>Save</Button>
            </div>
            <div className='hideScrollBar overflow-y-scroll overflow-x-hidden h-[80vh]'>
              <div className='space-y-6 mt-4'>
                <TextField
                  fullWidth
                  id="title"
                  name="title"
                  label="Title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  required
                />
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  id="description"
                  name="description"
                  label="Description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  required
                />

                <div style={{ marginBottom: '60px' }}></div>

                <div className="flex space-x-4">
                  <div className="form-group" style={{ marginRight: '80px' }}>
                    <label htmlFor="intensity"><strong>Intensity Level:   </strong></label>
                    <select
                      id="intensity"
                      name="intensity"
                      value={formik.values.intensity}
                      onChange={formik.handleChange}
                      required
                    >
                      <option value="">Select Intensity</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="routine"><strong>Routine:   </strong></label>
                    <select
                      id="routine"
                      name="routine"
                      value={formik.values.routine}
                      onChange={formik.handleChange}
                      required
                    >
                      <option value="">Select Routine</option>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '50px' }}></div>

                <div id="exercises">
                  {formik.values.exercises.map((exercise, index) => (
                    <div key={index} className="form-group" style={{ marginBottom: '30px' }}>
                      <label htmlFor={`exercise${index + 1}`}><strong>{`Exercise ${index + 1}`}</strong></label>

                      <div style={{ marginBottom: '10px' }}></div>

                      <TextField
                        fullWidth
                        id={`exercise${index + 1}`}
                        name={`exercise${index}.name`}
                        value={formik.values.exercises[index].name}
                        onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                        label="Exercise Name"
                        required
                        style={{ marginBottom: '10px' }}
                      />
                      <div className="flex justify-between">
                        <TextField
                          id={`sets${index + 1}`}
                          name={`exercise${index}.sets`}
                          value={formik.values.exercises[index].sets}
                          onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
                          label="Sets"
                          required
                        />
                        <TextField
                          id={`reps${index + 1}`}
                          name={`exercise${index}.reps`}
                          value={formik.values.exercises[index].reps}
                          onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
                          label="Repetitions"
                          required
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  variant="outlined"
                  color="primary"
                  onClick={addExerciseField}
                >
                  Add Exercise
                </Button>

                <div style={{ marginBottom: '30px' }}></div>

                <TextField
                  fullWidth
                  id="duration"
                  name="duration"
                  label="Duration"
                  value={formik.values.duration}
                  onChange={formik.handleChange}
                  required
                />
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  id="notes"
                  name="notes"
                  label="Notes"
                  value={formik.values.notes}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
