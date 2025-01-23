import axios from "axios";
import React, { useState } from "react";
import { BlinkBlur } from "react-loading-indicators";
import CIMBNiaga from './../../images/cimb.png'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const ResetPassword = ()=>{
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [loading,setLoading] = useState()

    const [token, setToken] = useState('')

    const handleClick = ()=>{
        setLoading(true)
        axios.post('https://portal-auth-service-latest.onrender.com/auth/v1/user/reset-password',{
            password:password,
            confirm_password:confirm,
            token:token,
        }).then(res=>{
            if(res?.data){
                toast("Berhasil Reset Password")

            }
                }).catch(err=>{
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
            <label>Passowrd :</label>
            <input style={{width:'300px'}} value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
            <label>Confirm Password :</label>
            <input style={{width:'300px'}} value={confirm} onChange={(e)=>{setConfirm(e.target.value)}}></input>
            <label>Token :</label>
            <input style={{width:'300px'}} value={token} onChange={(e)=>{setToken(e.target.value)}}></input>
            
            <button onClick={()=>{handleClick()}}>Submit</button> 
                    <ToastContainer />
                   
        </div>
    )
}

export default  ResetPassword