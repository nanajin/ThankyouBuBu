import React from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import styles from "../css/Video.module.css";

function Video(){
  const params = useParams();
  const id = params.id;
  return(
    <div className={styles.player_wrapper}>
      <ReactPlayer 
        className={styles.react_player}
        url={`https://www.youtube-nocookie.com/watch?v=${id}`}
        controls="true"
       />
    </div>
  )
}
export default Video;