import React from 'react'
import logo from '../../images/logo.png';
import { navigationMenu } from './NavigationMenu';
import { useNavigate } from 'react-router-dom';
import { Button, Avatar } from '@mui/material'
import { Menu, MenuItem } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Navigation = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const navigate = useNavigate();

    const handleLogout=()=>{
        console.log("logout")
        handleClose()
    }
    return (
        <div className='h-screen sticky top-0'>
            <div>
                <div className='py-5' style={{ marginTop: '20px', marginBottom: '40px' }}>
                    <img src={logo} alt="Logo" style={{ width: '130px', height: '80px' }} />
                </div>

                <div className='space-y-6'>

                    {navigationMenu.map((item) => <div className='cursor-pointer flex space-x-3 items-center' onClick={() => item.title === "Profile" ? navigate(`/profile/{5}`) : navigate(item.path)}>
                        {item.icon}
                        <p className='text-xl'>{item.title}</p>
                    </div>)}

                </div>

                <div className='py-10' style={{ marginTop: '40px'}}>

                    <Button sx={{ width: "100%", borderRadius: "29px", py: "15px", bgcolor: '#20207D' }}
                        variant='contained'
                    >
                        Post
                    </Button>

                </div>
            </div>

            <div className='flex items-center justify-between' style={{ marginTop: '80px', marginBottom: '20px' }}>
                <div className='flex items-center space-x-3'>
                    <Avatar
                        alt = "username"
                        src='https://thumbs.dreamstime.com/b/icon-profile-circle-not-shadow-color-dark-blue-icon-profile-circle-not-shadow-color-dark-blue-background-194699290.jpg'
                    />

                    <div>
                        <span>Raam Kapoor</span>
                        <span className='opacity-70'>@raamkapoor</span>
                    </div>

                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <MoreHorizIcon style={{ color: '#20207D' }}/>
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>

                </div>


            </div>
        </div>
    )
}

export default Navigation