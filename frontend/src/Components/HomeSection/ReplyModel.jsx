import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Modal } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ImageIcon from "@mui/icons-material/Image";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { useFormik } from "formik";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: 4,
};

export default function ReplyModel({ handleClose, open }) {
  const navigate = useNavigate();
  const [selectImage, setSelectedImage] = React.useState("");
  const [uploadingImage, setUploadingImage] = React.useState(false);

  const handleSubmit = (values) => {
    console.log("handle submit", values);
  };

  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      twitID: "",
    },
    onSubmit: handleSubmit,
  });

  const handleSelectImage = (event) => {
    setUploadingImage(true);
    const imgUrl = event.target.files[0];
    formik.setFieldValue("image", imgUrl);
    setSelectedImage(imgUrl);
    setUploadingImage(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal title"
        aria-describedby="modal-modal description"
      >
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
              </div>
              <div className="mt-2">
                <div
                  className="cursor-pointer"
                  onClick={() => navigate(`/twit/${3}`)}
                >
                  <p className=" mb-2 p-0">Mela Plan Cone</p>
                </div>
              </div>
            </div>
            <section className={`py-10`}>
              <div className="flex space-x-5">
                <Avatar
                  alt="username"
                  src="https://thumbs.dreamstime.com/b/icon-profile-circle-not-shadow-color-dark-blue-icon-profile-circle-not-shadow-color-dark-blue-background-194699290.jpg"
                />
                <div className="w-full">
                  <form onSubmit={formik.handleSubmit}>
                    <div>
                      <input
                        type="text"
                        name="content"
                        placeholder="What is Happening?"
                        className={`border-non outline-non text-xl bg-transparent`}
                        {...formik.getFieldProps("content")}
                      />
                      {formik.errors.content && formik.touched.content && (
                        <span className="text-red-500">
                          {formik.errors.content}
                        </span>
                      )}
                    </div>

                    {/*<div>
                            <img src="" alt="" />
                        </div>*/}

                    <div className="flex justify-between items-center mt-5">
                      <div className="flex space-x-5 items-center">
                        <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                          <ImageIcon className="text-blue-500" />
                          <input
                            type="file"
                            name="imageFile"
                            className="hidden"
                            onChange={handleSelectImage}
                          />
                        </label>
                        <FmdGoodIcon className="text-blue-500" />
                        <TagFacesIcon className="text-blue-500" />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
