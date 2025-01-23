import axios from "axios";
import React, { useState } from "react";
import { BlinkBlur } from "react-loading-indicators";
import CIMBNiaga from './../../images/cimb.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ChangePassword = ()=>{
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordBefore, setPasswordBefore] = useState('')
    const [userId, setUserId] = useState('')

    const [loading,setLoading] = useState()
    
    const handleClick = ()=>{
        setLoading(true)
        axios.post('https://portal-auth-service-latest.onrender.com/auth/v1/user/change-password',{
            password:password,
            confirm_password:confirmPassword,
            password_before:passwordBefore,
        },{
            headers:{
                "user-id":userId
            }
        }).then(ee=>{
            if(ee?.data){

                toast("Berhasil Change Password")
            }
            // Nidzamk]\"{
            // NidzamGanteng1234
        })
        .catch((err)=>{
            alert(JSON.stringify(err?.response?.data?.meta))
        })
        .finally(()=>{
            setLoading(false)
        })
    }
    return(
        <div>
             {loading?<div style={{position:'fixed',zIndex:'99',background:'rgba(0,0,0,0.3)',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'30px',top:0,left:0,right:0,bottom:0}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <img alt="cimb" style={{width:'300px',marginBottom:'10px'}} src={CIMBNiaga}></img>
            <BlinkBlur color="#FF0000" size="large" text="" textColor="" />
            </div>
            </div>:""}
            <div >
                <label>User ID :</label>
                <input style={{width:'300px'}} value={userId} onChange={(e)=>{setUserId(e.target.value)}}></input>
            </div>
            <div >
                <label>Password Sekarang :</label>
                <input style={{width:'300px'}} value={passwordBefore} onChange={(e)=>{setPasswordBefore(e.target.value)}}></input>
            </div>
            <div >
                <label>Password :</label>
                <input style={{width:'300px'}} value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
            </div>
            <div >
                <label>Confirm Password :</label>
                <input style={{width:'300px'}} value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}></input>
            </div>
            
            <button onClick={()=>{handleClick()}}>Submit</button>   
                    <ToastContainer />
                 
        </div>
    )
}

export default  ChangePassword