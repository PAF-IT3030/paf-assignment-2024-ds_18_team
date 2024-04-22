import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { TextField } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: 4,
};

export default function MealPlan({ open, handleClose }) {

  const handleSubmit = (values) => {
    console.log("handle submit", values)
  }

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      intensity: "",
      routine: "",
      mealplans: [{ name: "", sets: "", reps: "" }], // Initialize mealplans array with an empty object
      duration: "",
      notes: ""
    },
    onSubmit: handleSubmit
  });

  const addMealplanField = () => {
    formik.setValues(prevState => ({
      ...prevState,
      mealplans: [...prevState.mealplans, { name: "", sets: "", reps: "" }]
    }));
  };

  const removeMealplanField = (index) => {
    const mealplans = [...formik.values.mealplans];
    mealplans.splice(index, 1);
    formik.setValues({ ...formik.values, mealplans });
  };

  const updateMealplanField = (index) => {
    const mealplans = [...formik.values.mealplans];
    mealplans.splice(index, 1);
    formik.setValues({ ...formik.values, mealplans });
  };

  const updateMealplanLabel = (index) => {
    const mealplans = [...formik.values.mealplans];
    mealplans.splice(index, 1);
    formik.setValues({ ...formik.values, mealplans });
  };

  const handleMealplanChange = (index, field, value) => {
    const mealplans = [...formik.values.mealplans];
    mealplans[index][field] = value;
    formik.setValues({ ...formik.values, mealplans });
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
          <form onSubmit={formik.handleSubmit}>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <IconButton onClick={handleClose} aria-label='delete'>
                  <CloseIcon />
                </IconButton>
                <p className=''>Add Meal Plan</p>
              </div>
              <Button type='submit'>Save</Button>
            </div>
            <div className='hideScrollBar overflow-y-scroll overflow-x-hidden h-[80vh]'>
              <div className='space-y-6 mt-4'>

                <div className="form-group">
                  <label htmlFor="routine"><strong>Dietary Preferences :   </strong></label>
                  <select
                    id="routine"
                    name="routine"
                    value={formik.values.routine}
                    onChange={formik.handleChange}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="option1">Vegetarian</option>
                    <option value="option2">Vegan</option>
                    <option value="option3">Keto</option>
                  </select>
                </div>

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  id="description"
                  name="description"
                  label="Description (Ingredients, Cooking Instructions, etc)"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  required
                />

                <div style={{ marginBottom: '60px' }}></div>

                <div className="flex space-x-4">
                  <div className="form-group" style={{ marginRight: '80px' }}>
                    <label htmlFor="intensity"><strong>Intensity Level:   </strong></label>
                    <select
                      id="intensity"
                      name="intensity"
                      value={formik.values.intensity}
                      onChange={formik.handleChange}
                      required
                    >
                      <option value="">Select Intensity</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="routine"><strong>Portion Size:</strong></label>
                    <select
                      id="routine"
                      name="routine"
                      value={formik.values.routine}
                      onChange={formik.handleChange}
                      required
                    >
                      <option value="">Select Portion Size</option>
                      <option value="option1">Low</option>
                      <option value="option2">Medium</option>
                      <option value="option3">High</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '50px' }}></div>

                <Button
                  type="button"
                  variant="outlined"
                  color="primary"
                  onClick={addMealplanField}
                >
                  Add Meal Plan
                </Button>
                <div id="mealplan">
                  {formik.values.mealplans.map((mealplan, index) => (
                    <div key={index} className="form-group" style={{ marginBottom: '30px' }}>
                      <div className="flex items-center justify-between mb-2">
                        <IconButton onClick={() => removeMealplanField(index)} aria-label="delete mealplan" color="primary">
                          <DeleteIcon />
                        </IconButton>
                      </div>

                      <TextField
                        fullWidth
                        id={`mealplan${index + 1}`}
                        name={`mealplan${index}.name`}
                        value={formik.values.mealplans[index].name}
                        onChange={(e) => handleMealplanChange(index, 'name', e.target.value)}
                        label="Mealplan "
                        required
                        style={{ marginBottom: '10px' }}
                      />


                      <div id="mealplan">
                        {formik.values.mealplans.map((mealplan, index) => (
                          <div key={index} className="form-group" style={{ marginBottom: '30px' }}>
                            <div className="flex items-center justify-between mb-2">
                              <label htmlFor={`mealplan`}>
                                <strong>{`Mealplan `}</strong>
                              </label>



                              <div>
                                <input
                                  type="text"
                                  value={mealplan.label} // Assuming each meal plan object has a 'label' property
                                  onChange={(e) => updateMealplanLabel(index, e.target.value)} // Call updateMealplanLabel with the new label value
                                />


                                <IconButton onClick={() => updateMealplanField(index)} aria-label="update mealplan" color="primary">
                                  <UpdateIcon />
                                </IconButton>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                  ))}
                </div>


                <div style={{ marginBottom: '30px' }}></div>

                <TextField
                  fullWidth
                  id="duration"
                  name="duration"
                  label="Duration"
                  value={formik.values.duration}
                  onChange={formik.handleChange}
                  required
                />
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  id="notes"
                  name="notes"
                  label="Notes"
                  value={formik.values.notes}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

