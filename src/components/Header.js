import React, { useState } from "react";
import logo from "../img/logo.jpg";
import { Link, useNavigate } from 'react-router-dom';
import NavBar from "./NavBar";
import styles from "../css/Header.module.css";
import {GoSearch} from 'react-icons/go';
import {FaUserCircle} from 'react-icons/fa';
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Login from "../pages/login/Login";

function Header(){
  const navigate = useNavigate();
  const [search, setSearch] = useState();
  const user = auth.currentUser;
  const onLogin = ()=>{
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
        <div className={styles.profile}>
          <Link to="/profile" className={styles.profile_icon}><FaUserCircle/></Link>
          <p>{user.displayName}</p>
          <button onClick={onLogOut} className={styles.log_btn}>LogOut</button>
        </div>:
        <button onClick={onLogin} className={styles.log_btn}>Login</button>
      }
    </div>
    
  )
}
export default Header;