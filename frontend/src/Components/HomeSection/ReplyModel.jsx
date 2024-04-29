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
          <Typography variant="h6" component="h2">
            Reply
          </Typography>
          <Typography variant="body2" component="p">
            Reply to this comment
          </Typography>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
