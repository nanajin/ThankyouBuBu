import React from "react";
import Header from "../components/Header";

function FullBody(){
  const embedLink = [
    {
      id: 1,
      src:"https://www.youtube.com/embed/UYHfk45Yi2c"},
    { 
      id:2,
      src:"https://www.youtube.com/embed/dJXZRZvqbYg"},
    {
      id:3,
      src:"https://www.youtube.com/embed/54tTYO-vU2E"}
  ]
  return(
    <>
    <Header/>
      <iframe
        width="560" 
        height="315" 
        src="https://www.youtube.com/embed/VNQpP6C1fJg" 
        title="YouTube video player" 
        frameBorder="0" 
        allow="accelerometer; 
              autoplay; 
              clipboard-write; 
              encrypted-media; 
              gyroscope; 
              picture-in-picture" 
        allowFullScreen>
      </iframe>
    </>
  )
}
export default FullBody;