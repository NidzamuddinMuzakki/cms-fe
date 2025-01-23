import axios from "axios";
import React, { useEffect, useState } from "react"
import DataTable from 'react-data-table-component';
import { BlinkBlur } from "react-loading-indicators";
import CIMBNiaga from './../../images/cimb.png'
import { useNavigate, useParams } from "react-router-dom";
const columns = [
    {
		name: 'ID',
		selector: row => row.id,
	},
	{
		name: 'PC Page',
		selector: row => row.pc_page,
	},
	{
		name: 'PC Type',
		selector: row => row.pc_type,
	},
    {
		name: 'Title ID',
		selector: row => row.pc_title_id,
	},
    {
		name: 'Title EN',
		selector: row => row.pc_title_en,
	},{
        name:"Action",
        
    }
    
];



const ListPage = ()=>{
    const [data,SetData]= useState([])
    const {id} = useParams()
    const navigate = useNavigate()
    const [loading,setLoading] = useState()
    const handleButtonClick = (e,id)=>{
        setLoading(true)
        axios.delete(`https://portal-cms-service-latest.onrender.com/cms/v1/admin/pagecontent/${id}`,{headers:{"user-id":"nidzam"}}).then(res=>{
            console.log(res?.data?.data)
            navigate("/approval-engine")
        }).catch(err=>{
            alert(JSON.stringify(err?.response?.data?.meta))
        }).finally(()=>{
            setLoading(false)
        })

    }
    if(columns.findIndex(aa=>aa.name==="Action")!==-1){
        columns[columns.findIndex(aa=>aa.name=="Action")]['selector']=(row) => (
            <button
                className="btn btn-outline btn-xs"
                onClick={(e) => handleButtonClick(e, row.id)}
            >
                Delete
            </button>)
    }
    useEffect(()=>{
        setLoading(true)
        axios.get(`https://portal-cms-service-latest.onrender.com/cms/v1/admin/pagecontent/type/${id}`).then(res=>{
           if(res?.data?.data){
            SetData(res?.data?.data)
           }else{
            console.log(res)
           }
        }).catch(err=>{
            console.log(err)
        }).finally(()=>{
            setLoading(false)

        })
    },[id])
    return(
        <div style={{width:'700px'}}>
            {loading?<div style={{position:'fixed',zIndex:'99',background:'rgba(0,0,0,0.3)',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'30px',top:0,left:0,right:0,bottom:0}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <img alt="cimb" style={{width:'300px',marginBottom:'10px'}} src={CIMBNiaga}></img>
            <BlinkBlur color="#FF0000" size="large" text="" textColor="" />
            </div>
            </div>:""}
            <div style={{marginTop:'20px',marginBottom:'20px',display:'flex',justifyContent:'start',marginLeft:'20px'}}>
                <div onClick={()=>{navigate(`/create/${id}`)}} style={{cursor:'pointer', padding:'10px 10px', borderRadius:'10px', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>Create</div>
                <div onClick={()=>{navigate(`/`)}} style={{marginLeft:'20px',cursor:'pointer', padding:'10px 10px', borderRadius:'10px', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>Home</div>
            
            </div>  
<DataTable
			columns={columns}
			data={data}
            onRowClicked={(row)=>{navigate(`/detail/${row.id}`)}}
		/>
        
        </div>
    )
}
export default ListPage



