import React, { useState, useEffect } from 'react';
import { IconButton, Typography, Button, Card, CardContent, CardActions, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import StatusUpdate from './StatusUpdate'; // Assuming this is a component for adding/editing status updates
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const StatusUpdatePage = () => {
  // State variables for managing status updates and UI states
  const [openStatusUpdate, setOpenStatusUpdate] = useState(false);
  const [statusUpdates, setStatusUpdates] = useState([]); // Array to hold status updates
  const [editStatusUpdate, setEditStatusUpdate] = useState(null); // To track the status update being edited
  const [selectedMonth, setSelectedMonth] = useState(''); // State for selected month filter
  const [selectedYear, setSelectedYear] = useState(''); // State for selected year filter
  const [sortBy, setSortBy] = useState('timestamp'); // Default sorting by timestamp
  const [sortOrder, setSortOrder] = useState('desc'); // Default sorting order

  // Function to open the status update dialog
  const handleOpenStatusUpdate = () => setOpenStatusUpdate(true);
  
  // Function to close the status update dialog
  const handleClose = () => {
    setOpenStatusUpdate(false);
    setEditStatusUpdate(null); // Reset editStatusUpdate to clear the form fields
  };

  // Fetch status updates from the server
  useEffect(() => {
    fetchStatusUpdates();
  }, [openStatusUpdate]); // Trigger refetch when openStatusUpdate changes

  const fetchStatusUpdates = async () => {
    try {
      const response = await axios.get('http://localhost:8080/workout-status-updates/user/1234');
      setStatusUpdates(response.data);
    } catch (error) {
      console.error('Error fetching status updates:', error);
    }
  };

  // Function to handle editing a status update
  const handleEditStatusUpdate = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/workout-status-updates/${id}`);
      const statusUpdateData = response.data;
      setEditStatusUpdate(statusUpdateData); // Set the status update to be edited
      setOpenStatusUpdate(true); // Open the status update dialog
    } catch (error) {
      console.error('Error fetching status update:', error);
    }
  };

  // Function to handle deleting a status update
  const handleDeleteStatusUpdate = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/workout-status-updates/${id}`);
      setStatusUpdates(prevStatusUpdates => prevStatusUpdates.filter(update => update.id !== id)); // Remove the deleted status update from the list
    } catch (error) {
      console.error('Error deleting status update:', error);
    }
  };

  // Function to handle saving the status update
  const handleSaveStatus = async () => {
    // Perform save operation
    
    // Reset editStatusUpdate to clear the form fields
    setEditStatusUpdate(null);
  
    // After successfully saving the status, close the dialog
    handleClose();
  };

  // Function to filter status updates based on selected month and year
  const filterStatusUpdates = (updates) => {
    if (selectedMonth === '' || selectedYear === '') {
      return updates;
    } else {
      return updates.filter(update => {
        const updateDate = new Date(update.timestamp);
        return updateDate.getMonth() + 1 === selectedMonth && updateDate.getFullYear() === selectedYear;
      });
    }
  };

  // Sorting function for sorting status updates
  const sortStatusUpdates = (updates) => {
    const sortedUpdates = [...updates].sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      if (dateA.getTime() !== dateB.getTime()) {
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      } else {
        return sortOrder === 'desc' ? b.timestamp.localeCompare(a.timestamp) : a.timestamp.localeCompare(b.timestamp);
      }
    });
    return sortedUpdates;
  };
  
  return (
    <div className="status-update-page">
      {/* Header section */}
      <div className="status-update-header">
        <Typography variant="h4" gutterBottom>Workout Status Updates</Typography>
        <Grid container spacing={2} alignItems="center">
          {/* Filter controls */}
          <Grid item xs={12} sm={6}>
            <div style={{ display: 'flex' }}>
              <FormControl sx={{ marginRight: '16px' }}>
                <InputLabel id="month-select-label">Month</InputLabel>
                <Select
                  labelId="month-select-label"
                  id="month-select"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  {/* Render month options */}
                  {Array.from({ length: 12 }, (_, i) => (
                    <MenuItem key={i + 1} value={i + 1}>{new Date(2000, i).toLocaleString('default', { month: 'long' })}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel id="year-select-label">Year</InputLabel>
                <Select
                  labelId="year-select-label"
                  id="year-select"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  {/* Render year options */}
                  {Array.from({ length: 10 }, (_, i) => (
                    <MenuItem key={2022 + i} value={2022 + i}>{2022 + i}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </Grid>
          {/* Sorting controls */}
          <Grid item xs={12} sm={6}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <FormControl sx={{ marginRight: '16px' }}>
                <InputLabel id="sort-by-label">Sort By</InputLabel>
                <Select
                  labelId="sort-by-label"
                  id="sort-by-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <MenuItem value="timestamp">Date</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel id="sort-order-label">Sort Order</InputLabel>
                <Select
                  labelId="sort-order-label"
                  id="sort-order-select"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <MenuItem value="asc">Ascending</MenuItem>
                  <MenuItem value="desc">Descending</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Grid>
        </Grid>
        {/* Button to add status update */}
        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleOpenStatusUpdate} variant='contained' sx={{ borderRadius: "20px", bgcolor: '#20207D', color: '#fff' }}>Add Status Update</Button>
        </div>
      </div>
      {/* List of status updates */}
      <div className="status-update-list" style={{ marginTop: '16px' }}>
        {sortStatusUpdates(filterStatusUpdates(statusUpdates)).map((update, index) => (
          <div key={update.id} style={{ marginBottom: index < statusUpdates.length - 1 ? '16px' : 0 }}>
            <Card elevation={4}>
              <CardContent>
                {/* Display status update details */}
                <Typography variant="h6" gutterBottom>{update.description}</Typography>
                <Typography variant="body1" gutterBottom><strong>Distance:</strong> {update.metrics.distance}</Typography>
                <Typography variant="body1" gutterBottom><strong>Sets:</strong> {update.metrics.sets}</Typography>
                <Typography variant="body1" gutterBottom><strong>Time:</strong> {update.metrics.time}</Typography>
                <Typography variant="body2" gutterBottom><strong>Date:</strong> {new Date(update.timestamp).toLocaleString()}</Typography>
              </CardContent>
              {/* Action buttons */}
              <CardActions>
                <IconButton onClick={() => handleEditStatusUpdate(update.id)} style={{ color: '#1976D2' }}><EditIcon /></IconButton>
                <IconButton onClick={() => handleDeleteStatusUpdate(update.id)} color="error"><DeleteIcon /></IconButton>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
      {/* Status update dialog */}
      <StatusUpdate open={openStatusUpdate} handleClose={handleClose} initialValues={editStatusUpdate} isEditing={Boolean(editStatusUpdate)} onSave={handleSaveStatus} />
    </div>
  );
};

export default StatusUpdatePage;
