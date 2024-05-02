import React, { useState } from 'react';
import { Button } from '@mui/material';
import StatusUpdate from '../StatusUpdate/StatusUpdate';

const StatusUpdatePage = () => {
    const [openStatusUpdate, setOpenStatusUpdate] = useState(false);

    const handleOpenStatusUpdate = () => setOpenStatusUpdate(true);
    const handleClose = () => setOpenStatusUpdate(false);

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
        </div>
    );
};

export default StatusUpdatePage;
