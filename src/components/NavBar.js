import React from "react";
import { Link } from "react-router-dom";
function NavBar(){
  return(
    <>
    <ul>
      <Link to="/fullbody">
        <li>전신 운동</li>
      </Link>
      <Link to="/upperbody">
        <li>상체 운동</li>
      </Link>
      <ul>
        <li>뱃살 운동</li>
        <li>팔뚝살 운동</li>
      </ul>
      <li>하체 운동</li>
      <ul>
        <li>허벅지 운동</li>
        <li>종아리 운동</li>
      </ul>
      <li>스트레칭</li>
    </ul>
    </>
  )
}
export default NavBar;