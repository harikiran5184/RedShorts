import React from 'react'
import './leftbar.css'
function Leftbar() {
  let t=1
  function slider(){
    if(t===0){
    let lefte=document.getElementById("leftbar").style;
    lefte.position="fixed"
    lefte.left="-200px";
    lefte.transitionDuration="1s";
    let sliderbtn=document.getElementById("sliderbtn").style;
    sliderbtn.position="fixed";
    sliderbtn.left="0px";
    sliderbtn.transitionDuration="1s"
    sliderbtn.rotate="90deg"
    sliderbtn.borderRadius="50px 50px 0px 0px"
    t=1
    }
    else{
      let lefte=document.getElementById("leftbar").style;
    lefte.position="fixed"
    lefte.left="0px";
    lefte.transitionDuration="1s";
    let sliderbtn=document.getElementById("sliderbtn").style;
    sliderbtn.position="fixed";
    sliderbtn.left="150px";
    sliderbtn.transitionDuration="1s"
    sliderbtn.rotate="270deg"
    sliderbtn.borderRadius="0px 0px 50px 50px"
    t=0
    setTimeout(() => {
      slider()
    }, 7000);
    }
  }
  return (
    <div  >
        <div className='leftbar' id='leftbar' >
            <a><button className='lee' id='homebtn' >Home</button></a>
            <a><button className='lee' >Search</button></a>
            <a href='../upload' ><button className='lee' id='upload' >Upload Videos</button></a>
            <a><button className='lee' >Profile</button></a>
            <a href='../settings' ><button className='lee' >Settings</button></a>
        </div>
        <button className='sliderbtn' id='sliderbtn' onClick={slider} ><h1>^</h1></button>
    </div>
  )
}

export default Leftbar