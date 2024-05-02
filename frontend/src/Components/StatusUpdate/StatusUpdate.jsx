import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { TextField } from '@mui/material';
import axios from 'axios';

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

export default function StatusUpdate({ open, handleClose }) {

  const handleSubmit = async (values) => {
    try {
      // Send POST request to backend API
      const response = await axios.post('http://localhost:8080/workout-status-updates', {
        userId: '12324', // Set the user ID here (e.g., from authentication)
        description: values.description,
        metrics: {
          distance: values.metrics.distance,
          sets: values.metrics.sets,
          time: values.metrics.time
        }
      });
      console.log('Workout status update created:', response.data);
      handleClose(); // Close the modal after successful submission
    } catch (error) {
      console.error('Error creating workout status update:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      description: "",
      metrics: {
        distance: "",
        sets: "",
        time: ""
      },
    },
    onSubmit: handleSubmit,
    validate: (values) => {
      const errors = {};
      // Validate metrics
      if (values.metrics.distance < 0) {
        errors.metrics = { ...errors.metrics, distance: 'Distance cannot be negative' };
      }
      if (values.metrics.sets < 0) {
        errors.metrics = { ...errors.metrics, sets: 'Sets cannot be negative' };
      }
      if (values.metrics.time < 0) {
        errors.metrics = { ...errors.metrics, time: 'Time cannot be negative' };
      }
      return errors;
    }
  });

  const handleMetricChange = (event, metricName) => {
    const { value } = event.target;
    formik.setValues((prevValues) => ({
      ...prevValues,
      metrics: {
        ...prevValues.metrics,
        [metricName]: Math.max(0, parseFloat(value)) // Ensure non-negative value
      }
    }));
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
                <p className=''>Add Status Update</p>
              </div>
              <Button type='submit'>Save</Button>
            </div>
            <div className='hideScrollBar overflow-y-scroll overflow-x-hidden h-[80vh]'>
              <div className='space-y-6 mt-4'>
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
                {/* Dynamically render metric fields */}
                {Object.keys(formik.values.metrics).map((metricName) => (
                  <TextField
                    key={metricName}
                    fullWidth
                    id={metricName}
                    name={`metrics.${metricName}`}
                    label={metricName === 'distance' ? 'Distance (km)' : metricName}
                    value={formik.values.metrics[metricName]}
                    onChange={(event) => handleMetricChange(event, metricName)}
                    required
                    type="number" // Assuming metrics are numeric
                    error={formik.touched.metrics && formik.errors.metrics && formik.errors.metrics[metricName]}
                    helperText={formik.touched.metrics && formik.errors.metrics && formik.errors.metrics[metricName]}
                  />
                ))}
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
