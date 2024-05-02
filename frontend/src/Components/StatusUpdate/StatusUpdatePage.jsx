import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import StatusUpdate from '../StatusUpdate/StatusUpdate';
import axios from 'axios';

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
        <div>
            <section>
                <div className='flex justify-end items-start mt-5 h-[5rem]'>
                    <section>
                        <StatusUpdate handleClose={handleClose} open={openStatusUpdate} />
                    </section>
                    <Button
                        onClick={handleOpenStatusUpdate}
                        variant='contained'
                        sx={{ borderRadius: "20px", bgcolor: '#20207D', ml: 'auto' }}>
                        Add Status Update
                    </Button>
                </div>
            </section>
            <section className="status-update-list">
                <Typography variant="h5" gutterBottom>Status Updates</Typography>
                {statusUpdates.map((update) => (
                    <div key={update.id} className="status-update">
                        <Typography variant="body1" gutterBottom>Description: {update.description}</Typography>
                        <Typography variant="body1" gutterBottom>Distance: {update.metrics.distance}</Typography>
                        <Typography variant="body1" gutterBottom>Sets: {update.metrics.sets}</Typography>
                        <Typography variant="body1" gutterBottom>Time: {update.metrics.time}</Typography>
                        <Typography variant="body1" gutterBottom>Timestamp: {update.timestamp}</Typography>
                        <Button onClick={() => handleDeleteStatusUpdate(update.id)} variant="outlined" color="error">Delete</Button>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default StatusUpdatePage;
