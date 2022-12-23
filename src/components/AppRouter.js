import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/login/Login";
import Video from "./Video";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import Body from "../pages/exercise/Body";
import BodyPart from "../pages/exercise/BodyPart";
import Search from "../pages/Search";
import Community from "../pages/community/Community";
import Writing from "../pages/community/Writing";
import Detail from "../pages/community/Detail";
import Profile from "../pages/profile/Profile";

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
          <Route path="/body/:type" element={<Body/>} />
          <Route path="/body/:type/:part" element={<BodyPart/>} />
          <Route path="/video/:id" element={<Video user={user}/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/search/:q" element={<Search/>}/>
          <Route path="/community" element={<Community/>}/>
          <Route path="/write" element={<Writing user={user}/>}/>
          <Route path="/details/:text" element={<Detail user={user}/>}/>
          <Route path="/profile" element={<Profile user={user}/>}/>
          {/* {!user && <Route path="/login" element={<Login/>}/>} */}
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default AppRouter;