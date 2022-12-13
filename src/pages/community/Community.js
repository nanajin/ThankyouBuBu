import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import styles from "../../css/Community.module.css";
import { db } from "../../firebase";

function Community(){
  const [itemArr, setItemArr] = useState([]);

  const getDocument = async()=>{
    const querySnapshot = await getDocs(collection(db, "writing"));
    let docs = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      docs.push({
        docId: doc.id,
        ...doc.data(),
      });
    });
    setItemArr(docs);
  }
  useEffect(()=>{
    getDocument();
  },[]);
  return(
    <>
    <Header/>
    <h1>Community</h1>
    <Link to="/write">
      <button>글쓰기</button>
    </Link>
    <div className={styles.container}>
      <div className={styles.contents}>
        <p>글</p>
        <p>작성자</p>
        <p>작성일자</p>
      </div>
      {itemArr && itemArr.map((item)=>{
        return(
          <div className={styles.contents}>
            <p>{item.title}</p>
            <p>{item.writer}</p>
            {/* <p>{item.date}</p> */}
          </div>)
      })}
    </div>
    <Footer/>
    </>
  )
}
export default Community;