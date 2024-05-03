import React, { useState, useEffect } from 'react';
import { Button, Typography, IconButton, Card, CardContent, CardActions } from '@mui/material';
import StatusUpdate from '../StatusUpdate/StatusUpdate';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import './StatusUpdate.css'; // Import the CSS file

const StatusUpdatePage = () => {
    const [openStatusUpdate, setOpenStatusUpdate] = useState(false);
    const [statusUpdates, setStatusUpdates] = useState([]);

    const handleOpenStatusUpdate = () => setOpenStatusUpdate(true);
    const handleClose = () => setOpenStatusUpdate(false);

    useEffect(() => {
        // Fetch status updates from the backend API
        const fetchStatusUpdates = async () => {
            try {
                const response = await axios.get('http://localhost:8080/workout-status-updates/user/67473');
                setStatusUpdates(response.data);
            } catch (error) {
                console.error('Error fetching status updates:', error);
            }
        };

        fetchStatusUpdates();
    }, []);

    const handleDeleteStatusUpdate = async (id) => {
        try {
            // Send DELETE request to backend API to delete the status update
            await axios.delete(`http://localhost:8080/workout-status-updates/${id}`);
            // Update the status updates list after deletion
            setStatusUpdates((prevStatusUpdates) => prevStatusUpdates.filter((update) => update.id !== id));
        } catch (error) {
            console.error('Error deleting status update:', error);
        }
    };

    return (
        <div className="status-update-page">
            <div className="status-update-header">
                <Typography variant="h4" gutterBottom>Workout Status Updates</Typography>
                <div style={{ marginLeft: 'auto' }}>
                    <Button
                        onClick={handleOpenStatusUpdate}
                        variant='contained'
                        sx={{ borderRadius: "20px", bgcolor: '#20207D', color: '#fff', marginRight: '16px' }}>
                        Add Status Update
                    </Button>
                </div>
            </div>
            <div className="status-update-list" style={{ marginTop: '16px' }}>
                {statusUpdates.map((update, index) => (
                    <div key={update.id} style={{ marginBottom: index < statusUpdates.length - 1 ? '16px' : 0 }}>
                        <Card className="status-update-card" elevation={4}>
                            <CardContent sx={{ padding: '16px' }}>
                                <Typography variant="h6" gutterBottom>{update.description}</Typography>
                                <Typography variant="body1" gutterBottom><strong>Distance:</strong> {update.metrics.distance}</Typography>
                                <Typography variant="body1" gutterBottom><strong>Sets:</strong> {update.metrics.sets}</Typography>
                                <Typography variant="body1" gutterBottom><strong>Time:</strong> {update.metrics.time}</Typography>
                                <Typography variant="body2" gutterBottom><strong>Timestamp:</strong> {new Date(update.timestamp).toLocaleString()}</Typography>
                            </CardContent>
                            <CardActions sx={{ padding: '8px' }}>
                                <IconButton onClick={() => handleDeleteStatusUpdate(update.id)} color="error">
                                    <DeleteIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </div>
                ))}
            </div>
            <StatusUpdate handleClose={handleClose} open={openStatusUpdate} />
        </div>
    );
};

export default StatusUpdatePage;
