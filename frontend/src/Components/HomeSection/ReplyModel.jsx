import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Modal } from "@mui/material";
import Typography from "@mui/material";

const style = {
  position: absolute,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderradius: 4,
};

export default function ReplyModel() {
  const [open, setOPen] = React.useState(false);
  const handleOpen = () => setOPen(true);
  const handleClose = () => setOPen(false);
  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="primary">
        Reply
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
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
                <div className="cursor-pointer">
                  <p className=" mb-2 p-0">Mela Plan Cone</p>
                  <img
                    className="w-[28rem] border border-gray-300 p-5 rounded-md"
                    src=""
                    alt="meal"
                  />
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
