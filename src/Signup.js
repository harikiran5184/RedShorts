import React, { useState } from 'react'
import './login.css'
import axios from 'axios'
function Signup() {
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [phone,setPhone]=useState('')
    function login(e){
        e.preventDefault()
        console.log(username,password,phone)
        axios.post('http://localhost:8000/signup/',{"username":username,"password":password,"phone":phone}).then((res)=>{
            if(res.data==="signup success"){
                window.location.href="../login"
            }
            else{
                console.log(res.data)
            }
        })
        
    }
  return (
    <div className='login' >
        <div>
        <center>
            <form onSubmit={login} >
            <div style={{paddingTop:"200px"}} ></div>
                <label style={{marginLeft:"-180px"}} >Username:</label><br/>
                <input type='text' name='username' placeholder='Enter your username' onChange={(e)=>{setUsername(e.target.value)}} required  ></input><br/>
                <label style={{marginLeft:"-180px"}} >Phone no:</label><br/>
                <input type='text' name='phone' maxLength={10} minLength={10} placeholder='Enter Your PhoneNumber' onChange={(e)=>setPhone(e.target.value)} required ></input><br/>
                <label style={{marginLeft:"-180px"}} >Password:</label><br/>
                <input type='password' name='password' placeholder='Enter your password' onChange={(e)=>{setPassword(e.target.value)}} required ></input><br/>
                <button type='submit' >Signup</button>
            </form>
            </center>
        </div>
    </div>
  )
}

export default Signup