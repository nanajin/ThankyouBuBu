import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import styles from "../../css/Community.module.css";
import {RiDeleteBin6Line} from 'react-icons/ri';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

function Detail({user}){
  const location = useLocation();
  const item = location.state.item;
  const date = new Date(item.date);
  const navigate = useNavigate();
  const onRemove = async()=>{
    const ok = window.confirm("정말 삭제하시겠습니까?");
    if(ok){
      await deleteDoc(doc(db, "writing", item.docId));
      alert("삭제되었습니다");
      navigate(-1);
    }
  }
  return(
    <>
      <Header/>
      <div className={styles.detail_container}>
        <h2 className={styles.detail_title}>{item.title}</h2>
        {item.writer===user.displayName && 
          <div>
            <button onClick={onRemove}className={styles.ud_icon}>
              <RiDeleteBin6Line/>
            </button>
          </div>
        }
        <div className={styles.doc_info}>
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