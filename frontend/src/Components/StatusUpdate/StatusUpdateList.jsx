import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import StatusUpdate from '../StatusUpdate/StatusUpdate';
import axios from 'axios';

const StatusUpdatePage = () => {
    const [openStatusUpdate, setOpenStatusUpdate] = useState(false);
    const [statusUpdates, setStatusUpdates] = useState([]);

    const handleOpenStatusUpdate = () => setOpenStatusUpdate(true);
    const handleClose = () => setOpenStatusUpdate(false);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('http://localhost:8080/workout-status-updates/user/12324');
            setStatusUpdates(response.data);
        }
        fetchData();
    }, []);

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `${formattedDate} ${formattedTime}`;
    };

    return (
        <div>
            <section>
                <div className='flex justify-end items-start mt-5 h-[5rem]'>
                    <section>
                        {statusUpdates.map((update) => (
                            <div key={update.id}>
                                <p>Description: {update.description}</p>
                                <p>Distance: {update.metrics.distance}</p>
                                <p>Sets: {update.metrics.sets}</p>
                                <p>Time: {update.metrics.time}</p>
                                <p>Timestamp: {formatTimestamp(update.timestamp)}</p>
                                <Button variant='contained' onClick={() => handleDelete(update.id)}>
                                    Delete
                                </Button>
                            </div>
                        ))}
                    </section>
                    <Button
                        onClick={handleOpenStatusUpdate}
                        variant='contained'
                        sx={{ borderRadius: "20px", bgcolor: '#20207D', ml: 'auto' }}>
                        Add Status Update
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default StatusUpdatePage;
