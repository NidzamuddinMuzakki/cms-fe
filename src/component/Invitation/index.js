import axios from "axios";
import React, { useState } from "react";
import { BlinkBlur } from "react-loading-indicators";
import CIMBNiaga from './../../images/cimb.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Invitation = ()=>{

    const [email, setEmail] = useState('')

    const [loading,setLoading] = useState()
    
    const handleClick = ()=>{
        setLoading(true)
        // 
        axios.post('https://portal-auth-service-latest.onrender.com/auth/v1/user/send-invitation',{
          email:email
        },{
            headers:{
                "user-id":"nidzam"
            }
        }).then(ee=>{
            if(ee?.data){

                toast.success("Berhasil Send Email")
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
                <label>Email :</label>
                <input style={{width:'300px'}} value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
            </div>
           
            <button onClick={()=>{handleClick()}}>Submit</button>   
                    <ToastContainer />
                 
        </div>
    )
}

export default  Invitation