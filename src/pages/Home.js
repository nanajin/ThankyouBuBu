import React from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import styles from "../css/Home.module.css";

function Home(){
  return(
    <div className={styles.background}>
      <NavBar/>
      <Header/>
    </div>
  )
}
export default Home;