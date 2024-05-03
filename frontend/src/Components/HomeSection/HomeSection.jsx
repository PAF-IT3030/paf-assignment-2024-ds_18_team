import React, { useEffect, useState } from "react";
import { Avatar, Button } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";

import MealPlanEdit from "../MealPlan/MealPlanEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const validationSchema = Yup.object().shape({
  content: Yup.string().required("Text is required"),
});

const HomeSection = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [reFetch, setReFetch] = useState(false);
  const [openMealPlan, setOpenMealPlan] = useState(false);
  const [mealPlanId, setMealPlanId] = useState(null);
  const [mealPlan, setMealPlan] = useState(null);

  const handleClose = () => setOpenMealPlan(false);

  const handleSubmit = (values) => {
    console.log("values ", values);
  };

  const handleOpenMealPlan = async (mealPlanId) => {
    setOpenMealPlan(true);
    setMealPlanId(mealPlanId);
    const response = await axios(
      `http://localhost:8080/mealPlans/${mealPlanId}`
    );
    setMealPlan(response.data);
  };

  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios("http://localhost:8080/mealPlans");
        setMealPlans(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [reFetch]);

  const handleDeleteClick = async (mealPlanId) => {
    console.log("id", mealPlanId);
    try {
      await axios.delete(`http://localhost:8080/mealPlans/${mealPlanId}`);
      setReFetch(!reFetch);
    } catch (error) {
      console.log(error);
    }
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
                  <span className="text-blue-900">{formik.errors.content}</span>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="mt-10">
          <div>
            <p className={` text-xl font-semibold opacity-90`}>
              Meal Plan List
            </p>
          </div>

          {mealPlans?.map((mealPlan) => {
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
                          {mealPlan.username}
                        </p>
                        <p className="text-sm font-semibold opacity-50">
                          {new Date(mealPlan.dateTime).toDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex ">
                      <div className="flex justify-center items-center  h-[5rem] gap-3 ">
                        <section>
                          <MealPlanEdit
                            handleClose={handleClose}
                            open={openMealPlan}
                            mealPlan={mealPlan}
                            setReFetch={setReFetch}
                            reFetch={reFetch}
                          />
                        </section>
                        <EditIcon
                          onClick={() =>
                            handleOpenMealPlan(mealPlan.mealPlanId)
                          }
                          color="primary"
                          className="cursor-pointer"
                        />

                        <DeleteIcon
                          onClick={() => handleDeleteClick(mealPlan.mealPlanId)}
                          color="error"
                          className="cursor-pointer"
                        >
                          Delete
                        </DeleteIcon>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-col gap-3 ">
                    <div className="font-semibold text-center text-xl ">
                      <span className="font-semibold capitalize opacity-90 text-blue-900 unde">
                        {mealPlan.meal}
                      </span>
                    </div>
                    <div className="font-semibold text-center mt-5">
                      Duration :
                      <span className="font-semibold capitalize opacity-90 text-blue-900">
                        {mealPlan.duration}
                      </span>
                    </div>
                    <div className="font-semibold text-center">
                      Intensity :
                      <span className="font-semibold capitalize opacity-90 text-blue-900">
                        {mealPlan.intensity}
                      </span>
                    </div>
                    <div className="font-semibold text-center">
                      Portion Size :
                      <span className="font-semibold capitalize opacity-90 text-blue-900">
                        {mealPlan.portionSize}
                      </span>
                    </div>
                    <div className="font-semibold text-center">
                      Routine :
                      <span className="font-semibold capitalize opacity-90 text-blue-900">
                        {mealPlan.routine}
                      </span>
                    </div>
                    <div className="font-semibold text-center mt-5">
                      Notes
                      <br />
                      <span className="font-semibold capitalize opacity-90 text-blue-900">
                        {mealPlan.notes}
                      </span>
                    </div>
                    <div className="font-semibold text-center">
                      Description
                      <br />
                      <span className="font-semibold capitalize opacity-90 text-blue-900">
                        {mealPlan.description}
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

export default HomeSection;
