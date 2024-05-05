import React, { useState, useEffect } from 'react';
import { Button, Modal, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import WorkoutPlan from '../WorkoutPlan/WorkoutPlan';
import WorkoutPlanDetails from './ViewWorkoutPlan';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditWorkoutPlanForm from './EditWorkoutPlan';

const WorkoutPlanPage = () => {
    const [workoutPlans, setWorkoutPlans] = useState([]);
    const [openAddWorkoutPlan, setOpenAddWorkoutPlan] = useState(false);
    const [openWorkoutPlanDetails, setOpenWorkoutPlanDetails] = useState(false);
    const [selectedWorkoutPlan, setSelectedWorkoutPlan] = useState(null);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [workoutToDelete, setWorkoutToDelete] = useState(null);

    const handleOpenAddWorkoutPlan = () => setOpenAddWorkoutPlan(true);
    const handleCloseAddWorkoutPlan = () => setOpenAddWorkoutPlan(false);
    const handleCloseWorkoutPlanDetails = () => setOpenWorkoutPlanDetails(false);
    const handleCloseEditForm = () => setOpenEditForm(false);

    const fetchWorkoutPlans = async () => {
        try {
            const response = await fetch('http://localhost:8081/workoutPlans');
            if (response.ok) {
                const data = await response.json();
                setWorkoutPlans(data);
            } else {
                console.error('Failed to fetch workout plans');
            }
        } catch (error) {
            console.error('Error fetching workout plans:', error);
        }
    };

    useEffect(() => {
        fetchWorkoutPlans();
    }, []);

    const handleWorkoutPlanClick = (workoutPlan) => {
        setSelectedWorkoutPlan(workoutPlan);
        setOpenWorkoutPlanDetails(true);
    };

    const handleDeleteWorkoutPlan = (workoutPlan) => {
        setWorkoutToDelete(workoutPlan);
        setDeleteDialogOpen(true);
    };

    const confirmDeleteWorkoutPlan = async () => {
        try {
            const response = await fetch(`http://localhost:8081/workoutPlans/${workoutToDelete.workoutPlanId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setWorkoutPlans(prevState => prevState.filter(wp => wp.workoutPlanId !== workoutToDelete.workoutPlanId));
                console.log('Workout plan deleted successfully');
            } else {
                console.error('Failed to delete workout plan');
            }
        } catch (error) {
            console.error('Error deleting workout plan:', error);
        }
        setDeleteDialogOpen(false);
    };

    const handleEditWorkoutPlan = (workoutPlan) => {
        setSelectedWorkoutPlan(workoutPlan);
        setOpenEditForm(true);
    };

    const handleUpdateWorkoutPlan = async (updatedWorkoutPlan) => {
        try {
            const response = await fetch(`http://localhost:8081/workoutPlans/${updatedWorkoutPlan.workoutPlanId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedWorkoutPlan),
            });
            if (response.ok) {
                const updatedPlans = workoutPlans.map(wp =>
                    wp.workoutPlanId === updatedWorkoutPlan.workoutPlanId ? updatedWorkoutPlan : wp
                );
                setWorkoutPlans(updatedPlans);
                console.log('Workout plan updated successfully');
            } else {
                console.error('Failed to update workout plan');
            }
        } catch (error) {
            console.error('Error updating workout plan:', error);
        }
    };

    return (
        <div>
            {/* Add Workout Plan Button */}
            <section>
                <div className='flex justify-end items-start mt-5 h-[5rem]'>
                    <Button
                        onClick={handleOpenAddWorkoutPlan}
                        variant='contained'
                        sx={{ borderRadius: "20px", bgcolor: '#20207D', ml: 'auto' }}>
                        Add Workout Plan
                    </Button>
                </div>
            </section>

            {/* Display Workout Plans */}
            <section>
                <div className='flex flex-col mt-5'>
                    {workoutPlans.map((workoutPlan, index) => (
                        <div key={index} style={{ marginBottom: '20px', position: 'relative' }}>
                            <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleWorkoutPlanClick(workoutPlan)}>
                                <Typography variant="h6" gutterBottom color='primary'>{workoutPlan.workoutPlanName}</Typography>
                                <Typography variant="body1" gutterBottom>Description: {workoutPlan.description}</Typography>
                                <Typography variant="body1" gutterBottom>Intensity: {workoutPlan.intensity}</Typography>
                                <Typography variant="body1" gutterBottom>Routine: {workoutPlan.routine}</Typography>
                            </div>
                            <div style={{ position: 'absolute', top: '0', right: '0' }}>
                                <IconButton onClick={() => handleEditWorkoutPlan(workoutPlan)} variant="outlined" color="primary">
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDeleteWorkoutPlan(workoutPlan)} variant="outlined" color="primary">
                                    <DeleteIcon />
                                </IconButton>
                                {/*<IconButton onClick={() => handleShareWorkoutPlan(workoutPlan)} variant="outlined" color="primary">
                                    <ShareIcon />
                                </IconButton>*/}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Modals */}
            <Modal
                open={openAddWorkoutPlan}
                onClose={handleCloseAddWorkoutPlan}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <WorkoutPlan handleClose={handleCloseAddWorkoutPlan} open={openAddWorkoutPlan} />
            </Modal>

            <Modal
                open={openWorkoutPlanDetails}
                onClose={handleCloseWorkoutPlanDetails}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <WorkoutPlanDetails workoutPlan={selectedWorkoutPlan} handleClose={handleCloseWorkoutPlanDetails} />
            </Modal>

            <Modal
                open={openEditForm}
                onClose={handleCloseEditForm}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <EditWorkoutPlanForm workoutPlan={selectedWorkoutPlan} handleClose={handleCloseEditForm} handleUpdate={handleUpdateWorkoutPlan} />
            </Modal>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this workout plan?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDeleteWorkoutPlan} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Share Confirmation Dialog 
            <Dialog
                open={shareDialogOpen}
                onClose={() => setShareDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirm Share</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to share this workout plan?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShareDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmShareWorkoutPlan} color="primary" autoFocus>
                        Share
                    </Button>
                </DialogActions>
            </Dialog>*/}
        </div>
    );
};

export default WorkoutPlanPage;
