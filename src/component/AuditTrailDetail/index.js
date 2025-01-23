import axios from "axios";
import React, { useEffect, useState } from "react";
import { BlinkBlur } from "react-loading-indicators";
import { useNavigate, useParams } from "react-router-dom";
import CIMBNiaga from './../../images/cimb.png'
const DetailAuditTrail =()=>{
    const {id} = useParams()
    const [loading,setLoading] = useState()
    const navigate = useNavigate()
    // const [errros,setErrors] = useState()
    console.log(id)
    // const [staticTypeId,setStaticTypeId] = useState(0)
   
    const [state,setState] = useState({
        id:0,
        user_id:"",
        object_id:"",
        event_type:"",
        module_name:"",
        method:"",
        path:"",
        request:"",
        response:"",
        timestamp:"",
        
    })
    
    useEffect(()=>{
        if(id){
            setLoading(true)
            axios.get(`https://portal-audit-trail-service.onrender.com/ats/v1/audit-trail/detail/${id}`).then(res=>{
                if(res?.data?.data){
                    let data = res?.data?.data
                    // setStaticTypeId(data?.pc_page_type_id)
                    setState((sss)=>{return{...sss,
                        id:data.id,
                        object_id:data.object_id,
                        user_id:data.user_id,

                        event_type:data.event_type,
                        module_name:data.module_name,
                        method:data.method,
                        path:data.path,
                        request:data.request,
                        response:data.response,
                        timestamp:data.timestamp,
                      
                    
                    }})
                }else{
                    console.log(res)
                }
               
            }).catch(err=>{
                console.log(err)
            }).finally(()=>{
                setLoading(false)

            })
        }
    },[id])

   
    
    return(
        <div style={{margin:'10px 10px 10px 10px'}}>
            <div style={{marginTop:'20px',marginBottom:'20px',display:'flex',justifyContent:'start',marginLeft:'20px'}}>
               
                <div onClick={()=>{navigate(`/audit-trail`)}} style={{cursor:'pointer', padding:'10px 10px', borderRadius:'10px', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>List Audit Trail</div>
                {/* <div onClick={()=>{navigate(`/listofpage/${state?.pc_page_type_id}`)}} style={{marginLeft:'20px',cursor:'pointer', padding:'10px 10px', borderRadius:'10px', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>List Page</div> */}
            
            </div>
            {loading?<div style={{position:'fixed',zIndex:'99',background:'rgba(0,0,0,0.3)',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'30px',top:0,left:0,right:0,bottom:0}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <img alt="cimb" style={{width:'300px',marginBottom:'10px'}} src={CIMBNiaga}></img>
            <BlinkBlur color="#FF0000" size="large" text="" textColor="" />
            </div>
            </div>:""}
           
            <div style={{display:'flex',alignItems:'center', gap:'50px'}}>
                <div style={{width:'300px'}}>ID :</div>
                <input  style={{width:'500px'}} type="text" name="" value={state.id}></input>
            </div>
          
            <div style={{display:'flex',alignItems:'center', gap:'50px'}}>
                <div style={{width:'300px'}}>User ID :</div>
                <input style={{width:'500px'}}  type="text" name="" value={state.user_id}></input>
            </div>
            <div style={{display:'flex',alignItems:'center', gap:'50px'}}>
                <div style={{width:'300px'}}>Object ID :</div>
                <input style={{width:'500px'}}  type="text" name="" value={state.object_id}></input>
            </div>
            <div style={{display:'flex',alignItems:'center', gap:'50px'}}>
                <div style={{width:'300px'}}>Event Type :</div>
                <input style={{width:'500px'}}  type="text" name="" value={state.event_type}></input>
            </div>
            <div style={{display:'flex',alignItems:'center', gap:'50px'}}>
                <div style={{width:'300px'}}>Module Name :</div>
                <input  style={{width:'500px'}} type="text" name="" value={state.module_name}></input>
            </div>
            <div style={{display:'flex',alignItems:'center', gap:'50px'}}>
                <div style={{width:'300px'}}>Method :</div>
                <input  style={{width:'500px'}} type="text" name="" value={state.method}></input>
            </div>
            <div style={{display:'flex',alignItems:'center', gap:'50px'}}>
                <div style={{width:'300px'}}>Path :</div>
                <input  style={{width:'500px'}} type="text" name="" value={state.path}></input>
            </div>
            <div style={{display:'flex',alignItems:'center', gap:'50px'}}>
                <div style={{width:'300px'}}>Timestamp:</div>
                <input style={{width:'500px'}}  type="text" name="" value={state.timestamp}></input>
            </div>
            <div style={{display:'flex',flexDirection:'column', }}>
                <div>
                    <h1>Request</h1>
                    {/* <div>{state?.before?JSON.parse(state?.before):""}</div> */}
                    <div>{state?.request}</div>

                </div>
                <div>
                    <h1>Response</h1>
                    <div>{state?.response}</div>
                </div>
            </div>
            
          
           
            

            


           
            {/* <div style={{marginTop:'20px'}}>{JSON.stringify(errros)}</div> */}
        </div>
    )
}

export default DetailAuditTrail