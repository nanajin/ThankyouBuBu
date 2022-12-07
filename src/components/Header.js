import React, { useState } from "react";
import bubu_profile from "../img/bubu_profile.jpg";
import { useNavigate } from 'react-router-dom';
import NavBar from "./NavBar";

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
    // q = search;
    // console.log(q);
  }

  return(
    <>
      <div className="main_profile" onClick={onGoHome}>
        <img src={bubu_profile} alt="profile"/>
      </div>

      <NavBar/>

      <form onSubmit={onSearch}>
        <input type="text" placeholder="Search" value={search} onChange={onChange}/>
        <button>search</button>
      </form>

      <button onClick={onLogin}>Login</button>
    </>
    
  )
}
export default Header;