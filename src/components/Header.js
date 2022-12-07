import React, { useState } from "react";
import logo from "../img/logo.jpg";
import { useNavigate } from 'react-router-dom';
import NavBar from "./NavBar";
import styles from "../css/Header.module.css";
import {GoSearch} from 'react-icons/go';

function Header(){
  const navigate = useNavigate();
  const [search, setSearch] = useState();
  let q;

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
      <button onClick={onLogin}>Login</button>
    </div>
    
  )
}
export default Header;