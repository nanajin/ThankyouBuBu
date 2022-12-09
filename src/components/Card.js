import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/Card.module.css";

function Card({thumbnail, title, id, rank}){
  const navigate = useNavigate();
  const onClick = ()=>{
    navigate(`/video/${id}`);
  }
  
  return(
    <div className={styles.card} onClick={onClick}>
      <h3>{rank}</h3>
      <img src={thumbnail.url} alt="이미지없음"></img>
      <div className={styles.title}>
        <p>{title}</p>
      </div>
    </div>
  )
}
export default Card;