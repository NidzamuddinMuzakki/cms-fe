import axios from "axios";
import React, { useEffect, useState } from "react";
import { BlinkBlur } from "react-loading-indicators";
import { useNavigate, useParams } from "react-router-dom";
import CIMBNiaga from './../../images/cimb.png'
const DetailUser =()=>{
    const {id} = useParams()
    const [loading,setLoading] = useState()
    const navigate = useNavigate()
    const [errros,setErrors] = useState()
    const [loadingActivity, setLoadingActivity] = useState(false)
    const [dataActivity, setDataActivity] = useState([])
    const [showDetail,setShowDetail]  = useState({})
    console.log(id)
    // const [staticTypeId,setStaticTypeId] = useState(0)
   
    const [state,setState] = useState({
        id:0,
        email:"",
        full_name:"",
        company_name:"",
        status:"",
      
        created_at:"",
      
        updated_at:"",
      
        
    })
    const handleClickDetail = (id)=>{
        setShowDetail((aaa)=>{return {...aaa,[id]:!aaa[id]} })
    }
    
    useEffect(()=>{
        if(id){
            setLoading(true)
            axios.get(`https://portal-auth-service-latest.onrender.com/auth/v1/user/user-details`,{headers:{"user-id":id}}).then(res=>{
                if(res?.data?.data){
                    let data = res?.data?.data
                    // setStaticTypeId(data?.pc_page_type_id)
                    setState((sss)=>{return{...sss,
                        id:data.id,
                        email:data.email,
                        full_name:data.full_name,
                        company_name:data.company_name,
                        status:data.status,
                        
                        created_at:data.created_at,
                        
                        updated_at:data.updated_at,
                       
                    
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

    useEffect(()=>{
        if(id && state.email){
            setLoadingActivity(true)
            axios.get(`https://portal-audit-trail-service.onrender.com/ats/v1/audit-trail/list?page=${1}&row_perpage=${2000}&module_name=auth-service&object_id=${id},${state.email}`,{headers:{"user-id":"nidzam"}}).then(res=>{
                if(res?.data?.data){
                    setDataActivity(res?.data?.data)
                }
            }).catch(err=>{
                console.log(err)
            }).finally(()=>{
                setLoadingActivity(false)
            })
        }
    },[id, state.email])

   
    console.log(showDetail)
    return(
        <div style={{margin:'10px 10px 10px 10px'}}>
            <div style={{marginTop:'20px',marginBottom:'20px',display:'flex',justifyContent:'start',marginLeft:'20px'}}>
               
                <div onClick={()=>{navigate(`/user-list`)}} style={{cursor:'pointer', padding:'10px 10px', borderRadius:'10px', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>List User</div>
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
                <div style={{width:'300px'}}>Email :</div>
                <input style={{width:'500px'}}  type="text" name="" value={state.email}></input>
            </div>
            <div style={{display:'flex',alignItems:'center', gap:'50px'}}>
                <div style={{width:'300px'}}>Full Name :</div>
                <input style={{width:'500px'}}  type="text" name="" value={state.full_name}></input>
            </div>
            <div style={{display:'flex',alignItems:'center', gap:'50px'}}>
                <div style={{width:'300px'}}>Company Name :</div>
                <input  style={{width:'500px'}} type="text" name="" value={state.company_name}></input>
            </div>
            <div style={{display:'flex',alignItems:'center', gap:'50px'}}>
                <div style={{width:'300px'}}>Status :</div>
                <input  style={{width:'500px'}} type="text" name="" value={state.status}></input>
            </div>
          
            <div style={{display:'flex',alignItems:'center', gap:'50px'}}>
                <div style={{width:'300px'}}>CreatedAt:</div>
                <input style={{width:'500px'}}  type="text" name="" value={state.created_at}></input>
            </div>
         

            <div style={{display:'flex',alignItems:'center', gap:'50px'}}>
                <div style={{width:'300px'}}>Updated At:</div>
                <input style={{width:'500px'}}  type="text" name="" value={state.updated_at}></input>
            </div>
           
            

            


           
            <div style={{marginTop:'20px'}}>{JSON.stringify(errros)}</div>



            <h1>Acitvity Log</h1>
            {loadingActivity?<p>Loading....</p>:""}
            {dataActivity?.length?dataActivity.map((val, key)=>{
                return(
                    <div key={key}>
                        <div style={{display:'flex', alignItems:'center', gap:'20px'}}>
                            <label>UserID :</label>
                            <div>{val?.user_id==id?state.full_name:val?.user_id}</div>
                        </div>
                        <div style={{display:'flex', alignItems:'center', gap:'20px'}}>
                            <label>ObjectID :</label>
                            <div>{val?.object_id==id?state.full_name:val?.object_id}</div>
                        </div>
                        <div style={{display:'flex', alignItems:'center', gap:'20px'}}>
                            <label>Event Type :</label>
                            <div>{val?.event_type}</div>
                        </div>
                        <div style={{display:'flex', alignItems:'center', gap:'20px'}}>
                            <label>TimeStamp :</label>
                            <div>{val?.timestamp}</div>
                        </div>
                        <div style={{textDecoration:'underline',color:'blue', cursor:'pointer'}} id={key} onClick={()=>{handleClickDetail(key)}}>see Detail</div>
                        <div style={{display:showDetail[key]?'block':'none'}}>
                            <div style={{display:'flex', alignItems:'center', gap:'20px'}}>
                                <label>Request :</label>
                                <div>{val?.request}</div>
                            </div>
                            <div style={{display:'flex', alignItems:'center', gap:'20px'}}>
                                <label>Response :</label>
                                <div>{val?.response}</div>
                            </div>

                        </div>
                        <div style={{marginBottom:'20px'}}></div>
                       
                    </div>
                )
            }):""}
        </div>
    )
}

export default DetailUser