import { Route, Routes, useNavigate } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import Admin from "../pages/Admin";
import EditPoll from "../components/EditPoll";
import AddPolls from "../components/AddPolls";
import AddOptions from "../components/AddOptions";
import PrivateRoute from "./PrivateRoute";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../redux/reducers";

const Router = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const loginSlice = useSelector((state : RootState) => state.loginSlice);
  useEffect(() => {
    localStorage.getItem("token");
    localStorage.getItem("role");
  }, [loginSlice.isSuccess]);

  useEffect(()=>{
    navigate('/')
  },[token])

  

  return (
      <Routes>
     { token ?  <Route path='/' element={role.toLowerCase() === "admin" ?
      <Admin/> : <Home /> } />  :  <Route path="/" element={<SignIn />} /> }
        <Route path="/signup" element={<SignUp />} />
        <Route path="/AddPolls" element={<AddPolls />} />
        <Route exact path="/editPoll/:edittitleId" element={<EditPoll />} />
        <Route path="/AddOptions/:optionId" element={<AddOptions />} />

          <Route exact path="/admin" element={<PrivateRoute login={(localStorage.getItem("token") && localStorage.getItem("role") === "admin")}>  <Admin /></PrivateRoute>}>
      </Route>
      <Route exact path="/home" element={<PrivateRoute login={(localStorage.getItem("token") && localStorage.getItem("role") === "guest")}>  <Home /></PrivateRoute>}>
      </Route>


      </Routes>
  );
};

export default Router;
