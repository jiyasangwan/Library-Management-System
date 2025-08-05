import React, { useEffect } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import  ForgotPassword from "./pages/ForgotPassword";
import OTP from "./pages/OTP";
import ResetPassword from "./pages/ResetPassword";
import TestComponent from "./components/TestComponent";
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { getUser } from "./store/slices/authSlice";


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user is authenticated on app load
    dispatch(getUser());
  }, [dispatch]);

  return <Router>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/password/forgot" element={<ForgotPassword />}/>
      <Route path="/otp-verification/:email" element={<OTP />}/>
      <Route path="/password/reset/:token" element={<ResetPassword />}/>
      <Route path="/test" element={<TestComponent />}/>
    </Routes>
    <ToastContainer theme="dark" />
  </Router>;
};

export default App;
