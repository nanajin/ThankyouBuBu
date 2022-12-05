import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import ReactPlayer from "react-player";
import axios from "axios";
import styles from '../css/Body.module.css';
import Card from "../components/Card";

function FullBody(){
  const params = {
    key: "AIzaSyAlTXZmzSpanSsSZnemPbKzYLGW176WgyI",
    part: "snippet",
    channelId: "UCpg89Ys3E4BaLGgEEWVmI9g",
    channelType: 'channelTypeUnspecified',
    q: '전신',
    maxResults: 10,
  }
  const [itemArr, setItemArr] = useState([]);

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
          return(
            <Card 
              thumbnail={snippet.thumbnails.medium} 
              title={snippet.title}
              id={item.id.videoId}
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