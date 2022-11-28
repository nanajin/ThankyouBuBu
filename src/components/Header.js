import React from "react";
import bubu_header from "../img/bubu_header.png";
import { useNavigate } from 'react-router-dom'
function Header(){
  const navigate = useNavigate();

  const onClick = ()=>{
    navigate("/");
  }
  return(
    <>
      <h1>Thankyou BUBU</h1>
      <img src={bubu_header} alt="header" onClick={onClick}/>
    </>
  )
}
export default Header;