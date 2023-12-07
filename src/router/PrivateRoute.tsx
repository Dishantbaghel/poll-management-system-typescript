import React from "react";
import { Navigate} from "react-router-dom"

const PrivateRoute =({login, children})=>{
  if(login){
    return children;
  }
  return <Navigate to='/' replace />
}

export default PrivateRoute;