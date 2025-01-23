import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { BlinkBlur } from "react-loading-indicators";
import CIMBNiaga from './../../images/cimb.png'
import ReCAPTCHA from 'react-google-recaptcha'

const LoginPage =()=>{
    const [token, setToken] = useState('')
    const [loading,setLoading] = useState(false)
    const [state,setState] = useState({
        email:'',
        password:'',
    })
    const handleChange = (e)=>{
        setState((datass)=>{
            return {...datass,[e.target.name]:e.target.value}
        })
    }
    const handleSubmit = ()=>{
        setLoading(true)
        axios.post(`https://portal-auth-service-latest.onrender.com/auth/v1/user/login`,{
            email:state.email,
            password:state.password,
            recaptcha:token,
        }).then((res)=>{
            if(res?.data){
                toast("Login Berhasil")
            }
            console.log(res.data)
        }).catch(err=>{
            alert(JSON.stringify(err?.response?.data?.meta))
            console.log(err)
        }).finally(()=>{
        setLoading(false)

        })
    }
    const handleLogout = ()=>{
        axios.post(`https://portal-auth-service-latest.onrender.com/auth/v1/user/logout`,{
            email:state.email,
            password:state.password
        }).then((res)=>{
            console.log(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }
    const handleGetData = ()=>{
        axios.get(`https://portal-auth-service-latest.onrender.com/auth/v1/user/user-details`,{withCredentials:true}).then((res)=>{
            console.log(res.data)
        }).catch(err=>{
            console.log(err)
            handleGetDataRfresh()
        })
    }

    const handleGetDataRfresh = ()=>{
        axios.post(`https://portal-auth-service-latest.onrender.com/auth/v1/user/refresh-token`,{},{withCredentials:true}).then((res)=>{
            console.log(res.data)
        }).catch(err=>{
            console.log(err)
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
            <input type="email" onChange={handleChange} value={state.email} name="email"></input>
            <input type="password" onChange={handleChange} value={state.password} name="password"></input>
            {/* <textarea value={state.token} onChange={handleChange}  name="token" ></textarea> */}
            <button onClick={()=>{handleSubmit()}} >Submit</button>
            <button onClick={()=>{handleLogout()}} >Logout</button>
            <button onClick={()=>{handleGetData()}} >GetData</button>
            <button onClick={()=>{handleGetDataRfresh()}} >Refresh Token</button>
            <ReCAPTCHA  onChange={(e)=>{setToken(e)}} sitekey={"6LeUsEEUAAAAALN2ScdGGV5xHJR78quyxjnM8Blt"} />

                                <ToastContainer />
            
        </div>
    )
}

export default LoginPage