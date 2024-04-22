import React, { useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import { Button, Avatar } from '@mui/material'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MealPlanPage from '../MealPlan/MealPlanPage';



const Profile = () => {

    const navigate = useNavigate();

    const handleBack = () => navigate(-1);

    const handleOpenProfileModel = () => {
        console.log("Open profile model")
    }

    const handleFollowUser = () => {
        console.log("Follow user")
    }

    const [tabValue, setTabValue] = useState("1")

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue)

        if (newValue === 3) {
            console.log("meal plan")
        }
        else if (newValue === 1) {
            console.log("posts")
        }
    }
    

    return (
        <div style={{ marginTop: '20px' }}>
            <section className={` bg-white z-50 flex items-center stichy top-0 bg-opacity-95`}>

                <KeyboardBackspaceIcon className='cursor-pointer' onClick={handleBack} />

                <h1 className='py-5 text-xl font-bold opacity-90 ml-5'>Raam Kapoor</h1>

            </section>

            <section>
                <img className='w-[100%] h-[15rem] object-cover' src="https://media.istockphoto.com/id/925440650/photo/underwater-bubbles.jpg?s=612x612&w=0&k=20&c=k_iJkW8e2l7UdUvxRviAFanteIKgsOUYDkWtBrl8nzs=" alt="" />
            </section>

            <section className='pl-6'>
                <div className='flex justify-between items-start mt-5 h-[5rem]'>

                    <Avatar className='transform -translate-y-24'
                        alt='raam kapoor' src='https://thumbs.dreamstime.com/b/icon-profile-circle-not-shadow-color-dark-blue-icon-profile-circle-not-shadow-color-dark-blue-background-194699290.jpg'
                        sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
                    />

                    {true ? <Button
                        onClick={handleOpenProfileModel}
                        variant='contained' sx={{ borderRadius: "20px", bgcolor: '#20207D' }}>Edit Profile</Button> : <Button
                            onClick={handleFollowUser}
                            variant='contained' sx={{ borderRadius: "20px", bgcolor: '#20207D' }}>{true ? "Follow" : "Unfollow"}</Button>}

                </div>

                <div>
                    <div className='flex item-center'>
                        <h1 className='font-bold text-lg'>
                            Raam Kapoor
                        </h1>
                    </div>
                    <h1 className='text-gray-500'>
                        @raamkapoor
                    </h1>
                </div>

                <div className='mt-2 space-y-3'>
                    <p>Hey there!</p>

                    <div className='py-1 flex space-x-5'>

                        <div className='flex items-center text-gray-500'>
                            <BusinessCenterIcon />
                            <p className='ml-2'>Education</p>
                        </div>

                        <div className='flex items-center text-gray-500'>
                            <LocationOnIcon />
                            <p className='ml-2'>Sri Lanka</p>
                        </div>

                        <div className='flex items-center text-gray-500'>
                            <CalendarMonthIcon />
                            <p className='ml-2'>Joined May 2023</p>
                        </div>

                    </div>

                    <div className='flex items-center space-x-5'>

                        <div className='flex items-center space-x-1 font-semibold'>
                            <span>120</span>
                            <span className='text-gray-500'>Following</span>

                        </div>

                        <div className='flex items-center space-x-1 font-semibold'>
                            <span>590</span>
                            <span className='text-gray-500'>Followers</span>

                        </div>

                    </div>
                </div>
            </section>

            <section className='py-5'>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={tabValue}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                                <Tab label="Posts" value="1" style={{ color: tabValue === "1" ? '#20207D' : '#6B7280' }} />
                                <Tab label="Workout  Plans" value="2" style={{ color: tabValue === "2" ? '#20207D' : '#6B7280' }} />
                                <Tab label="Meal Plans" value="3" style={{ color: tabValue === "3" ? '#20207D' : '#6B7280' }} />
                            </TabList>
                        </Box>
                        <TabPanel value="1">Users Posts</TabPanel>
                        <TabPanel value="2">Users Workout plans</TabPanel>
                        <TabPanel value="3"><MealPlanPage/></TabPanel>
                        
                      

                    </TabContext>
                </Box>
            </section>

            
        </div>
    )
}

export default Profile




