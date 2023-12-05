import React, { useState } from "react";
import { AddPoll } from "../redux/reducers/AddPollSlice";
import { useNavigate } from "react-router-dom";
import { dispatch } from "../redux/Store";
import { TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddPolls = () => {
  const [title, setTitle] = useState("");
  const [newOptions, setNewOptions] = useState([{ option: "" }]);
  const navigate = useNavigate();

  const handleClick = () => {
    if (newOptions.length > 3) {
      showError("More than four not allowed!");
    } else {
      setNewOptions([...newOptions, { option: "" }]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title.trim() === "") {
      showError("Title cannot be empty!");
      return;
    }

    if (newOptions.some((option) => option.option.trim() === "")) {
      showError("Options cannot be empty!");
      return;
    }

    const optionSet = new Set(newOptions.map((option) => option.option));
    if (optionSet.size !== newOptions.length) {
      showError("Duplicate options are not allowed!");
      return;
    }

    const optionsList = newOptions.map((option) => option.option);
    dispatch(AddPoll(title, optionsList));
    navigate("/Admin");
  };

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const updatedOptions = [...newOptions];
    updatedOptions[index][name] = value;
    setNewOptions(updatedOptions);
  };
  
  const updatedInput = (event) => {
    setTitle(event.target.value.trim());
  };

  const handleCancel = () => navigate("/Admin");

  const showError = (message) => {
    toast.error(message, { position: "top-center", autoClose: 2000, theme: "colored" });
  };

  return (
    <div className="parent">
      <div className="child">
        <form autoComplete="off" onSubmit={handleSubmit}>
        
          <label>Title:</label>
          <TextField
            type="text"
            className="all-inputfield"
            value={title}
            onChange={updatedInput}
          />

          {newOptions.map((option, index) => (
            <div key={index} className="optionsContainer">
              <p className="addText">option {index + 1}:</p>
              <TextField
                className="all-inputfield"
                name="option"
                type="text"
                value={option.option}
                onChange={(event) => handleChange(event, index)}
              />
            </div>
          ))}

          <button className="btn" type="button" onClick={handleClick}>
            Add Option
          </button>
          <br />
          <button className="btn" type="submit">
            Submit
          </button>
          <button className="btn" type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </div>
  );
};

export default AddPolls;
