import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FullBody from "../pages/FullBody";
import Home from "../pages/Home";
import UpperBody from "../pages/UpperBody";

function AppRouter(){
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/fullbody" element={<FullBody/>} />
          <Route path="/upperbody" element={<UpperBody/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default AppRouter;