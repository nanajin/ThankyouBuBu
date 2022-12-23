import React from "react";
import { BsYoutube } from "react-icons/bs";
import { Link } from "react-router-dom";
import styles from "../css/Footer.module.css";

function Footer(){
  return(
    <div className={styles.footer_container}>
      <h2>ThankYou BUBU</h2>
      <div className={styles.youtube_logo}>
        <Link to="https://www.youtube.com/@thankyoububu">
          <BsYoutube/>
        </Link>
      </div>
      <div className={styles.footer_intro}>
        <p>상호: nanajin</p>
        <p>대표자명: Mijin Na</p>
        <p>이메일: nmj5182@gmail.com</p>
        <p>이용약관</p>
        <p>개인정보처리방침</p>
        <p>&copy; copyright thankyou BUBU</p>
      </div>
    </div>
  )
}
export default Footer;