import React, { useEffect, useState } from 'react';
import Leftbar from './Leftbar';
import './upload.css';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import axios from 'axios';
export default function Upload() {
  const [dnc,setDnc]=useState('')
  if(Cookies.get('username')){
    console.log('yes are safe')
  }
  else{
    window.location.href='../login'
  }
  function encryptData(data, key) {
    const encrypted = CryptoJS.AES.encrypt(data, key).toString();
    return encrypted;
  }
  const [selectedFile, setSelectedFile] = useState(null);
  const username = window.localStorage.getItem('username');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    const path = (window.URL || window.webkitURL).createObjectURL(file);
    // Log the file path and file name
    console.log('File Path:', path);
    console.log('File Name:', file.name);
  };

  const handleUpload = () => {
    axios.get('http://localhost:8000/key/').then((res)=>{
      /* const params = new URLSearchParams(window.location.search);
      const usernn = params.get('encu');
      if(usernn!==null){
      let dnce=decryptData(usernn,res.data[1].key)
      setDnc(dnce)
      }
      else{
        setDnc('null')
      } */
    if(Cookies.get('username')!=='null')
    {
      console.log(dnc)
    if (selectedFile) {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        const duration = Math.floor(video.duration);
        if (duration > 40) {
          alert('Video duration exceeds 30 seconds. Please select a shorter video.');
        } else {
          const formData = new FormData();
          formData.append('file', selectedFile);
          formData.append('username', username); // Include the username in the FormData

          // Make an HTTP request to upload the file
          fetch('http://localhost:8000/upload/', {
            method: 'POST',
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              // Handle the response from the server
              if(data.message==='File uploaded successfully.'){
                document.getElementById('homebtn').click()
              }
            })
            .catch((error) => {
              // Handle any error that occurred during the upload
              console.error(error);
            });
        }
      };

      video.src = URL.createObjectURL(selectedFile);
    }
  }
  else{
    Cookies.remove('username')
    window.location.href="../login"
  }
  })
};
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
    <div className="Upload">
      <div>
        <Leftbar />
      </div>
      <center>
        <div className="man">
          <h1 style={{ textShadow: '1px 1px 100px red', color: 'red', fontSize: '50px' }}>Upload</h1>
          <label style={{ marginLeft: '-150px' }}>
            <h2 style={{ padding: '0', margin: '0', marginTop: '30px' }}>Select Video:</h2>
          </label>
          <br />
          <input type="file" onChange={handleFileChange} required />
          <br />
          <button onClick={handleUpload}>Upload</button>
        </div>
      </center>
    </div>
  );
}
