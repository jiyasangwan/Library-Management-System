import React from "react";
import { useState } from "react";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import SideBar from "../layout/SideBar"
import Header from "../layout/Header";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";
import BookManagement from "../components/BookManagement";
import Books from "../components/Books";
import Catalog from "../components/Catalog";
import MyBorrowedBooks from "../components/MyBorrowedBooks";
import Users from "../components/Users";
import SettingPopup from "../popups/SettingPopup";

const Home = () => {
  const [isSideBarOpen,setIsSideBarOpen]=useState(false);
  const [selectedComponenet,setSelectedComponent]=useState("");

  const {user,
        isAuthenticated}=useSelector(state=>state.auth);

  if(!isAuthenticated){
    return <Navigate to={"/login"}/>
  }

  // Function to render the appropriate component based on user role and selection
  const renderComponent = () => {
    switch(selectedComponenet){
      case "Dashboard":
        return user?.role === "User" ? (
          <UserDashboard setSelectedComponent={setSelectedComponent} />
        ) : (
          <AdminDashboard />
        );
        
      case "Books":
        return user?.role === "User" ? (
          <Books />
        ) : (
          <BookManagement />
        );
        
      case "My Borrowed Books":
        return <MyBorrowedBooks />;
        
      case "Catalog":
        // Only admins can access Catalog
        if(user?.role === "Admin"){
          return <Catalog />;
        } else {
          // Redirect users to dashboard if they try to access admin-only features
          setSelectedComponent("Dashboard");
          return user?.role === "User" ? (
            <UserDashboard setSelectedComponent={setSelectedComponent} />
          ) : (
            <AdminDashboard />
          );
        }
        
      case "Users":
        // Only admins can access Users
        if(user?.role === "Admin"){
          return <Users />;
        } else {
          // Redirect users to dashboard if they try to access admin-only features
          setSelectedComponent("Dashboard");
          return user?.role === "User" ? (
            <UserDashboard setSelectedComponent={setSelectedComponent} />
          ) : (
            <AdminDashboard />
          );
        }

      default:
        // Default to appropriate dashboard based on user role
        return user?.role === "User" ? (
          <UserDashboard setSelectedComponent={setSelectedComponent} />
        ) : (
          <AdminDashboard />
        );
    }
  };

  return <>
  <div className="relative md:pl-64 flex min-h-screen bg-gray-100">
    <div className="md:hidden z-10 absolute right-6 top-4 sm:top-6 flex justify-center items-center bg-black rounded-md h-9 w-9 text-white">
      <GiHamburgerMenu className="text-2xl" onClick={()=>setIsSideBarOpen(!isSideBarOpen)}/>
    </div>
    <SideBar isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} setSelectedComponent={setSelectedComponent}/>

    {/* Main Content Area */}
    <div className="flex-1 flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {renderComponent()}
      </main>
    </div>
  </div>
  
  {/* Popups */}
  <SettingPopup />
  </>;
};

export default Home;
