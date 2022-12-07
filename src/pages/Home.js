import React from "react";
import { useNavigate } from "react-router-dom/dist";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import styles from "../css/Home.module.css";
import bubu_header from "../img/bubu_header.png";

function Home({user}){
  const navigate = useNavigate();
  const onClick = ()=>{
    if(user){
      navigate("/login");
    }
    else{
      navigate("/fullbody");
    }
  }
  return(
    <div className={styles.background}>
      <Header/>
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
    {user? 
      <button onClick={onClick}>Start</button> : null}
    </div>
  )
}
export default Home;