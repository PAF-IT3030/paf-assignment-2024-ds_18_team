import React from "react";
import RepeatIcon from "@mui/icons-material/Repeat";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BarChartIcon from "@mui/icons-material/BarChart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteOutlined from "@mui/icons-material/FavoriteOutlined";
import ReplyModel from "./ReplyModel";
import { useState } from "react";

const MealPost = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openReplyModel, setOpenReplyModel] = useState(false);
  const handleOpenProfileModel = () => setOpenReplyModel(true);
  const handleCloseReplyModal = () => setOpenReplyModel(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeletePost = () => {
    console.log("delete post");
    handleClose();
  };
  const handleEditPost = () => {};

  const handleCreateRepost = () => {
    console.log("create repost");
  };
  const handleLikedPost = () => {
    console.log("liked post");
  };

  const handleOpenReplyModel = () => {
    setOpenReplyModel(true);
  };

  return (
    <React.Fragment>
      <div className="flex space-x-5">
        <Avatar
          onClick={() => navigate(`/profile/${6}`)}
          className="cursor-pointer"
          alt="username"
          src="https://thumbs.dreamstime.com/b/icon-profile-circle-not-shadow-color-dark-blue-icon-profile-circle-not-shadow-color-dark-blue-background-194699290.jpg"
        />
        <div className="w-full">
          <div className="flex justify-between items-center">
            <div className="cursor-pointer items-center space-x-2">
              <span className="font-semibold">User1</span>
              <span className="text-gray-600">@user1.2m</span>
              <img
                className="ml-2 w-5 h-5"
                src="https://img.icons8.com/ios/452/verified-account.png"
                alt="verified"
              />
            </div>
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreHorizIcon style={{ color: "#20207D" }} />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleEditPost}>Edit</MenuItem>
                <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
              </Menu>
            </div>
          </div>
          <div className="mt-2">
            <div
              className="cursor-pointer"
              onClick={() => navigate(`/twit/${3}`)}
            >
              <p className=" mb-2 p-0">Mela Plan Cone</p>
              <img
                className="w-[28rem] border border-gray-300 p-5 rounded-md"
                src=""
                alt="meal"
              />
            </div>
            <div className="py-5 flex flex-wrap justify-between items-center">
              <div className="space-x-5 flex items-center text-gray-600">
                <ChatBubbleOutlineIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModel}
                />
                <p>43</p>
              </div>
              <div
                className={`${
                  true ? "text-pink-600" : "text-gray-600"
                } space-x-3 flex-items-center`}
              >
                <RepeatIcon
                  className="cursor-pointer"
                  onClick={handleCreateRepost}
                ></RepeatIcon>
                <p>56</p>
              </div>
              <div
                className={`${
                  true ? "text-pink-600" : "text-gray-600"
                } space-x-3 flex-items-center`}
              >
                {true ? (
                  <FavoriteIcon
                    className="cursor-pointer"
                    onClick={handleCreateRepost}
                  />
                ) : (
                  <FavoriteOutlined
                    onClick={handleLikedPost}
                    className="cursor-pointer"
                  />
                )}
                <p>26</p>
              </div>
              <div className="space-x-5 flex items-center text-gray-600">
                <BarChartIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModel}
                />
                <p>4</p>
              </div>
              <div className="space-x-5 flex items-center text-gray-600">
                <ChatBubbleOutlineIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModel}
                />
                <p>43</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section>
        <ReplyModel open={openReplyModel} handleClose={handleCloseReplyModal} />
      </section>
    </React.Fragment>
  );
};

export default MealPost;
