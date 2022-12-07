import React from "react";
import { useNavigate } from "react-router-dom/dist";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import styles from "../css/Home.module.css";
import bubu_header from "../img/bubu_header.png";

function Home({user}){
  const navigate = useNavigate();
  
  return(
    <div className={styles.home}>
      <Header/>
      <div>
        <img src={bubu_header} alt="slogan"/>
      </div>
    </div>
  )
}
export default Home;