import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import styles from "../css/Video.module.css";
import axios from "axios";
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore"; 
import { db } from "../firebase";
import Header from "./Header";
import Footer from "./Footer";

function Video({user}){
  const p = useParams();
  const id = p.id;
  const [desc, setDesc] = useState("");
  const [count, setCount] = useState(0);
  const params = {
    key: process.env.REACT_APP_YOUTUBE_API_KEY,
    part: "snippet",
    id: id,
  }
  useEffect(()=>{
    axios.get(
      "https://www.googleapis.com/youtube/v3/videos", {params}
      ).then(res=>{
        const item = res.data.items[0];
        setDesc(item.snippet.description);
      })
  },[]);
  
  const handleGetDocument = async()=>{
    if(user){
      const docRef = doc(db, "viewCount", `${user.uid}`);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        setCount(docSnap.data().viewCount);
        console.log(docSnap.data().viewCount);
      }
    }
  }
  useEffect(()=>{
    handleGetDocument();
  },[]);
  const onStart = async()=>{
// 기존 count 조회 후 +1해서 set하기 
  if(user){
      await setDoc(doc(db, "viewCount", `${user.uid}`), {
      viewCount: count + 1,
      // uid: user.uid,
    });
  }
  else{
    console.log("not user")
  }
  // try {
  //   const docRef = await addDoc(collection(db, "viewCount"), {
  //     viewCount: count,
  //     uid: user.uid,
  //   });
  //   console.log("Document written with ID: ", docRef.id);
  // } catch (e) {
  //   console.error("Error adding document: ", e);
  // }
  }
  
  return(
    <div>
      <Header/>
      <div className={styles.player_wrapper}>
        <ReactPlayer 
          className={styles.react_player}
          url={`https://www.youtube-nocookie.com/watch?v=${id}`}
          controls="true"
          onStart={onStart}
        />
        {desc? <p>{desc}</p> : "Loading..."}
      </div>
      <Footer/>
    </div>
  )
}
export default Video;