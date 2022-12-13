import React from "react";
import { useLocation } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import styles from "../../css/Community.module.css";

function Detail(){
  const location = useLocation();
  const item = location.state.item;
  const date = new Date(item.date);
  // console.log(date.getFullYear);
  return(
    <>
      <Header/>
      <div className={styles.detail_container}>
        <h2 className={styles.detail_title}>{item.title}</h2>
        <div>
          <p>{item.writer}</p>
          <p>{date.getFullYear()}-{date.getMonth()+1}-{date.getDate()} {date.getHours()}:{date.getMinutes()}</p>
        </div>
        <p className={styles.detail_contents}>{item.contents}</p>
      </div>
      <Footer/>
    </>
  )
}
export default Detail;