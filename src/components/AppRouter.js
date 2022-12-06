import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FullBody from "../pages/FullBody";
import Home from "../pages/Home";
import Login from "../pages/Login";
import UpperBody from "../pages/UpperBody";
import Video from "./Video";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

function AppRouter(){
  const [user, setUser] = useState(null);
  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user){
        if(user.displayName === null){
          const name = user.email.split("@")[0];
          user.displayName = name;
        }
        setUser(user);
      }else{
        setUser(null);
      }
      // setInit(true);
    });
  }, []);
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home user={user}/>} />
          <Route path="/fullbody" element={<FullBody/>} />
          <Route path="/upperbody" element={<UpperBody/>} />
          <Route path="/video/:id" element={<Video/>}/>
          <Route path="/login" element={<Login/>}/>
          {/* {!user && <Route path="/login" element={<Login/>}/>} */}
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default AppRouter;