import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import ReactPlayer from "react-player";
import axios from "axios";
import styles from '../css/Body.module.css';
import Card from "../components/Card";

function FullBody(){
  const params = {
    key: process.env.REACT_APP_YOUTUBE_API_KEY,
    part: "snippet",
    channelId: process.env.REACT_APP_CHANNEL_ID,
    channelType: 'channelTypeUnspecified',
    q: '전신',
    maxResults: 10,
    order: "viewCount",
  }
  const [itemArr, setItemArr] = useState([]);
  const [rank, setRank] = useState(0);

  useEffect(()=>{
    axios.get(
      "https://www.googleapis.com/youtube/v3/search", {params}
      ).then(res=>{
        // console.log(res.data);
        setItemArr(res.data.items);
      })
  },[]);

  return(
    <>
    <NavBar/>
      {itemArr ?
      <div className={styles.player_container}>
        {itemArr.map((item)=>{
          const snippet = item.snippet;
          // setRank(prev=>prev+1)
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
export default FullBody;