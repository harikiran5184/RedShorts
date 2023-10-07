import React, { useEffect, useState } from 'react';
import './login.css';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import Cokkies from 'js-cookie';
import sound from './sound.mp3'
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  function encryptData(data, key) {
    const encrypted = CryptoJS.AES.encrypt(data, key).toString();
    return encrypted;
  }
  async function login(e) {
    e.preventDefault();
    console.log(username, password);
    try {
      const res = await axios.post('http://localhost:8000/', { username, password });
      if (res.data.username === 'No Login') {
        document.getElementById("cond").innerHTML='!!!Check your username or Password';
        console.log('Your Password is Wrong');
      } else {
        const key=axios.get('http://localhost:8000/key/').then((res)=>{
          console.log(res.data[0].key)
          document.querySelector(".login .logbox").style.opacity=0;
          document.getElementById("video").style.display="block"
          document.querySelector("#audio").src=sound;
          setTimeout(() => {
          window.localStorage.setItem('username', username);
          Cokkies.set('username',username,{expires:1})
          let enc=encryptData(username,res.data[0].key)
          let data={encu:enc};
          const string=new URLSearchParams(data).toString()
          window.location.href=`../?${string}`
          }, 7000);
        })
        
      }
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    if (window.innerWidth < 600) {
      document.getElementById('cbtn').style.left = '100px';
    } else {
      document.getElementById('cbtn').style.left = '1110px';
    }
  }, []);
  return (
    <div className="login" id='login' >
      <div className='logbox' >
        <center>
          <form onSubmit={login} className="flogin">
            <div>
              <h1>REDSHORTS</h1>
              <h1>LOGIN</h1>
              <h1 id='cond' style={{fontSize:"20px",fontStyle:"oblique"}} ></h1>
            </div>
            <label style={{ marginLeft: '-180px' }}>Username:</label>
            <br />
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></input>
            <br />
            <label style={{ marginLeft: '-180px' }}>Password:</label>
            <br />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
            <br />
            <button type="submit">Login</button>
            <br />
          </form>
          <a href="../">
            <button id="cbtn">continue without login</button>
          </a>
        </center>
      </div>
      <div id='video' style={{width:"100%",height:"100vh"}}  >
      <audio id='audio' autoPlay  ></audio>
      </div>
    </div>
  );
}

export default Login;
