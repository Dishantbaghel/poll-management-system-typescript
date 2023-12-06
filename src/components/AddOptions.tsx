import { TextField } from "@mui/material";
import React, { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../redux/Store";
import { optionsAdd } from "../redux/reducers/AddOptionSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "../redux/reducers";

const AddOptions: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [inputOption, setInputOption] = useState<string>("");
  const { optionId } = useParams<{optionId?:string}>();
  const navigate = useNavigate();
  const getOptions = useSelector((state:RootState)=>state.AdminSlice)

  const handleFormSubmit = (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const isDuplicate = getOptions.data.some((poll) => poll.options.some((option) => option.option === inputOption.trim()));
    if (inputOption.trim() !== "" && !isDuplicate) {
      dispatch(optionsAdd(inputOption, optionId));
      navigate("/Admin");
    } else if (isDuplicate) {
      toast.error("🦄 Duplicate option! Please enter a unique option.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.error("🦄 InputField cannot be empty!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  

  const handleTitle = (e) => {
    setInputOption(e.target.value);
  };

  const handleHome = () => navigate("/Admin");
 

  return (
    <div className="parent">
      <div className="child">
        <h1>ADD OPTION</h1>
        <form onSubmit={handleFormSubmit}>
          <label>Option: </label>
          <br />
          <TextField
            className="all-inputfield"
            type="text"
            variant="outlined"
            onChange={handleTitle}
          />
          <br />
          <br />
          <button type="submit" className="btn">
            Save
          </button>
          <button className="btn" onClick={handleHome}>
            Back
          </button>
        </form>
        <ToastContainer
          position="top-center"
          autoClose={5000}
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

export default AddOptions;
