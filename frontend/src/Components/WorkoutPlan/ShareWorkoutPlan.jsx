import React, { useEffect, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import axios from "axios";

const ShareWorkoutPlan = () => {
    const [workoutPlans, setWorkoutPlans] = useState([]);
    const [reFetch, setReFetch] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios("http://localhost:8081/workoutPlans");
                setWorkoutPlans(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [reFetch]);

    return (
        <div className="space-y-5" style={{ marginTop: "20px" }}>
            <section>
                <h1 className="py-5 text-xl font-bold opacity-90">Workout Plans</h1>
            </section>
            <section className={`pb-10`}>

                <div className="mt-10">


                    {workoutPlans?.map((workoutPlan) => {
                        return (
                            <div className="mt-2">
                                <div className="border flex-col border-gray-400 rounded-lg p-5 flex ">
                                    <div className="flex   items-center justify-between">
                                        <div className="flex items-center space-x-5">
                                            <Avatar
                                                alt="username"
                                                src="https://thumbs.dreamstime.com/b/icon-profile-circle-not-shadow-color-dark-blue-icon-profile-circle-not-shadow-color-dark-blue-background-194699290.jpg"
                                            />
                                            <div className="w-full">
                                                <p className="text-lg font-semibold opacity-90">
                                                    {workoutPlan.workoutPlanName}
                                                </p>
                                                <p className="text-sm font-semibold opacity-50">
                                                    {new Date(workoutPlan.dateTime).toDateString()}
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="mt-5 flex flex-col gap-3 ">
                                        <div className="font-semibold text-center text-xl ">
                                            <span className="font-semibold capitalize opacity-90 text-blue-900 unde">
                                                {workoutPlan.description}
                                            </span>
                                        </div>
                                        <div className="font-semibold text-center mt-5">
                                            Intensity : 
                                            <span className="font-semibold capitalize opacity-90 text-blue-900">
                                                {workoutPlan.intensity}
                                            </span>
                                        </div>
                                        <div className="font-semibold text-center" style={{ marginBottom: '30px' }}>
                                            Routine : 
                                            <span className="font-semibold capitalize opacity-90 text-blue-900">
                                                {workoutPlan.routine}
                                            </span>
                                        </div>
                                        <div className="font-semibold text-center" style={{ margin: '0 auto', maxWidth: '600px' }}>
                                            <span className="font-semibold capitalize opacity-90 text-blue-900 unde">
                                                Exercises : 
                                            </span>
                                            <div style={{ marginBottom: '30px' }}></div>
                                            <div style={{ textAlign: 'left' }}>
                                                {workoutPlan.exercises.map((exercise, index) => (
                                                    <Box key={index} sx={{ mb: 2 }}>
                                                        <Typography variant="body1" gutterBottom>
                                                            <strong>Exercise {index + 1}:</strong> {exercise.name}
                                                        </Typography>
                                                        <Typography variant="body1" gutterBottom>
                                                            <strong>Sets:</strong> {exercise.sets}
                                                        </Typography>
                                                        <Typography variant="body1" gutterBottom style={{ marginBottom: '30px' }}>
                                                            <strong>Repetitions:</strong> {exercise.reps}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="font-semibold text-center">
                                            Duration : 
                                            <span className="font-semibold capitalize opacity-90 text-blue-900">
                                                {workoutPlan.duration}
                                            </span>
                                        </div>
                                        <div className="font-semibold text-center mt-5">
                                            Notes : 
                                            <br />
                                            <span className="font-semibold capitalize opacity-90 text-blue-900">
                                                {workoutPlan.notes}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default ShareWorkoutPlan;
