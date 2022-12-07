import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from '../css/Body.module.css';
import Card from "../components/Card";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

function Search(){
  const [itemArr, setItemArr] = useState([]);
  const parameter = useParams();
  const q = parameter.q;
  
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
            return(
              <Card 
                key={item.id.videoId}
                thumbnail={snippet.thumbnails.medium} 
                title={snippet.title}
                id={item.id.videoId}
              />
            )
          })}
        </div>:
        <p>검색한 결과가 없습니다</p>
      }
    </>
  )
}
export default Search;