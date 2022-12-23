import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Login from "../login/Login";
import styles from "../../css/Community.module.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

function Writing({user}){
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  // const [post, setPost] = useState({});
  // console.log(new Date());
  const onChange = (event)=>{
    const {target: {value, name}} = event;
    if(name === "title"){
      setTitle(value);
    }
    else{
      setContents(value);
    }
    // console.log(value);
  }
  const onSubmit = async(event)=>{
    event.preventDefault();
    const post = {
      title: title,
      contents: contents,
      writer: user.displayName,
      date: Date.now(),
      uid: user.uid,
    }
    try{
      const docRef = await addDoc(collection(db, "writing"), post);
      alert("글 게시에 성공하였습니다")
    }
    catch(e){
      console.log(e);
    }
    navigate(-1);
  }

  return(
    <>
    <Header/>
    {user?
      <form onSubmit={onSubmit} className={styles.write_form}>
        <input type="text" placeholder="title" name="title"
          onChange={onChange} className={styles.write_title}/>
        <textarea placeholder="contents" name="contents"
          onChange={onChange} className={styles.write_contents}></textarea>
        <input type="submit" value="Submit" className={styles.submit_btn}/>
      </form>:
      <Login/>
    }
    <Footer/>
    </>
  )
}
export default Writing;