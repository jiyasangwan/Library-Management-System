import React, { useEffect, useState } from "react";
import settingIcon from "../assets/setting.png";
import userIcon from "../assets/user.png";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch=useDispatch();
  const {user}=useSelector((state)=>state.auth);
  const [currentTime, setCurrentTime]=useState("");
  const [currentDate, setCurrentDate]=useState("");


  useEffect(()=>{
    const updateDateTime=()=>{
      const now=new Date();
      const hours=now.getHours()%12 || 12;
      const minutes=now.getMinutes().toString().padStart(2,"0");
      const ampm=now.getHours()>=12 ? "PM" :"AM";
      setCurrentTime(`${hours} : ${minutes} : ${ampm}`);


      const options={month:"short", date:"numeric", year: "numeric"};

      setCurrentDate(now.toLocaleDateString("en-US", options))
    };

    updateDateTime();

    const interValId= setInterval(updateDateTime,1000);
    return ()=>clearInterval(interValId);
  },[])
  return <>
  
  <header className="absolute top-0 bg-white w-full py-4 px-6 left-0 shadow-md flex justify-between items-center">
    {/* left side */}
    <div className="flex items-center gap-2">
      <img src={userIcon} alt="userIcon" className="w-8 h-8"/>
      <div className="flex flex-col">
        <span className>{user && user.name}</span> 
        <span>{user && user.role}</span>
        {/* <span> Jiya Sangwan</span>
        <span> Admin</span> */}
      </div>

    </div>
    {/* right side */}
    <div>

    </div>
    </header>
      
      
      </>;
};

export default Header;
