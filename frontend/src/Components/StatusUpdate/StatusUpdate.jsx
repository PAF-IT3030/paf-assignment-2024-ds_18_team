import React from 'react';
import { Box, Button, Modal, TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useFormik } from 'formik';

const StatusUpdate = ({ open, handleClose, initialValues, isEditing }) => {
  // Function to handle form submission
  const handleSubmit = async (values) => {
    try {
      const requestData = {
        userId: '1234', // Replace '1234' with the actual user ID retrieved from your frontend
        description: values.description,
        metrics: {
          distance: values.metrics.distance,
          sets: values.metrics.sets,
          time: values.metrics.time
        }
      };

      if (isEditing) {
        // Send PUT request to update existing status update
        await axios.put(`http://localhost:8080/workout-status-updates/${initialValues.id}`, requestData);
        console.log('Workout status update updated');
      } else {
        // Send POST request to create new status update
        await axios.post('http://localhost:8080/workout-status-updates', requestData);
        console.log('Workout status update created');
      }
      handleClose(); // Close the dialog after successful submission
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Formik configuration for form handling and validation
  const formik = useFormik({
    initialValues: initialValues || {
      description: '',
      metrics: {
        distance: '',
        sets: '',
        time: ''
      },
    },
    onSubmit: handleSubmit,
    validate: (values) => {
      const errors = {};
      if (!values.description) {
        errors.description = 'Description is required';
      }
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

  return (
    <Modal open={open} onClose={handleClose}>
      {/* Modal content */}
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <form onSubmit={formik.handleSubmit}>
          <div className='flex items-center justify-between'>
            {/* Close button and title */}
            <div className='flex items-center space-x-3'>
              <IconButton onClick={handleClose} aria-label='delete'>
                <CloseIcon />
              </IconButton>
              <p className=''>{isEditing ? 'Edit Status Update' : 'Add Status Update'}</p>
            </div>
            {/* Submit button */}
            <Button type='submit'>{isEditing ? 'Update' : 'Save'}</Button>
          </div>
          {/* Form fields */}
          <div className='hideScrollBar overflow-y-scroll overflow-x-hidden h-[80vh]'>
            <div className='space-y-6 mt-4'>
              {/* Description field */}
              <TextField
                fullWidth
                multiline
                rows={4}
                id="description"
                name="description"
                label="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && formik.errors.description}
                helperText={formik.touched.description && formik.errors.description}
                required
              />
              {/* Dynamically render metric fields */}
              {Object.keys(formik.values.metrics).map((metricName) => (
                <TextField
                  key={metricName}
                  fullWidth
                  id={metricName}
                  name={`metrics.${metricName}`}
                  label={metricName === 'distance' ? 'Distance (km)' : metricName === 'time' ? 'Time (mins)' : metricName}
                  value={formik.values.metrics[metricName]}
                  onChange={(event) => formik.setFieldValue(`metrics.${metricName}`, Math.max(0, parseFloat(event.target.value)))}
                  error={formik.touched.metrics && formik.errors.metrics && formik.errors.metrics[metricName]}
                  helperText={formik.touched.metrics && formik.errors.metrics && formik.errors.metrics[metricName]}
                  required
                  type="number" // Assuming metrics are numeric
                />
              ))}
            </div>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default StatusUpdate;
