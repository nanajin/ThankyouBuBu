import React from "react";
import { GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { auth } from "../../firebase";
import LoginForm from "./LoginForm";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Login(){
  const onSocialClick = async(event)=>{
    const {target: {name}} = event;
    const provider = new GoogleAuthProvider();

    if(name === "google"){
      await signInWithPopup(auth, provider)
      .then((result)=>{
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      }).catch(e=>{
        console.log(e);
      })
    }
  }

  return (
    <div className="LoginContainer">
      <Header/>
      <LoginForm/>
      <div className="LoginBtns">
        <button name="google" onClick={onSocialClick} className="LoginBtn">
          Continue with Google
        </button>
      </div>
      <Footer/>
    </div>
  )
}
export default Login;