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
  const [toggleDesc, setToggleDesc] = useState(false);
  const [title, setTitle] = useState("");
  const [count, setCount] = useState(0);
  const [played, setPlayed] = useState(0);
  const [review, setReview] = useState("");
  const [comment, setComment] = useState([]);
  
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
        console.log(item);
        setDesc(item.snippet.description);
        setTitle(item.snippet.title);
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
    if(user){
        await setDoc(doc(db, "viewCount", `${user.uid}`), {
        viewCount: count + 1,
        name: user.displayName,
      });
    }
    else{
      console.log("not user")
    }
  }
  const onProgress = (event)=>{
    setPlayed(Math.round(event.played*100)/100);
    console.log(event.played); //event.played
  }
  if(played === 0.99){
    setPlayed(1);
  }
  const onClick= ()=>{
    setToggleDesc(prev=>!prev);
  }
  const onChange = (event)=>{
    const {target: {value}} = event;
    setReview(value);
  }
  const onSubmit = async()=>{
    const docRef = await addDoc(collection(db, "reviews"), {
      name: user.displayName,
      review: review,
      videoId: id,
      uid: user.uid,
    });
  }
  return(
    <div>
      <Header/>
      <h1>{title}</h1>
      <div className={styles.player_wrapper}>
        <ReactPlayer 
          className={styles.react_player}
          url={`https://www.youtube-nocookie.com/watch?v=${id}`}
          controls="true"
          onStart={onStart}
          onProgress={onProgress}
        />
        <div className={styles.bar}>
          <h1>진행률: {played}</h1>
          {desc? 
            <div className={styles.desc_box} onClick={onClick}>
              {toggleDesc ? 
                <div className={styles.desc_contents}>
                  {desc}
                  {/* <button>X</button> */}
                </div>:
                <h2>Detail Description</h2>
              }
            </div> : "Loading..."}
        </div>
        <div>
          <form onSubmit={onSubmit}>
            <input type="textarea" placeholder="Write Your review" onChange={onChange}/>
            <input type="submit" placeholder="SUBMIT"/>
          </form>
          <p></p>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
export default Video;