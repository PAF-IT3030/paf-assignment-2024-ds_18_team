import React, { useState } from "react";
import { Avatar } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import MealPost from "./MealPost";

const validationSchema = Yup.object().shape({
  content: Yup.string().required("Text is required"),
});

const HomeSection = () => {
  const [selectImage, setSelectedImage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleSubmit = (values) => {
    console.log("values ", values);
  };

  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  const handleSelectImage = (event) => {
    setUploadingImage(true);
    const imgUrl = event.target.files[0];
    formik.setFieldValue("image", imgUrl);
    setSelectedImage(imgUrl);
    setUploadingImage(false);
  };

  return (
    <div className="space-y-5" style={{ marginTop: "20px" }}>
      <section>
        <h1 className="py-5 text-xl font-bold opacity-90">Home</h1>
      </section>
      <section className={`pb-10`}>
        <div className="flex space-x-5">
          <Avatar
            alt="username"
            src="https://thumbs.dreamstime.com/b/icon-profile-circle-not-shadow-color-dark-blue-icon-profile-circle-not-shadow-color-dark-blue-background-194699290.jpg"
          />
          <div className="w-full">
            <form>
              <div>
                <input
                  type="text"
                  name="content"
                  placeholder="What is Happening?"
                  className={`border-non outline-non text-xl bg-transparent`}
                  {...formik.getFieldProps("content")}
                />
                {formik.errors.content && formik.touched.content && (
                  <span className="text-red-500">{formik.errors.content}</span>
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
                      onChange={handelSelectImage}
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
      <section>
        {[1, 1, 1, 1, 1].map((item) => (
          <MealPost />
        ))}
      </section>
    </div>
  );
};

export default HomeSection;
