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
  const [bestUser, setBestUser] = useState([]);
  const [com, setCom] = useState([]);
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

  const handleUserRank = async()=>{
    const docRef = collection(db, "viewCount");
    const q = query(docRef, orderBy("viewCount", "desc"), limit(5));
    const querySnapshot = await getDocs(q);
    let bestUserArr = [];
    querySnapshot.forEach((doc) => {
      bestUserArr.push(doc.data());
      setBestUser(bestUserArr);
    });
  }
  const handleCommunity = async()=>{
    const docRef = collection(db, "writing");
    const q = query(docRef, orderBy("date", "desc"), limit(5));
    const querySnapshot = await getDocs(q);
    let comArr = [];
    querySnapshot.forEach((doc) => {
      comArr.push(doc.data());
      setCom(comArr);
    });
  }
  useEffect(()=>{
    handleUserRank();
    handleCommunity();
  },[]);

  return(
    <div className={styles.home}>
      <Header user={user}/>
      <img src={bubu_header} alt="slogan"/>
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
          {bestUser ? bestUser.map((user, index)=>{
            return(
              <div className={`${styles.rank_title} ${styles.rank_user}`}>
                {index === 0 && 
                  <>
                    <BiMedal className={`${styles.medal} ${styles.gold}`}/>
                  <p>{user.name}</p>
                  <p>{user.viewCount}</p>
                  </>}
                {index === 1 && 
                  <>
                    <BiMedal className={`${styles.medal} ${styles.silver}`}/>
                    <p>{user.name}</p>
                    <p>{user.viewCount}</p>  
                  </>}
                {index === 2 && 
                  <>
                    <BiMedal className={`${styles.medal} ${styles.bronze}`}/>
                    <p>{user.name}</p> 
                    <p>{user.viewCount}</p>   
                  </>}
                {(index === 3 || index === 4) && <>
                  <p></p>
                  <p>{user.name}</p> 
                  <p>{user.viewCount}</p>   
                </>}
              </div>
            )
          }):
          "User 없음"}
        </div>
      </div>
      <div className={styles.community_container}>
        <h2>Community</h2>
        {com.map(item=>{
          return(
            <p><Link to={`/details/${item.writer}`} state={{item: item}}>
              {item.title}</Link>
            </p>
          )
        })}
      </div>
      <Footer/>
    </div>
  )
}
export default Home;