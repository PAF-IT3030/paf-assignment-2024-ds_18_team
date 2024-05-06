import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { IconButton } from "@mui/material";
import { TextField } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

export default function MealPlan({ open, handleClose }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const postData = {
      ...data,
      userId: "1234", //change your userId
      username: "Sanduni", //change your username
    };
    console.log(postData);

    try {
      await axios.post("http://localhost:8080/mealPlans/add", postData);
       window.location.href = "/home";
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

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
                <p className="">Add Meal Plan</p>
              </div>
              <Button type="submit">Save</Button>
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
