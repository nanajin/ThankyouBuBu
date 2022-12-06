import React from "react";
import bubu_profile from "../img/bubu_profile.jpg";
import { useNavigate } from 'react-router-dom';
import NavBar from "./NavBar";

function Header(){
  const navigate = useNavigate();
  const onClick = ()=>{
    navigate("/login");
  }
  return(
    <>
      <div>
        <img src={bubu_profile} alt="profile"/>
      </div>
      <NavBar/>
      <p>search</p>
      <button onClick={onClick}>Login</button>
    </>
    
  )
}
export default Header;