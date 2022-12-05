import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ReactPlayer from "react-player";
import axios from "axios";

function UpperBody(){
  const params = {
    key: "AIzaSyAlTXZmzSpanSsSZnemPbKzYLGW176WgyI",
    part: "snippet",
    channelId: "UCpg89Ys3E4BaLGgEEWVmI9g",
    channelType: 'channelTypeUnspecified',
    q: '상체',
  }
  const [itemArr, setItemArr] = useState([]);

  useEffect(()=>{
    axios.get(
      "https://www.googleapis.com/youtube/v3/search", {params}
      ).then(res=>{
        setItemArr(res.data.items);
      })
  },[]);

  const opts = {
    height: '390',
    width: '640',
    playerVars:{
      origin: 'http://localhost:3000',
      autoplay: 0,
      sandbox: 'allow-modals allow-forms allow-same-origin allow-scripts allow-popups',
    }
  }
  // const onReady = (event)=>{
  //   event.target.playVideo();
  // }
  return(
    <>
      <Header/>
      {itemArr ? 
      <>
        {itemArr.map((item)=>{
          return(
            <>
            <ReactPlayer 
              url={`https://www.youtube-nocookie.com/watch?v=${item.id.videoId}`}
              controls="true"
              config={{
                youtube:{ playerVars: {
                  sandbox: 'allor-presentation allow-modals allow-forms allow-same-origin allow-scripts allow-popups',
                }}
              }}
            />
            </>
          )
        })}
      </>:
        "Loading..."
      }
     

      {/* {itemArr && <>
        {itemArr.map((item)=>{
          return(
            <>
            {item.id}
            <YouTube
              key={item.id}
              videoId={item.id}                  // defaults -> ''
              opts={opts}                        // defaults -> {}
              // onReady={onReady}                    // defaults -> noop                 
            />
            </>
          )
        })}
      </>} */}
    </>
  )
}
export default UpperBody;
