import React, { createElement, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../css/NavBar.module.css";

function NavBar(){
  const [upper, setUpper] = useState(false);
  const [lower, setLower] = useState(false);
  const navigate = useNavigate();

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
  // const onClick = (event)=>{
  //   console.log(event.target.in);
  //   // navigate("/fullbody/")
  // }
  return(
    <div className={styles.container}>
        <ul className={styles.navbar}>
          <ul>
            <li>
              <Link to="/body/full">
                전신 운동
              </Link>
            </li>
          </ul>
        <ul className={upper && styles.drop} onMouseOver={onUpperMouseOver} onMouseLeave={onMouseLeave}>
          <li>
            <Link to="/body/upper">
              상체 운동
            </Link>
          </li>
          {upper && <div className={styles.menu_fadein}>
              <li>
                <Link to="/body/belly">
                  뱃살 운동
                </Link>
              </li>
              <li>
                <Link to="/body/upper/arms">
                  팔뚝살 운동
                </Link>
              </li>
            </div>
          }
        </ul>
        <ul className={lower && styles.drop} onMouseOver={onLowerMouseOver} onMouseLeave={onMouseLeave}>
          <li>
            <Link to="/body/lower">
              하체 운동
            </Link>
          </li>
          {lower && <div className={styles.menu_fadein}>
              <li>
                <Link to="/body/lower/thigh">
                  허벅지 운동
                </Link>
              </li>
              <li>
              <Link to="/body/lower/calf">
                종아리 운동
              </Link>
              </li>
            </div>
          }
        </ul>
        <ul>
          <li>
            <Link to="/body/stretching">
              스트레칭
            </Link>
          </li>
        </ul>
      </ul>
    </div>
  )
}
export default NavBar;