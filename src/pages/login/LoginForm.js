import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import styles from "../../css/Login.module.css";

function LoginForm(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [pwdCheck, setPwdCheck] = useState(false);
  const [visiblePwd, setVisiblePwd] = useState(false);
  const [visiblePwd2, setVisiblePwd2] = useState(false);
  const [signUp, setSignUp] = useState(true);
  const navigate = useNavigate();
  const onChange = (event)=>{
    const {target: {name, value}} = event;
    if(name === "email"){
      setEmail(value);
    }
    else if(name === "password"){
      setPassword(value);
      if(password2 === value){
        setPwdCheck(true);
      }
      else{
        setPwdCheck(false);
      }
    }
  }
  const onPwdCheckChange = (event)=>{
    const {target: {value}} = event;
    setPassword2(value);
    if(value === password){
      setPwdCheck(true);
    }
    else{
      setPwdCheck(false);
    }
  }
  const onVisibleClick = (event)=>{
    event.preventDefault();
    const {target: {name}} = event;
    if(name === "pwd"){
      setVisiblePwd(prev => !prev);
    }
    else{
      setVisiblePwd2(prev => !prev);
    }
  }
  const onSubmit = async(event)=>{
    event.preventDefault();
    if(pwdCheck){
      if(signUp){
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
          const user = userCredential.user;
          alert("환영합니다");
          navigate("/");
        })
        .catch(e=>{
          alert(e.message);
        })
      }
      else{
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
          const user = userCredential.user;
          alert("환영합니다");
          navigate("/");
        })
        .catch(e=>{
          alert(e.message);
        })
      }
    }
    else{
      alert("비밀번호가 일치하지 않습니다.");
    }
  }
  const toggleAccount = ()=>{
    setSignUp((prev)=> !prev);
    setEmail("");
    setPassword("");
    setPassword2("");
  }

  return (
    <div className={styles.login_container}>
      <div>
        {signUp ? <h1>회원가입</h1>: <h1>로그인</h1>}
      </div>
      <form onSubmit={onSubmit} className={styles.login_form}>
        <input 
          name="email" 
          type="email" 
          placeholder="Email" 
          required
          value={email}
          onChange={onChange}
          className={styles.login_input}
        />
        <div>
          <input 
            name="password" 
            type={visiblePwd? "text": "password"} 
            placeholder="Password(6자리 이상)" 
            required
            value={password}
            onChange={onChange}
            className={styles.login_input}
            minLength={6}
          />
          <button onClick={onVisibleClick} name="pwd">visible</button>
        </div>
        <div>
          <input 
            name="password-check" 
            type={visiblePwd2? "text": "password"} 
            placeholder="Password Check" 
            required
            value={password2}
            onChange={onPwdCheckChange}
            className={styles.login_input}
          />
          <button onClick={onVisibleClick} name="check">visible</button>

        </div>
        {pwdCheck? 
          <p>비밀번호가 일치합니다.</p>:
          <p>비밀번호가 일치하지 않습니다.</p>
        }
        <br/>
        <input type="submit" value={signUp ? "Create Account": "Sign In"}/>

        {/* <button className={styles.login_submit}>
          {signUp ? "Create Account": "Sign In"}
        </button> */}
      </form>
      <span onClick={toggleAccount} className={styles.login_signin}>
        {signUp? "Sign In": "Create Account"}
      </span>
    </div>
  )
}
export default LoginForm;