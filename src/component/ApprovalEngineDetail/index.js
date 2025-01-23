import axios from "axios";
import React, { useEffect, useState } from "react";
import { BlinkBlur } from "react-loading-indicators";
import { useNavigate, useParams } from "react-router-dom";
import CIMBNiaga from './../../images/cimb.png'
const DetailApproval =()=>{
    const {id} = useParams()
    const [loading,setLoading] = useState()
    const navigate = useNavigate()
    const [errros,setErrors] = useState()
    console.log(id)
    // const [staticTypeId,setStaticTypeId] = useState(0)
   
    const [state,setState] = useState({
        approval_id:"",
        key_id:"",
        status:"",
        event_type:"",
        before:"",
        after:"",
        module_name:"",
        created_at:"",
        created_by:"",
        updated_at:"",
        updated_by:"",
        
    })
    
    useEffect(()=>{
        if(id){
            setLoading(true)
            axios.get(`https://portal-audit-trail-service.onrender.com/ats/v1/approval-engine/${id}`).then(res=>{
                if(res?.data?.data){
                    let data = res?.data?.data
                    // setStaticTypeId(data?.pc_page_type_id)
                    setState((sss)=>{return{...sss,
                        approval_id:data.approval_id,
                        key_id:data.key_id,
                        status:data.status,
                        event_type:data.event_type,
                        before:data.before_data,
                        after:data.after_data,
                        module_name:data.module_name,
                        created_at:data.created_at,
                        created_by:data.created_by,
                        updated_at:data.updated_at,
                        updated_by:data.updated_by,
                    
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

   
    console.log(state)
    return(
        <div style={{margin:'10px 10px 10px 10px'}}>
            <div style={{marginTop:'20px',marginBottom:'20px',display:'flex',justifyContent:'start',marginLeft:'20px'}}>
               
                <div onClick={()=>{navigate(`/approval-engine`)}} style={{cursor:'pointer', padding:'10px 10px', borderRadius:'10px', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>List Approval</div>
                {/* <div onClick={()=>{navigate(`/listofpage/${state?.pc_page_type_id}`)}} style={{marginLeft:'20px',cursor:'pointer', padding:'10px 10px', borderRadius:'10px', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>List Page</div> */}
            
            </div>
            {loading?<div style={{position:'fixed',zIndex:'99',background:'rgba(0,0,0,0.3)',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'30px',top:0,left:0,right:0,bottom:0}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <img alt="cimb" style={{width:'300px',marginBottom:'10px'}} src={CIMBNiaga}></img>
            <BlinkBlur color="#FF0000" size="large" text="" textColor="" />
            </div>
            </div>:""}
           
            <div style={{display:'flex',alignItems:'center', gap:'50px'}}>
                <div style={{width:'300px'}}>ApprovalID :</div>
                <input  style={{width:'500px'}} type="text" name="" value={state.approval_id}></input>
            </div>
          
            <div style={{display:'flex',alignItems:'center', gap:'50px'}}>
                <div style={{width:'300px'}}>Key ID :</div>
                <input style={{width:'500px'}}  type="text" name="" value={state.key_id}></input>
            </div>
            <div style={{display:'flex',alignItems:'center', gap:'50px'}}>
                <div style={{width:'300px'}}>Event Type :</div>
                <input style={{width:'500px'}}  type="text" name="" value={state.event_type}></input>
            </div>
            <div style={{display:'flex',alignItems:'center', gap:'50px'}}>
                <div style={{width:'300px'}}>Module Name :</div>
                <input  style={{width:'500px'}} type="text" name="" value={state.module_name}></input>
            </div>
            <div style={{display:'flex',flexDirection:'column', }}>
                <div>
                    <h1>Before</h1>
                    {/* <div>{state?.before?JSON.parse(state?.before):""}</div> */}
                    <div>{state?.before}</div>

                </div>
                <div>
                    <h1>After</h1>
                    <div>{state?.after}</div>
                </div>
            </div>
            <div style={{display:'flex',alignItems:'center', gap:'50px'}}>
                <div style={{width:'300px'}}>CreatedAt:</div>
                <input style={{width:'500px'}}  type="text" name="" value={state.created_at}></input>
            </div>
            <div style={{display:'flex',alignItems:'center', gap:'50px'}}>
                <div style={{width:'300px'}}>CreatedBy:</div>
                <input style={{width:'500px'}}  type="text" name="" value={state.created_by}></input>
            </div>

            <div style={{display:'flex',alignItems:'center', gap:'50px'}}>
                <div style={{width:'300px'}}>Updated At:</div>
                <input style={{width:'500px'}}  type="text" name="" value={state.updated_at}></input>
            </div>
            <div style={{display:'flex',alignItems:'center', gap:'50px'}}>
                <div style={{width:'300px '}}>Updated By:</div>
                <input style={{width:'500px'}}  type="text" name="" value={state.updated_by}></input>
            </div>
            

            


           
            <div style={{marginTop:'20px'}}>{JSON.stringify(errros)}</div>
        </div>
    )
}

export default DetailApproval