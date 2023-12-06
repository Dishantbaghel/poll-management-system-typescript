import React, { useEffect } from "react";
import { AppDispatch } from "../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetReducer, signup } from "../redux/reducers/SignUpSlice";
import { useFormik } from "formik";
import { signupSchema } from "../schemas";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Backdrop, CircularProgress, TextField } from '@mui/material'
import { RootState } from "../redux/reducers";

const SignUp = () => {
  const navigate = useNavigate();
  const signupSlice = useSelector((state: RootState) => state.SignUpSlice);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (signupSlice.isSuccess && !signupSlice.data.message) {
      navigate("/");
      dispatch(resetReducer());}  
    if (signupSlice.data.message) {
      toast.error("User allready exist.", {
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
  }, [signupSlice.isSuccess]);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        password: "",
        role: "admin",
      },
      validationSchema: signupSchema,
      onSubmit: (values) => {
        dispatch(signup(values));
        if (signupSlice.isLoading) {
          dispatch(resetReducer());
        }
      },
    });

  return (
    <div className="parent">
    {signupSlice.isLoading && 
      <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={signupSlice.isLoading}
> 
  <CircularProgress color="inherit" />
</Backdrop>}
    <div className="child">
      <form onSubmit={handleSubmit}>
        <h1>SIGN UP</h1>
        <br />
        <div>
          <label htmlFor="name">Name: </label>
          <br />
          <TextField
          className="all-inputfield"
            autoComplete="off"
            name="name"
            id="name"
            placeholder="Enter Name here..."
            type="text"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            />
          {errors.name && touched.name ? (
            <div className="form-error">{errors.name}</div>
          ) : null}
        </div>
        <br />
        <label htmlFor="password">Password: </label>
        <br />
        <TextField 
          className="all-inputfield"
          name="password"
          type="password"
          placeholder="Enter Password here..."
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && touched.name ? (
          <div className="form-error">{errors.password}</div>
        ) : null}
        <br />
        <br />

        <label htmlFor="role">Choose a role: </label>
        <select
          className="signUp-dropdown"
          id="role"
          name="role"
          value={values.role}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="admin">admin</option>
          <option value="guest">guest</option>
        </select>
        <br />
        <br />
        <br />
        <div style={{textAlign:'center'}}>
        <div>
        <button className="btn" type="submit">
          Sign Up
        </button></div>
        <Link to="/" type="submit"> 
          Already have account? Login
        </Link>
        </div>
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

export default SignUp;
