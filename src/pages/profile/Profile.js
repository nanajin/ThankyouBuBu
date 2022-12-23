import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import {FaUserCircle} from 'react-icons/fa';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';
import styles from '../../css/Profile.module.css';

const Profile = ({user}) => {
  const [data, setData] = useState([]);
  let myList = [];
  const getMyData = async()=>{
    const q = query(collection(db, "writing"), where("writer","==",user.displayName));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc)=>{
      myList.push({
        docId: doc.id,
        ...doc.data(),
      });
    });
    setData(myList);
  }
  useEffect(()=>{
    getMyData();
  },[]);
  return (
    <div>
      <Header/>
      <div className={styles.profile_container}>
        <FaUserCircle className={styles.profile_icon}/>
        <h2>{user.displayName}님 환영합니다!</h2>
        <div className={styles.my_story}>
        <p>내가 쓴 글</p>
        {data.map((item,index)=>{
          const date = new Date(item.date);
          return(
            <Link to={`/details/${item.docId}`} state={{item: item}}>
              <div key={index} className={styles.link_box}>
                {item.title}
                <p>{date.getFullYear()}-{date.getMonth()+1}-{date.getDate()} {date.getHours()}:{date.getMinutes()}</p>
              </div>
            </Link>   
          )})
        }
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Profile;