import React from "react";
import bubu_header from "../img/bubu_header.png";
import { useNavigate } from 'react-router-dom'
function Header(){
  const navigate = useNavigate();

  const onClick = ()=>{
    navigate("/");
  }
  return(
    <div style={{backgroundColor: "rgb(239, 239, 183)", border: "1px solid black", position:"relative"}}>
      <img 
        src={bubu_header}
        alt="header" 
        onClick={onClick}
        style={{
          position: "absolute",
          margin: "auto",
          marginTop: "20px",
          left: "50%",
          transform: "translate(-50%)",
        }}  
      />
    </div>
  )
}
export default Header;