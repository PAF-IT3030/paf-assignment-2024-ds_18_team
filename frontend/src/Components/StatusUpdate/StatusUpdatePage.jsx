// StatusUpdatePage.js
import React, { useState, useEffect } from 'react';
import { IconButton, Typography, Button, Card, CardContent, CardActions } from '@mui/material';
import StatusUpdate from './StatusUpdate';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const StatusUpdatePage = () => {
  const [openStatusUpdate, setOpenStatusUpdate] = useState(false);
  const [statusUpdates, setStatusUpdates] = useState([]);
  const [editStatusUpdate, setEditStatusUpdate] = useState(null);

  const handleOpenStatusUpdate = () => setOpenStatusUpdate(true);
  const handleClose = () => {
    setOpenStatusUpdate(false);
    setEditStatusUpdate(null);
  };

  useEffect(() => {
    const fetchStatusUpdates = async () => {
      try {
        const response = await axios.get('http://localhost:8080/workout-status-updates/user/1234');
        setStatusUpdates(response.data);
      } catch (error) {
        console.error('Error fetching status updates:', error);
      }
    };

    fetchStatusUpdates();
  }, []);
  const handleEditStatusUpdate = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/workout-status-updates/${id}`);
      const statusUpdateData = response.data;
      setEditStatusUpdate(statusUpdateData);
      setOpenStatusUpdate(true);
    } catch (error) {
      console.error('Error fetching status update:', error);
    }
  };

  const handleDeleteStatusUpdate = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/workout-status-updates/${id}`);
      setStatusUpdates(prevStatusUpdates => prevStatusUpdates.filter(update => update.id !== id));
    } catch (error) {
      console.error('Error deleting status update:', error);
    }
  };

  return (
    <div className="status-update-page">
      <div className="status-update-header">
        <Typography variant="h4" gutterBottom>Workout Status Updates</Typography>
        <div style={{ marginLeft: 'auto' }}>
          <Button onClick={handleOpenStatusUpdate} variant='contained' sx={{ borderRadius: "20px", bgcolor: '#20207D', color: '#fff', marginRight: '16px' }}>Add Status Update</Button>
        </div>
      </div>
      <div className="status-update-list" style={{ marginTop: '16px' }}>
        {statusUpdates.map((update, index) => (
          <div key={update.id} style={{ marginBottom: index < statusUpdates.length - 1 ? '16px' : 0 }}>
            <Card elevation={4}>
              <CardContent>
                <Typography variant="h6" gutterBottom>{update.description}</Typography>
                <Typography variant="body1" gutterBottom><strong>Distance:</strong> {update.metrics.distance}</Typography>
                <Typography variant="body1" gutterBottom><strong>Sets:</strong> {update.metrics.sets}</Typography>
                <Typography variant="body1" gutterBottom><strong>Time:</strong> {update.metrics.time}</Typography>
                <Typography variant="body2" gutterBottom><strong></strong> {new Date(update.timestamp).toLocaleString()}</Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleEditStatusUpdate(update.id)} style={{ color: '#1976D2' }}><EditIcon /></IconButton>
                <IconButton onClick={() => handleDeleteStatusUpdate(update.id)} color="error"><DeleteIcon /></IconButton>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
      <StatusUpdate open={openStatusUpdate} handleClose={handleClose} initialValues={editStatusUpdate} isEditing={Boolean(editStatusUpdate)} />
    </div>
  );
};

export default StatusUpdatePage;
