import React, { useEffect, useState } from 'react'
import Leftbar from './Leftbar'
import axios from 'axios'
import Cokkies from 'js-cookie';
import CryptoJS from 'crypto-js';
import './yourvideo.css'
import Cookies from 'js-cookie';
function Yourvideo() {
  const [arr,setArr]=useState(['insta1.mp4'])
  const [state,setState]=useState(null)
    useEffect(()=>{
      if(Cookies.get('status')==="1"){
        axios.post('http://localhost:8000/yourvideos/',{data:Cokkies.get('username')}).then(res=>{
          const videoData = res.data.map(element => element.video);
          const uniqueVideos = [...new Set(videoData)];
          setArr(uniqueVideos)
          console.log(uniqueVideos)
          res.data.forEach(element => {
            console.log(element)   
            var e = document.createElement("video");
          e.src =require('./videos/'+ element.video);
          e.autoplay=true
          e.muted=true
          e.loop=true
          e.className="yvideo"
         document.getElementById("videos").appendChild(e); 
         Cookies.set('status',0)        
          });
          
        }).catch(err=>console.log(err))
      }
      else{
        console.log(typeof(Cookies.get('status')))
        Cookies.set('status',1)
      }
      
    },[])
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
    <div className='tvideo' >
        <div>
            <Leftbar />
        </div>
        <div id='videos' > 
        <div><center><h1>Your Videos</h1></center></div>

        </div>
    </div>
  )
}

export default Yourvideo