import React, { useState } from 'react'
import { Button } from '@mui/material'
import MealPlan from '../MealPlan/MealPlan';

const MealPlanPage = () => {

    const [openMealPlan, setOpenMealPlan] = useState(false);
    const handleOpenMealPlan = () => setOpenMealPlan(true);
    const handleClose = () => setOpenMealPlan(false);

    return (
        <div>
            <section>
                <div className='flex justify-end items-start mt-5 h-[5rem]'>
                    <section>
                        <MealPlan handleClose={handleClose} open={openMealPlan} />
                    </section>
                    <Button
                        onClick={handleOpenMealPlan}
                        variant='contained'
                        sx={{ borderRadius: "20px", bgcolor: '#20207D', ml: 'auto' }}>
                        Add Meal Plan
                    </Button>
                </div>
            </section>
        </div>


    )
} 

export default MealPlanPage