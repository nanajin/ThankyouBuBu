import React, { useEffect } from "react";
import Header from "../components/Header";
import YouTube from "react-youtube";
import axios from "axios";
function UpperBody(){
  const params = {
    key: "AIzaSyAlTXZmzSpanSsSZnemPbKzYLGW176WgyI",
    part: "snippet",
    channelId: "UCpg89Ys3E4BaLGgEEWVmI9g",
  }
  useEffect(()=>{
    axios.get(
      "https://www.googleapis.com/youtube/v3/playlists", {params}
      ).then(res=>{
        console.log(res);
      })
    // axios({
    //   url: "https://www.googleapis.com/youtube/v3/playlists",
    //   method: "get",
    //   part: "snippet",
    //   channelId: "UCpg89Ys3E4BaLGgEEWVmI9g",
    //   key: "AIzaSyAlLE1TlHqZZ9gtIpnnwpd495qQ_AHb6Fo",
    // }).then(res=>{
    //   console.log(res);
    // })
  },[]);
  return(
    <>
      <Header/>
      {/* <YouTube
        videoId="54tTYO-vU2E"
        opts={{
          width: "560",
          height: "315",
          playerVars:{
            autoplay: 0,
            rel: 0,
            modestbranding: 1 // 유튭 로고 표시x
          }, 
        }}
        onEnd={(e)=>{e.target.stopVideo(0)}}  
      /> */}
      {/* {embedLink.map((item)=>{
        return(
          <iframe key={item.id}
            width="560" 
            height="315" 
            src={item.src}
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
          </iframe>
        )
      })} */}
    </>
  )
}
export default UpperBody;
