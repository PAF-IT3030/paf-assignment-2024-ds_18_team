import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { set, useForm } from "react-hook-form";
import { IconButton } from "@mui/material";
import { TextField } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

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

const schema = yup.object().shape({
  routine: yup.string().required("Routine is required"),
  description: yup.string().required("Description is required"),
  intensity: yup.string().required("Intensity is required"),
  portionSize: yup.string().required("Portion Size is required"),
  meal: yup.string().required("Meal is required"),
  duration: yup.string().required("Duration is required"),
  notes: yup.string().required("Notes is required"),
});

export default function MealPlanEdit({
  open,
  handleClose,
  mealPlan,
  setReFetch,
  reFetch,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await axios.put(
        `http://localhost:8080/mealPlans/update/${mealPlan.mealPlanId}`,
        data
      );
      handleClose();
      setReFetch(!reFetch);
    } catch (error) {
      console.log(error);
    }
  };

  if (mealPlan) {
    setValue("routine", mealPlan.routine);
    setValue("description", mealPlan.description);
    setValue("intensity", mealPlan.intensity);
    setValue("portionSize", mealPlan.portionSize);
    setValue("meal", mealPlan.meal);
    setValue("duration", mealPlan.duration);
    setValue("notes", mealPlan.notes);
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IconButton onClick={handleClose} aria-label="delete">
                  <CloseIcon />
                </IconButton>
                <p className="">Update Meal Plan</p>
              </div>
              <Button type="submit">Update</Button>
            </div>
            <div className="hideScrollBar overflow-y-scroll overflow-x-hidden h-[80vh]">
              <div className="space-y-6 mt-4">
                <div className="form-group">
                  <label htmlFor="routine">
                    <strong>Dietary Preferences : </strong>
                  </label>
                  <select {...register("routine")} id="routine" name="routine">
                    <option value="">Select Type</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Keto">Keto</option>
                  </select>
                  {errors.routine && (
                    <p className="text-red-500">{errors.routine.message}</p>
                  )}
                </div>

                <TextField
                  {...register("description")}
                  error={errors.description}
                  helperText={errors.description && errors.description.message}
                  fullWidth
                  multiline
                  rows={4}
                  id="description"
                  name="description"
                  label="Description (Ingredients, Cooking Instructions, etc)"
                />

                <div style={{ marginBottom: "60px" }}></div>

                <div className="flex space-x-4">
                  <div className="form-group" style={{ marginRight: "80px" }}>
                    <label htmlFor="intensity">
                      <strong>Intensity Level: </strong>
                    </label>
                    <select
                      id="intensity"
                      name="intensity"
                      {...register("intensity")}
                    >
                      <option value="">Select Intensity</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                    {errors.intensity && (
                      <p className="text-red-500">{errors.intensity.message}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="routine">
                      <strong>Portion Size:</strong>
                    </label>
                    <select
                      {...register("portionSize")}
                      id="routine"
                      name="portionSize"
                    >
                      <option value="">Select Portion Size</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                    {errors.portionSize && (
                      <p className="text-red-500">
                        {errors.portionSize.message}
                      </p>
                    )}
                  </div>
                </div>

                <div style={{ marginBottom: "20px" }}></div>
                <TextField
                  fullWidth
                  {...register("meal")}
                  error={errors.meal}
                  helperText={errors.meal && errors.meal.message}
                  id="meal"
                  rows={2}
                  multiline
                  name="meal"
                  label="Meal Plan"
                />

                <TextField
                  fullWidth
                  {...register("duration")}
                  error={errors.duration}
                  helperText={errors.duration && errors.duration.message}
                  id="duration"
                  name="duration"
                  label="Duration"
                />
                <TextField
                  {...register("notes")}
                  error={errors.notes}
                  helperText={errors.notes && errors.notes.message}
                  fullWidth
                  multiline
                  rows={4}
                  id="notes"
                  name="notes"
                  label="Notes"
                />
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
