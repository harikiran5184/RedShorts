import React, { useEffect, useState } from 'react'
import Leftbar from './Leftbar'
import Cokkies from 'js-cookie';
import axios from 'axios'
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import './settings.css'
function Settings() {
    const [name,setName]=useState('')
    const [password,setPassword]=useState('')
    useEffect(()=>{
        axios.post('http://localhost:8000/settings/',{data:Cokkies.get('username'),status:0}).then(res=>{
            console.log(res.data)
            document.getElementById('name').value=res.data[0].name
            document.getElementById('password').value=res.data[0].password
        }).catch(err=>{console.log(err)})
    },[])
    function sub(e){
        e.preventDefault()
        let us=document.getElementById('name').value;
         let pas=document.getElementById('password').value;
        axios.post('http://localhost:8000/settings/',{data:Cokkies.get('username'),password:pas,status:1}).then(res=>{
            console.log(res.data)
        })
    }
    function encryptData(data, key) {
        const encrypted = CryptoJS.AES.encrypt(data, key).toString();
        return encrypted;
      }
      function decryptData(encryptedData, key) {
        const decrypted = CryptoJS.AES.decrypt(encryptedData, key).toString(CryptoJS.enc.Utf8);
        return decrypted;
      }
      useEffect(()=>{
        const key=axios.get('http://localhost:8000/key/').then((res)=>{
              var username=Cookies.get('username')
              let enc=encryptData(username,res.data[0].key)
              let data={encu:enc};
              const string=new URLSearchParams(data).toString()
              document.getElementById('homebtn').addEventListener("click",()=>{
                window.location.href=`../?${string}`
              })
              const params = new URLSearchParams(window.location.search);
                const usernn = params.get('encu');
                let che=decryptData(usernn,res.data[1].key)
                if(usernn===null || Cookies.get('username')!==che){
                  window.location.href=`../?${string}`
                }
                else{
                  console.log('its not working')
                }
            })
            
      },[])
  return (
    <div className='settings' >
    <center><h1>Settings</h1></center>
        <div>
            <Leftbar />
        </div>
        <div className='account' > 
        <center style={{paddingTop:"30px"}} >
        <h1>Account Settings</h1>
            <label  >Name:</label>
            <input type='text' id='name' disabled placeholder='Enter your Name' onChange={e=>setName(e.target.event)} ></input><br/>
            <label>Password:</label>
            <input type='password' id='password' placeholder='Enter your Password' onChange={e=>setPassword(e.target.event)} ></input>
            <input type='submit' value={"change"} onClick={sub} ></input>
            </center>
        </div>
    </div>
  )
}

export default Settings