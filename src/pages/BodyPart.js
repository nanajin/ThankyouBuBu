import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from '../css/Body.module.css';
import Card from "../components/Card";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

function BodyPart(){
  const [itemArr, setItemArr] = useState([]);
  const parameter = useParams();
  const part = parameter.part;
  let q;
  let rank = 0;
  
  if(part === "arms"){
    q = "팔뚝";
  }
  else if(part === "thigh"){
    q = "허벅지"
  }
  else if(part === "calf"){
    q = "종아리";
  }
  const params = {
    key: process.env.REACT_APP_YOUTUBE_API_KEY,
    part: "snippet",
    channelId: process.env.REACT_APP_CHANNEL_ID,
    channelType: 'channelTypeUnspecified',
    q: q,
    maxResults: 10,
    // order: "viewCount",
    regionCode: "KR",
  }
  useEffect(()=>{
    axios.get(
      "https://www.googleapis.com/youtube/v3/search", {params}
      ).then(res=>{
        setItemArr(res.data.items);
      })
  },[q]);

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
                id={item.id.videoId}
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
export default BodyPart;