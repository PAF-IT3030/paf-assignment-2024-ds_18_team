import React from 'react'
import RepeatIcon from '@mui/icons-material/Repeat';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import BarChartIcon from '@mui/icons-material/BarChart';
import FavoriteIcon from '@mui/icons-material/Favorite';


const PostCard = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeletePost = () => {
        console.log("delete post")
        handleClose();

    };

    const handleOpenReplyModel = () => {
        console.log("open model")

    }

    const handleCreateRepost = () => {
        console.log("handle create repost")
    }

    const handleLikepost = () => {
        console.log("handle like post");
    }

    return (
        <div className=''>

            {/*<div className='flex items-corner font-semibold text-gray-700 py-2'>
                <RepeatIcon/>
                <p>You Re-Post</p>
                 

            </div>*/}

            <div className='flex space-x-5'>
                <Avatar
                    onClick={() => navigate('/profile/${6}')}
                    className='cursor-pointer'
                    alt='username'
                    src='https://thumbs.dreamstime.com/b/icon-profile-circle-not-shadow-color-dark-blue-icon-profile-circle-not-shadow-color-dark-blue-background-194699290.jpg' />


                <div className='w-full'>
                    <div className='flex justify-between items-center'>
                        <div className='flex cursor-pointer items-center space-x-2'>

                            <span className='font-semibold'>Raam Kapoor</span>
                            <span className='text-gray-600'>@raamkapoor . 2m</span>

                        </div>

                        <div>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <MoreHorizIcon style={{ color: '#20207D' }} />
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

                                <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
                                <MenuItem onClick={handleDeletePost}>Edit</MenuItem>

                            </Menu>

                        </div>

                    </div>

                    <div className="mt-2">
                        <div className="cursor-pointer">
                            <p className="mb-2 p-0">twitter clone - full stack project with spring boot and react</p>
                            <img className="w-[28rem] border-gray-400 p-5 rounded-md"
                                src=""
                                alt="" />
                        </div>

                        <div className="py-5 flex flex-wrap justify-between items-center text-gray-600">
                            <ChatBubbleOutlineIcon className="cursor-pointer" onClick={handleOpenReplyModel} />
                            <p>43</p>

                        </div>

                        <div className={'${true? "test-pink-600":"text-gray-600"} space-x-3 flex items-center'}>
                            <RepeatIcon
                                onClick={handleCreateRepost}
                                className="cursor-pointer" />
                            <p>54</p>


                        </div>

                        <div className={'${true? "test-pink-600":"text-gray-600"} space-x-3 flex items-center'}>
                            {true ? <FavoriteIcon
                                onClick={handleLikepost}
                                className="cursor-pointer" /> : <FavoriteBorderIcon
                                onClick={handleLikepost}
                                className="cursor-pointer" />}
                            <p>54</p>


                        </div>

                        <div className="py-5 flex flex-wrap justify-between items-center text-gray-600">
                            <BarChartIcon className="cursor-pointer" onClick={handleOpenReplyModel} />
                            <p>430</p>

                        </div>
                        <div className="py-5 flex flex-wrap justify-between items-center text-gray-600">
                            <FileUploadIcon className="cursor-pointer" onClick={handleOpenReplyModel} />


                        </div>

                    </div>



                </div>

            </div>

        </div>
    );
};

export default PostCard;