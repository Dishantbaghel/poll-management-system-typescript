import * as React from 'react';
 import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import { AppDispatch } from "../redux/Store";
import { updateTitle } from "../redux/reducers/EditPollSlice";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";

const EditPoll: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [inputTitle, setInputTitle] = useState("");
  const [disableSaveBtn, setDisableSaveBtn] = useState(true);
  const { edittitleId } = useParams() as {edittitleId : string}
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setInputTitle(location.state);
  }, [location.state]);

  const handleFormSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputTitle.trim() !== "") {
      dispatch(updateTitle(inputTitle, edittitleId));
      navigate("/Admin");
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

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisableSaveBtn(false);
    setInputTitle(e.target.value);
  };

  const handleHome = () => {
    navigate("/Admin");
  };

  return (
      <div className="parent">
        <div className="child">
          <h1>EDIT POLL</h1>
          <form onSubmit={handleFormSubmit}>
            <label>Update Title: </label>
            <br />
            <TextField
              className="all-inputfield"
              type="text"
              value={inputTitle}
              variant="outlined"
              onChange={handleTitle}
            />
            <br />
            <br />
            <button type="submit" className="btn" disabled={disableSaveBtn}>
              Save
            </button>
            <button className="btn" onClick={handleHome}>
              Back
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

export default EditPoll;
