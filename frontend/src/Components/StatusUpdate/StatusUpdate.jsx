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

export default function StatusUpdate({ open, handleClose }) {

  const handleSubmit = (values) => {
    console.log("handle submit", values)
  }

  const formik = useFormik({
    initialValues: {
      status: "",
      location: "",
      mood: "",
    },
    onSubmit: handleSubmit
  });

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
                  id="status"
                  name="status"
                  label="Status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  required
                />
                <TextField
                  fullWidth
                  id="location"
                  name="location"
                  label="Location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  required
                />
                <TextField
                  fullWidth
                  id="mood"
                  name="mood"
                  label="Mood"
                  value={formik.values.mood}
                  onChange={formik.handleChange}
                  required
                />
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
