import React, { createElement, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css/NavBar.module.css";
import bubu_profile from "../img/bubu_profile.jpg";

function NavBar(){
  const [upper, setUpper] = useState(false);
  const [lower, setLower] = useState(false);
  const onUpperMouseOver = (event)=>{
    setUpper(true);  
  }
  const onLowerMouseOver = (event)=>{
    setLower(true);  
}
  const onMouseLeave = ()=>{
    setUpper(false);
    setLower(false);
  }
  return(
    <div className={styles.container}>
      <div>
        <img src={bubu_profile} alt="profile"/>
      </div>
      <div>
    <ul className={styles.navbar}>
      <ul>
        <li>
          <Link to="/fullbody">
            전신 운동
          </Link>
        </li>
      </ul>
      <ul className={upper && styles.drop} onMouseOver={onUpperMouseOver} onMouseLeave={onMouseLeave}>
        <li>
          <Link to="/upperbody">
            상체 운동
          </Link>
        </li>
        {upper && <div className={styles.menu_fadein}>
            <li>뱃살 운동</li>
            <li>팔뚝살 운동</li>
          </div>
        }
      </ul>
      <ul className={lower && styles.drop} onMouseOver={onLowerMouseOver} onMouseLeave={onMouseLeave}>
        <li>하체 운동</li>
        {lower && <div className={styles.menu_fadein}>
            <li>허벅지 운동</li>
            <li>종아리 운동</li>
          </div>
        }
      </ul>
      <ul>
        <li>스트레칭</li>
      </ul>
    </ul>
    </div>
    <div>
      <p>search</p>
    </div>
    </div>
  )
}
export default NavBar;