import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import styles from "../css/Video.module.css";
import axios from "axios";

function Video(){
  const p = useParams();
  const id = p.id;
  const [desc, setDesc] = useState("");
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

  return(
    <div className={styles.player_wrapper}>
      <ReactPlayer 
        className={styles.react_player}
        url={`https://www.youtube-nocookie.com/watch?v=${id}`}
        controls="true"
       />
       {desc? <p>{desc}</p> : "Loading..."}
    </div>
  )
}
export default Video;