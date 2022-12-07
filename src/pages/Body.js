import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from '../css/Body.module.css';
import Card from "../components/Card";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

function Body(){
  const [itemArr, setItemArr] = useState([]);
  const parameter = useParams();
  const type = parameter.type;
  let playlistId;
  let rank = 0;
  
  if(type === "full"){
    playlistId = "PLPPetu1spkebTXnDVnGtT0tYZV-6ocW4z"; //전신
  }
  else if(type === "upper"){
    playlistId = "PLPPetu1spkeaNfn2ANS53rcyPCP9sfvyD"; //상체
  }
  else if(type === "belly"){
    playlistId = "PLPPetu1spkeaIM5eyAERyUQ_huATcnhFT"; //뱃살
  }
  else if(type === "lower"){
    playlistId = "PLPPetu1spkebrJXitelB1R0xDWaLgA2Nb"; //하체
  }
  else if(type === "stretching"){
    playlistId = "PLPPetu1spkebUYZqSueczefUSnGOmWeUr"; //스트레칭
  }
  const params = {
    key: process.env.REACT_APP_YOUTUBE_API_KEY,
    part: "snippet",
    playlistId: playlistId, 
    maxResults: 10, // 총 31개임
  }

  useEffect(()=>{
    axios.get(
      "https://www.googleapis.com/youtube/v3/playlistItems", {params}
      ).then(res=>{
        setItemArr(res.data.items);
      })
  },[playlistId]);
  
  return(
    <>
      <Header/>
      {itemArr ?
        <div className={styles.player_container}>
          {itemArr.map((item)=>{
            const snippet = item.snippet;
            rank = rank + 1
            return(
              <Card 
                thumbnail={snippet.thumbnails.medium} 
                title={snippet.title}
                id={snippet.resourceId.videoId}
                rank={rank}
              />
            )
          })}
        </div>:
        <p>Loading...</p>
      }
    </>
  )
}
export default Body;