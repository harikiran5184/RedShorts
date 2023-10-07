/* import React from 'react'
import {Player} from 'video-react'
import insta from './insta.mp4'
export default function Scroll() {
  return (
    <div>
      <Player>
      <source src={insta} />
      </Player>
    </div>
  )
}
 */
import React, { useEffect, useRef, useState } from 'react';
import './Home.css';
import Leftbar from './Leftbar';

export default function Scroll() {
  let arr = ['insta.mp4', 'insta1.mp4'];
  const [count, setCount] = useState(0);
  const [videoSource, setVideoSource] = useState(arr[count]);
  const videoref = useRef(null);
  const [precount, setPrecount] = useState(0);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'ArrowDown') {
        down();
      } else if (event.key === 'ArrowUp') {
        up();
      }
      else if (event.key === ' ') { 
        event.preventDefault();
        videoref.current.paused ? videoref.current.play() : videoref.current.pause();
      }
      else if(event.key === "m"){
        if(videoref.current.muted)
        videoref.current.muted=false;
        else{
          videoref.current.muted=true;
        }
      }
      else if(event.key==="H"){
        window.location.href="../"
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
    setCount(count - 1);
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
      setCount(0);
    } else if (count > 1) {
      setCount(1);
    } else {
      if (precount < count) {
        downani();
      } else if (precount > count) {
        upani();
      }
      if (status === 0) {
        videosrc(count);
        setStatus(1);
      } else {
        setTimeout(() => {
          videosrc(count);
          if(!videoref.current.muted){
          setTimeout(() => {
            videoref.current.muted = false;
          }, 100);
        }
        }, 1300);
      }
    }
  }, [count]);
  return (
    <div>
      {/* <input
        type="text"
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            down();
          } else if (e.key === 'ArrowUp') {
            up();
          }
        }}
      /> */}
      <Leftbar />
      <div>
        <button onClick={up} className="up">
          ^
        </button>
        <button onClick={down} className="down">
          ^
        </button>
      </div>
      <div className="title">
        <center>
          <h1>USER</h1>
        </center>
      </div>
      <div id="videobox">
        <center>
          <video
            ref={videoref}
            id="video"
            autoPlay
            muted
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
        </center>
      </div>
    </div>
  );
}
