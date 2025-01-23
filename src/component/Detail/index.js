import axios from "axios";
import React, { useEffect, useState } from "react";
import { BlinkBlur } from "react-loading-indicators";
import { useNavigate, useParams } from "react-router-dom";
import CIMBNiaga from './../../images/cimb.png'
const Detail =()=>{
    const {id} = useParams()
    const [loading,setLoading] = useState()
     const [showDetail,setShowDetail]  = useState({})
    const [uuidLandingPage,setUUIDLandingPage] = useState('')
     const [dataActivity, setDataActivity] = useState([])
    const navigate = useNavigate()
     const [loadingActivity,setLoadingActivity] = useState()
    const [errros,setErrors] = useState()
    // const [staticTypeId,setStaticTypeId] = useState(0)
    const handleSave = ()=>{
        var bodyFormData = new FormData();
        bodyFormData.set("id",id)
        bodyFormData.set("pc_page_type_id",state.pc_page_type_id)
        bodyFormData.set("pc_title_id",state.pc_title_id)
        bodyFormData.set("pc_title_en",state.pc_title_en)
        bodyFormData.set("pc_subtitle_id",state.pc_subtitle_id)
        bodyFormData.set("pc_subtitle_en",state.pc_subtitle_en)
        bodyFormData.set("pc_resource_file",state.pc_resource_file)
        bodyFormData.set("pc_resource_link",state.pc_resource_link)
        bodyFormData.set("pc_resource_base64",state.pc_resource_base64)
        bodyFormData.set("pc_ordering",state.pc_ordering)
        bodyFormData.set("pc_button_name_id",state.pc_button_name_id)
        bodyFormData.set("pc_button_name_en",state.pc_button_name_en)
        bodyFormData.set("pc_button_cta",state.pc_button_cta)
        bodyFormData.set("pc_delete_resource",state.pc_resource_delete)

        bodyFormData.set("pc_button_position",state.pc_button_position)
        

        setLoading(true)
        axios.put(`https://portal-cms-service-latest.onrender.com/cms/v1/admin/pagecontent`,
       bodyFormData,
            {headers: { "Content-Type": `multiplepart/form-data`,"user-id":"nidzam"}
          }).then(res=>{
            console.log(res)
           navigate(`/listofpage/${state.pc_page_type_id}`)
        }).catch(err=>{
            
            setErrors(err?.response?.data?.meta)
        }).finally(()=>{
            setLoading(false)
        })
    }
    const [state,setState] = useState({
        pc_page_type_id:0,
        pc_title_id:"",
        pc_title_en:"",
        pc_subtitle_id:"",
        pc_subtitle_en:"",
        pc_resource_file:[],
        pc_resource_delete:false,
        pc_resource_link:"",
        pc_resource_link_preview:"",
        pc_resource_base64:"",
        pc_ordering:1,
        pc_button_name_id:"",
        pc_button_name_en:"",
        pc_button_position:"",
        pc_button_cta:""
    })
    const [options,setOptions] = useState([]);
    const [optionsButton,setOptionsButton] = useState([
        {
            id:"",
            value:""
        },
        {
            id:"left",
            value:"left"
        },
        {
            id:"right",
            value:"right"
        }
    ]);
    useEffect(()=>{
        axios.get("https://portal-cms-service-latest.onrender.com/cms/v1/admin/pagecontent/mastertype/list").then(res=>{
            if(res?.data?.data){
             setOptions(res?.data?.data)
            }else{
             console.log(res)
            }
         }).catch(err=>{
            console.log(err)
         })
    },[])
    useEffect(()=>{
        if(id){
            setLoading(true)
            axios.get(`https://portal-cms-service-latest.onrender.com/cms/v1/admin/pagecontent/detail/${id}`).then(res=>{
                if(res?.data?.data){
                    let data = res?.data?.data
                    setUUIDLandingPage(data?.pc_landing_page_uuid)
                    // setStaticTypeId(data?.pc_page_type_id)
                    setState((sss)=>{return{...sss,
                        pc_page_type_id:data.pc_page_type_id,
                        pc_title_id:data.pc_title_id,
                        pc_title_en:data.pc_title_en,
                        pc_subtitle_id:data.pc_subtitle_id,
                        pc_subtitle_en:data.pc_subtitle_en,
                        pc_resource_file:[],
                        pc_resource_link:"",
                        pc_resource_link_preview:data.pc_resource_link,
                        pc_resource_base64:"",
                        pc_ordering:data.pc_ordering,
                        pc_button_name_id:data.pc_button_name_id,
                        pc_button_name_en:data.pc_button_name_en,
                        pc_button_cta:data.pc_button_cta,
                        pc_button_position:data?.pc_button_position
                    
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

    const handleChange  = (e)=>{
        if(e.target.name==="pc_page_type_id"){
            let mm=0
            mm= parseInt(e.target.value)
            setState((sss)=>{return{...sss,[e.target.name]:mm}})
        }else{
            setState((sss)=>{return{...sss,[e.target.name]:e.target.value}})
        }
       
       
    }
    const handleChangeFoto = (e)=>{
        
        setState({...state,[e.target.name]:e.target.files[0]})
    }
    useEffect(()=>{
        if(uuidLandingPage){
            setLoadingActivity(true)
            // 
            axios.get(`https://portal-audit-trail-service.onrender.com/ats/v1/audit-trail/list?page=${1}&row_perpage=${2000}&module_name=landing-page,audit-approval-service&object_id=${uuidLandingPage}`,{headers:{"user-id":"nidzam"}}).then(res=>{
                if(res?.data?.data){
                    setDataActivity(res?.data?.data)
                }
            }).catch(err=>{
                console.log(err)
            }).finally(()=>{
                setLoadingActivity(false)
            })
        }
    },[uuidLandingPage])
    const handleClickDetail = (id)=>{
        setShowDetail((aaa)=>{return {...aaa,[id]:!aaa[id]} })
    }
    
    console.log(state,uuidLandingPage)
    return(
        <div style={{margin:'10px 10px 10px 10px'}}>
            <div style={{marginTop:'20px',marginBottom:'20px',display:'flex',justifyContent:'start',marginLeft:'20px'}}>
               
                <div onClick={()=>{navigate(`/`)}} style={{cursor:'pointer', padding:'10px 10px', borderRadius:'10px', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>Home</div>
                <div onClick={()=>{navigate(`/listofpage/${state?.pc_page_type_id}`)}} style={{marginLeft:'20px',cursor:'pointer', padding:'10px 10px', borderRadius:'10px', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>List Page</div>
            
            </div>
            {loading?<div style={{position:'fixed',zIndex:'99',background:'rgba(0,0,0,0.3)',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'30px',top:0,left:0,right:0,bottom:0}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <img alt="cimb" style={{width:'300px',marginBottom:'10px'}} src={CIMBNiaga}></img>
            <BlinkBlur color="#FF0000" size="large" text="" textColor="" />
            </div>
            </div>:""}
            <div style={{display:'flex', alignItems:'center',gap:'50px'}}>
                <div style={{width:'150px'}}>Type Page :</div>
                <select
                    value={state.pc_page_type_id}
                    onChange={handleChange}
                    style={{height:'30px',width:'200px'}}
                    name="pc_page_type_id"
                    >
                    {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.pc_page+" - "+option.pc_type}
                    </option>
                        ))}
                </select>
            </div>
            <div style={{display:'flex',alignItems:'center', gap:'50px'}}>
                <div style={{width:'150px'}}>Title ID :</div>
                <input onChange={handleChange} type="text" name="pc_title_id" value={state.pc_title_id}></input>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'50px'}}>
                <div style={{width:'150px'}}>Title EN :</div>
                <input onChange={handleChange} type="text" name="pc_title_en" value={state.pc_title_en}></input>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'50px'}}>
                <div style={{width:'150px'}}>Sub Title ID :</div>
                <input onChange={handleChange} type="text" name="pc_subtitle_id" value={state.pc_subtitle_id}></input>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'50px'}}>
                <div style={{width:'150px'}}>Sub Title EN :</div>
                <input onChange={handleChange} type="text" name="pc_subtitle_en" value={state.pc_subtitle_en}></input>
            </div>
            {state?.pc_resource_link_preview?<div style={{display:'flex',alignItems:'center',gap:'50px'}}>
                <img alt="foto" style={{width:'200px'}} src={state.pc_resource_link_preview?state.pc_resource_link_preview:""}></img>
                <button onClick={()=>{setState(ss=>{return{...ss,pc_resource_delete:true,pc_resource_link_preview:"",pc_resource_link:""}})}}>clear foto</button>
            </div>:""}
            <div style={{display:'flex',alignItems:'center',gap:'50px'}}>
                <div style={{width:'150px'}}>Resource File :</div>
                <input onChange={handleChangeFoto} type="file"   name="pc_resource_file"></input>
                {state?.pc_resource_file?.length?<div onClick={()=>{}}>Reset File</div>:""}
            </div>
            {state?.pc_resource_file?.length?<div>
                <img alt="foto" style={{width:'200px'}} src={state?.pc_resource_file?.length>0?URL.createObjectURL(state?.pc_resource_file):""}></img>
            </div>:""}
            <div style={{display:'flex',alignItems:'center',gap:'50px'}}>
                <div style={{width:'150px'}}>Resource Link :</div>
                <input onChange={handleChange} type="text" name="pc_resource_link" value={state.pc_resource_link}></input>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'50px'}}>
                <div style={{width:'150px'}}>Resource Base64 :</div>
                <input onChange={handleChange} type="text" name="pc_resource_base64" value={state.pc_resource_base64}></input>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'50px'}}>
                <div style={{width:'150px'}}>Ordering :</div>
                <input onChange={handleChange} type="number" name="pc_ordering" value={state.pc_ordering}></input>
            </div>

            <div style={{display:'flex',alignItems:'center',gap:'50px'}}>
                <div style={{width:'150px'}}>Button ID :</div>
                <input onChange={handleChange} type="text" name="pc_button_name_id" value={state.pc_button_name_id}></input>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'50px'}}>
                <div style={{width:'150px'}}>Button EN :</div>
                <input onChange={handleChange} type="text" name="pc_button_name_en" value={state.pc_button_name_en}></input>
            </div>
            <div style={{display:'flex', alignItems:'center',gap:'50px'}}>
                <div style={{width:'150px'}}>Button Position :</div>
                <select
                    value={state.pc_button_position}
                    onChange={handleChange}
                    style={{height:'30px',width:'200px'}}
                    name="pc_button_position"
                    >
                    {optionsButton.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.value}
                    </option>
                        ))}
                </select>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'50px'}}>
                <div style={{width:'150px'}}>Button CTA :</div>
                <input onChange={handleChange} type="text" name="pc_button_cta" value={state.pc_button_cta}></input>
            </div>

            


            <div style={{marginTop:'20px',marginBottom:'20px',display:'flex',justifyContent:'start'}}>
                <div onClick={()=>{handleSave()}} style={{cursor:'pointer', padding:'10px 10px', borderRadius:'10px', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>Save</div>
            </div> 
            <div style={{marginTop:'20px'}}>{JSON.stringify(errros)}</div>


            <h1>Activity Log</h1>
            {loadingActivity?<p>Loading....</p>:""}
            {dataActivity?.length?dataActivity.map((val, key)=>{
                return(
                    <div key={key}>
                        <div style={{display:'flex', alignItems:'center', gap:'20px'}}>
                            <label>UserID :</label>
                            <div>{val?.user_id}</div>
                        </div>
                        <div style={{display:'flex', alignItems:'center', gap:'20px'}}>
                            <label>ObjectID :</label>
                            <div>{val?.object_id}</div>
                        </div>
                        <div style={{display:'flex', alignItems:'center', gap:'20px'}}>
                            <label>Module Name :</label>
                            <div>{val?.module_name}</div>
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

export default Detail