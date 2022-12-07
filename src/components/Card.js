import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../css/Card.module.css";

function Card({thumbnail, title, id, rank}){
  const navigate = useNavigate();
  const str = "칼소폭";
  const onClick = ()=>{
    navigate(`/video/${id}`);
  }
  // console.log(title);
  if(title.includes(str)){
    // console.log(title);
  }
  return(
    <div className={styles.card} onClick={onClick}>
      <h3>{rank}</h3>
      <img src={thumbnail.url} alt="이미지없음"></img>
      <p>{title}</p>
    </div>
  )
}
export default Card;