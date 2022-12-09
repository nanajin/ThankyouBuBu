import React, { useState } from "react";
import logo from "../img/logo.jpg";
import { useNavigate } from 'react-router-dom';
import NavBar from "./NavBar";
import styles from "../css/Header.module.css";
import {GoSearch} from 'react-icons/go';
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Login from "../pages/Login";

function Header({user}){
  const navigate = useNavigate();
  const [search, setSearch] = useState();
  const [popUp, setPopUp] = useState(false);

  const onLogin = ()=>{
    // setPopUp((prev)=>!prev);
    navigate("/login");
  }
  const onGoHome = ()=>{
    navigate("/");
  }
  const onChange = (event)=>{
    const {target: {value}} = event;
    setSearch(value);
  }
  const onSearch = (event)=>{
    event.preventDefault();
    navigate(`/search/${search}`);
  }
  const onLogOut = ()=>{
    const ok = window.confirm("로그아웃 하시겠습니까?");
    if(ok){
      signOut(auth).then(()=>{
        navigate("/");
        }).catch(e=>{
          alert(e);
      })
    };
  }
  return(
    <div className={styles.header}>
      <div className={styles.main_logo} onClick={onGoHome}>
        <img src={logo} alt="logo"/>
      </div>
        <NavBar/>
      <form onSubmit={onSearch} className={styles.search_form}>
        <input type="text" placeholder="Search" value={search} onChange={onChange}/>
        <button><GoSearch/></button>
      </form>
      {user? 
        <div>
          {user.displayName} 
          <button onClick={onLogOut}>LogOut</button>
        </div>:
        <button onClick={onLogin}>Login</button>
      }
    </div>
    
  )
}
export default Header;