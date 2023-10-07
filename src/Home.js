import React, { useEffect, useRef, useState } from 'react';
import './Home.css';
import Leftbar from './Leftbar';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import './RED.gif'
import Backvideo from './Backvideo';
export default function Home() {

/*   let arr = ['insta1.mp4'];
 */  let user=['REDSHORTS'];
  const [arr, setArr] = useState(['insta1.mp4']);
  const [dnc,setDnc]=useState('');
  /* axios.get('http://localhost:8000/video/')
      .then((res) => {
        res.data.forEach(element => { */
/*           console.log(element.video);
 */          /* arr.push(element.video)
          arr=[...new Set(arr)] */
/*           console.log(arr)  
 */        /* });
        
      })
      .catch((error) => {
        console.log(error);
      }); */
      useEffect(() => {
        /* document.getElementById('homemain').style.display="none"
        setTimeout(() => {
        document.getElementById('backvideo').style.display="none"
        document.getElementById('homemain').style.display="inline"
        }, 6800); */
        axios.get('http://localhost:8000/video/')
          .then((res) => {
            const videoData = res.data.map(element => element.video);
            const uniqueVideos = [...new Set(videoData)];
            setArr(uniqueVideos);
            console.log(uniqueVideos);
          })
          .catch((error) => {
            console.log(error);
          });
          if(Cookies.get('username')){
            console.log('yes are safe')
          }
          else{
                  document.getElementById('yv').style.display="none"
                  document.getElementById('logout').style.display="none"
                  document.getElementById('like').style.display="none"
                  document.getElementById('leftbar').style.display="none"
                  let we=document.getElementById("wer").style;
                  we.display="none"
                  const currentURL = new URL(window.location.href);
                  currentURL.search = '';
                  currentURL.hash = '';
                  currentURL.pathname = '/';
                  window.history.replaceState({}, '', currentURL.toString());
          }
          
      }, []);
  const [count, setCount] = useState(0);
  const [videoSource, setVideoSource] = useState(arr[count]);
  const videoref = useRef(null);
  const [precount, setPrecount] = useState(0);
  const [status, setStatus] = useState(0);
  const [username,setUsername]=useState("REDSHORTS");
  const [number,setNumber]=useState(0)
  const [rotate,setRotate]=useState(0)
  const [sleep,setSleep]=useState(null)
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'ArrowDown' && status===1) {
        down();
      } else if (event.key === 'ArrowUp' && status===1 ) {
        up();
      }
      else if (event.key === ' ' && status===1 ) { 
        event.preventDefault();
        videoref.current.paused ? videoref.current.play() : videoref.current.pause();
      }
      else if(event.key === "m" && status===1 ){
        if(videoref.current.muted)
        videoref.current.muted=false;
        else{
          videoref.current.muted=true;
        }
      }
      else if(event.key==="H"){
        window.location.href="../"
      }
      else if(event.key==="Enter" && status===0){
        enter()
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [count]);
  function rotatery(){
    var r=document.getElementById("video").style;
        if(rotate===0){
        r.rotate="-90deg";
        r.transitionDuration="1s";
      var l=document.getElementById("like").style;
      l.top="80%";
          var bar=document.getElementById("leftbar").style;
          bar.left="-30%"
          bar.transitionDuration=".7s"
        setRotate(1)
        }
        else if(rotate===1){
        r.rotate="0deg"
        r.transitionDuration="1s";
        var l=document.getElementById("like").style;
      l.top="55%";
      var bar=document.getElementById("leftbar").style;
          bar.left="0%"
          bar.transitionDuration=".7s"
        setRotate(0)
        }
  }
  function enter(){
    setStatus(1)
        setCount(-1)
        let d=document.getElementById("video").style;
        setTimeout(() => {
        d.opacity="1"
        d.zIndex="1"
        d.transitionDuration="1s"
       let t= document.getElementById("enter").style; 
       t.opacity="0"
       t.transitionDuration="1s" 
       document.getElementById('up').style.display="inline"
              document.getElementById('down').style.display="inline"
              document.getElementById('like').style.display="inline"
              document.getElementById('rotate').style.display="inline"
        }, 1200);
  }
  function videosrc(src) {
    const newVideoSource = arr[src];
    setVideoSource(newVideoSource);
    setPrecount(src);
  }
  function down() {
    setCount(count + 1);
  }

  function downani(){
    let box=document.getElementById("video").style;
    box.top="-150px";
    box.left="900px";
    box.transitionDuration="1s";
    box.opacity="0";
    setTimeout(() => {
      box.top="800px";
      box.transitionDuration=".5s";
      box.opacity="0";
    }, 1000);
    setTimeout(() => {
      box.top="100px";
      box.transitionDuration=".5s";
      box.opacity="1"
    }, 1500);
  }

  function up() {
    console.log(count)
    setCount(count-1);
  }

  function upani(){
    let box=document.getElementById("video").style;
    box.top="800px";
    box.left="900px";
    box.transitionDuration="1s";
    box.opacity="0";
    setTimeout(() => {
      box.top="-150px";
      box.transitionDuration=".5s";
      box.opacity="0";
    }, 1000);
    setTimeout(() => {
      box.top="100px";
      box.transitionDuration=".5s";
      box.opacity="1"
    }, 1500);
  }

  useEffect(() => {
    if (count < 0) {
    console.log("<"+count)
      setCount(0);
    }
    else if (count >= arr.length) {
      setCount(count-1);
    }
    else {
      console.log(count+"else")
      if (precount < count) {
        downani();
      } else if (precount > count) {
        upani();
      }
      if (status === 0) {
        setStatus(1);
      }
      else {
        console.log(arr[count].indexOf("{"))
        checklike()
        setTimeout(() => {
          var l=document.getElementById("like").style;
          l.top="55%";
          if(rotate===1){
            rotatery()
          }
          videosrc(count);
          setUsername(arr[count].slice(0,arr[count].indexOf("{")))
          checklike(arr[count].slice(0,arr[count].indexOf("{")))
          if(!videoref.current.muted){
          setTimeout(() => {
            videoref.current.muted = false;
          }, 100);
        }
        }, 1300);
        let sleeptime=setTimeout(() => {
          if(!videoref.current.paused)
          down()
          else{
          videosrc(count)
          }
        }, 33000);
        setSleep(sleeptime)
      }
    }
    
  }, [count]);
  useEffect(()=>{
    clearTimeout(sleep)
  },[count])
  function mo(){
    document.getElementById("yv").style.opacity="1"
    document.getElementById("logout").style.opacity="1"
    document.getElementById("yv").style.transitionDuration=".9s"
    document.getElementById("logout").style.transitionDuration=".9s"
  }
  function ml(){
    document.getElementById("yv").style.opacity=".4"
    document.getElementById("logout").style.opacity=".4"
    document.getElementById("yv").style.transitionDuration=".9s"
    document.getElementById("logout").style.transitionDuration=".9s"
  }
  function logout(){
    window.localStorage.setItem('username','');
    Cookies.remove('username')
    window.location.href="../login"; 
  }
  function encryptData(data, key) {
    const encrypted = CryptoJS.AES.encrypt(data, key).toString();
    return encrypted;
  }
  function like(){
    if(dnc!=="null"){
    axios.post('http://localhost:8000/addlikes/',{
      "susername":dnc,
      "rusername":username,
      "video":arr[count]
    }).then((res)=>{
      console.log(res.data)
      setTimeout(() => {
        document.getElementById("like").style.color="red"
      document.getElementById("like").innerHTML="Liked"
      document.getElementById("like").disabled=true
      }, 500);
    })
  }
  else{
    window.location.href="../login"
  }
}
function decryptData(encryptedData, key) {
  const decrypted = CryptoJS.AES.decrypt(encryptedData, key).toString(CryptoJS.enc.Utf8);
  return decrypted;
}
  function checklike(user1){
    if(dnc!=="null"){
    axios.post('http://localhost:8000/checklikes/',{
      "susername":dnc,
      "rusername":user1,
      "video":arr[count]
    }).then((res)=>{
      if(res.data.likestatus==="liked")
      {
      document.getElementById("like").style.color="red"
      document.getElementById("like").innerHTML=res.data.count+"Liked"
      document.getElementById("like").disabled=true
    }
    else{
      document.getElementById("like").style.color="white"
      if(res.data.count==0){
        document.getElementById("like").innerHTML="Like"

      }
      else{
      document.getElementById("like").innerHTML=res.data.count+"Like"
      }
      document.getElementById("like").disabled=false
    }
    })
  }
  else{
    document.getElementById("like").style.display="none"
  }
}
  const [touchst, setTouchst] = useState('0px');
  const [touchen, setTouchen] = useState('0px');

  useEffect(() => {
    const touchstart = (e) => {
      [...e.changedTouches].forEach((touch) => {
        var dot = document.createElement('div');
        dot.classList.add('dot');
        dot.style.top = `${touch.pageY}px`;
        dot.style.left = `${touch.pageX}px`;
        dot.id = touch.identifier;
        document.getElementById('home').append(dot);
        setTouchst(dot.style.top);
      });
    };

    const touchend = (e) => {
      [...e.changedTouches].forEach((touch) => {
        var dot = document.getElementById(touch.identifier);
        setTouchen(dot.style.top);
        dot.remove();
      });
    };

    const touchmove = (e) => {
      [...e.changedTouches].forEach((touch) => {
        var dot = document.getElementById(touch.identifier);
        dot.style.top = `${touch.pageY}px`;
        dot.style.left = `${touch.pageX}px`;
      });
    };
    axios.get('http://localhost:8000/key/').then((res)=>{
      const params = new URLSearchParams(window.location.search);
      const usernn = params.get('encu');
      console.log(usernn)
      if(usernn!==null){
      let dnce=decryptData(usernn,res.data[0].key)
      setDnc(dnce)
      if(dnce === Cookies.get('username')){
      document.getElementById('homebtn').addEventListener('click',()=>{
        window.location.href="../?encu="+usernn;
      })
      /* document.getElementById('upload').addEventListener('click',()=>{
        let ence=encryptData(dnce,res.data[1].key)
        window.location.href="../upload?encu="+ence;
      }) */
    }
    else{
      Cookies.remove('username')
      window.location.href="../"
    }
      }
      else if(usernn=="guest"){
        setDnc('null')
      }
      else{
        setDnc('null')
        console.log("null1")
      }
      if(usernn!==null){
        document.getElementById('checkdiv').style.display="none";
        document.getElementById("wer").className="sbtn";
        let we=document.getElementById("wer").style;
        we.transform="skewx(0deg)";
      }
      else{
        document.getElementById('yv').style.display="none"
        document.getElementById('logout').style.display="none"
        document.getElementById('like').style.display="none"
        document.getElementById('leftbar').style.display="none"
        let we=document.getElementById("wer").style;
        we.display="none"
      }
    })
    
    document.addEventListener('touchstart', touchstart);
    document.addEventListener('touchend', touchend);
    document.addEventListener('touchmove', touchmove);
    if(status===0){
      setTimeout(()=>{
        enter()
      },1000)
    }
    
    
      return () => {
      document.removeEventListener('touchstart', touchstart);
      document.removeEventListener('touchend', touchend);
      document.removeEventListener('touchmove', touchmove);
    };
  }, []);

  useEffect(() => {
    if (parseInt(touchen) > parseInt(touchst)&& parseInt(touchen)-parseInt(touchst)>=100) {
      return up();
    } else if (parseInt(touchen) < parseInt(touchst)&& parseInt(touchst)-parseInt(touchen)>=100) {
      return down();
    }
  }, [touchen]);
  return (
    <div className='home' id='home' >
    {/* <Backvideo/> */}
    <div className='homemain' id='homemain' >
    <div className='checkdiv' id='checkdiv' >
    <a href='../login' ><button className='lbtn' id='lbtn' >Login</button></a>
    <a href='../signup' ><button className='sbtn' id='sbtn' >Signup</button></a>
    </div>
      <Leftbar id="leftbar" />
      <div>
        <button onClick={up} className="up" id='up'>
          ^
        </button>
        <button onClick={down} className="down" id='down' >
          ^
        </button>
        <button onClick={rotatery} className='rotate' id='rotate' >
        Rotate
        </button>
        </div>
      <div className="title">
        <center>
          <h1>{username}</h1>
        </center>
        
        <a href='../settings'  ><button id='wer' onMouseOver={mo}>{dnc}</button></a>
        <div className='wert' onMouseLeave={ml} >
        <a href='../yourvideos' ><button style={{fontSize:"20px",opacity:".4"}} id='yv' onMouseOver={mo} >Your videos</button></a>
        <a><button style={{marginTop:"80px",opacity:".4"}} id='logout' onClick={logout}  onMouseOver={mo} >Logout</button></a>
        </div>
      </div>
      <div id="videobox">
        <center>
          <div><button style={{position:"absolute",top:"50%",left:"47%",borderRadius:"10px",width:"max-content",height:"max-content",padding:"10px"}} id='enter' onClick={enter} >Enter</button></div>
          <video onLoadStart={(e)=>{
            if(status===0){
              document.getElementById('video').style.opacity="0"
              document.getElementById('video').style.zIndex="-1"
              document.getElementById('video').style.top="-100%"
              document.getElementById('up').style.display="none"
              document.getElementById('down').style.display="none"
              document.getElementById('like').style.display="none"
              document.getElementById('rotate').style.display="none"
            }
          }}
            ref={videoref}
            id="video"
            autoPlay
            muted
            loop
            onClick={(e) => {
              e.target.muted = !e.target.muted;
            }}
            onDoubleClick={(e) => {
              e.target.paused ? e.target.play() : e.target.pause();
            }}
            key={videoSource}
          >
            <source src={require('./videos/' + videoSource)} type="video/mp4" />
          </video>
          <button className='like' id='like' onClick={like} >Like</button>
        </center>
        <div>
        </div>
      </div>
      </div>
    </div>
  );
}
