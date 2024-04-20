import React, { useState } from 'react'
import { Button } from '@mui/material'
import WorkoutPlan from '../WorkoutPlan/WorkoutPlan';

const WorkoutPlanPage = () => {

    const [openWorkoutPlan, setOpenWorkoutPlan] = useState(false);
    const handleOpenWorkoutPlan = () => setOpenWorkoutPlan(true);
    const handleClose = () => setOpenWorkoutPlan(false);

    return (
        <div>
            <section>
                <div className='flex justify-end items-start mt-5 h-[5rem]'>
                    <section>
                        <WorkoutPlan handleClose={handleClose} open={openWorkoutPlan} />
                    </section>
                    <Button
                        onClick={handleOpenWorkoutPlan}
                        variant='contained'
                        sx={{ borderRadius: "20px", bgcolor: '#20207D', ml: 'auto' }}>
                        Add Workout Plan
                    </Button>
                </div>
            </section>
        </div>


    )
}

export default WorkoutPlanPage