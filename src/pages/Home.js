import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "../css/Home.module.css";
import bubu_header from "../img/bubu_header.png";
import {BiMedal} from "react-icons/bi";
import { Link } from "react-router-dom";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

function Home({user}){
  const [itemArr, setItemArr] = useState([]);
  const params = {
    key: process.env.REACT_APP_YOUTUBE_API_KEY,
    part: "snippet",
    channelId: process.env.REACT_APP_CHANNEL_ID, 
    maxResults: 5, // 상위 5위
    order: "viewCount"
  }
  useEffect(()=>{
    axios.get(
      "https://www.googleapis.com/youtube/v3/search", {params}
      ).then(res=>{
        setItemArr(res.data.items);
      })
  },[]);

  const handleGetDocument = async()=>{
      // const querySnapshot = await getDocs(collection(db, "viewCount"));
      const docRef = collection(db, "viewCount");
      const q = query(docRef, orderBy("viewCount", "desc"), limit(3));
      const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });

      // if(querySnapshot){
      //   querySnapshot.forEach(doc=>{
      //     console.log(doc.id, doc.data());
      //   })
        // console.log(querySnapshot);
      }
  
  useEffect(()=>{
    handleGetDocument();
  },[]);
  return(
    <div className={styles.home}>
      <Header user={user}/>
      <div>
        <img src={bubu_header} alt="slogan"/>
      </div>
      <div className={styles.rank}>
        <div>
          <h3>Ranking(Top 5)</h3>
          {itemArr ? itemArr.map((item, index)=>{
            return(
              <div className={styles.rank_title}>
                {index === 0 && 
                  <>
                    <BiMedal className={`${styles.medal} ${styles.gold}`}/>
                    <Link to={`/video/${item.id.videoId}`}>
                      {item.snippet.title}   
                    </Link>
                  </>}
                {index === 1 && 
                  <>
                    <BiMedal className={`${styles.medal} ${styles.silver}`}/>
                    <Link to={`/video/${item.id.videoId}`}>
                      {item.snippet.title}   
                    </Link>                  
                  </>}
                {index === 2 && 
                  <>
                    <BiMedal className={`${styles.medal} ${styles.bronze}`}/>
                    <Link to={`/video/${item.id.videoId}`}>
                      {item.snippet.title}   
                    </Link>                  
                  </>}
                {(index === 3 || index === 4) && <>
                  <Link to={`/video/${item.id.videoId}`}>
                      {item.snippet.title}   
                  </Link></>}
              </div>
            )
          }): "랭킹이 없습니다"}
        </div>
        <div>
          <h3>Best Steady User(Top 5)</h3>
        </div>
      </div>
      <div className={styles.community_container}>
        <h2>Community</h2>
      </div>
      <Footer/>
    </div>
  )
}
export default Home;