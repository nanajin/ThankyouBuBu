import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import styles from "../../css/Community.module.css";
import { db } from "../../firebase";
import {BsPencilSquare} from "react-icons/bs";

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
    <Link to="/write" className={styles.write_icon}>
      <BsPencilSquare/>
    </Link>
    <div className={styles.container}>
      <div className={styles.contents}>
        <p>글</p>
        <p>작성자</p>
        <p>작성일자</p>
      </div>
      {itemArr && itemArr.map((item)=>{
          const date = new Date(item.date);
        return(
          <div className={styles.contents} key={item.docId}>
            <p><Link to={`/details/${item.docId}`} state={{item: item}}>
              {item.title}</Link>
            </p>
            <p>{item.writer}</p>
            <p>{date.getFullYear()}-{date.getMonth()+1}-{date.getDate()}</p>
          </div>)
      })}
    </div>
    <Footer/>
    </>
  )
}
export default Community;