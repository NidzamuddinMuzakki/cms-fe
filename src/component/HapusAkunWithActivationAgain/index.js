import axios from "axios";
import React, { useState } from "react";
import { BlinkBlur } from "react-loading-indicators";
import CIMBNiaga from './../../images/cimb.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReCAPTCHA from 'react-google-recaptcha'

const HapusAkunWithActivitationAgain = ()=>{
    const [token, setToken] = useState('')
    const [userId, setUserId] = useState('')

    const [loading,setLoading] = useState()
    
    const handleClick = ()=>{
        if(!token || !userId){
            toast.error("tolong banget isi data user id dan klik recaptcha")
            return
        }
        setLoading(true)
        axios.delete('https://portal-auth-service-latest.onrender.com/auth/v1/user/user-delete',{
            headers:{
                "user-id":userId
            }
        }).then(ee=>{
            axios.get('https://portal-auth-service-latest.onrender.com/auth/v1/user/user-details',{headers:{"user-id":userId}}).then(res=>{
                axios.post('https://portal-auth-service-latest.onrender.com/auth/v1/user/signup',{
                    email:res?.data?.data?.email,
                    full_name:"kl",
                    company_name:"k",
                    password:"NidzamGanteng12345",
                    password_confirm:"NidzamGanteng12345",

                    recaptcha:token,
                }).then(res=>{
                    toast.success("berhasil delete dan aktivasi user")
                }).catch(err=>{
                    alert(JSON.stringify(err?.response?.data?.meta))
                }).finally(()=>{
                    setLoading(false)
                })

            }).catch(err=>{
                alert(JSON.stringify(err?.response?.data?.meta))
                setLoading(false)
            }).finally(()=>{
              
            })

            // Nidzamk]\"{
            // NidzamGanteng1234
        })
        .catch((err)=>{
            alert(JSON.stringify(err?.response?.data?.meta))
            setLoading(false)
        })
        .finally(()=>{
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
            <ReCAPTCHA  onChange={(e)=>{setToken(e)}} sitekey={"6LeUsEEUAAAAALN2ScdGGV5xHJR78quyxjnM8Blt"} />
           
            
            <button onClick={()=>{handleClick()}}>Submit</button>   
                    <ToastContainer />
                 
        </div>
    )
}

export default  HapusAkunWithActivitationAgain