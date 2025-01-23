import axios from "axios";
import React, { useEffect, useState } from "react"
import DataTable from 'react-data-table-component';
import { BlinkBlur } from "react-loading-indicators";
import { useNavigate, useParams } from "react-router-dom";
import CIMBNiaga from './../../images/cimb.png'
const columns = [
    {
		name: 'Approval ID',
		selector: row => row.approval_id,
	},
	{
		name: 'Key ID',
		selector: row => row.key_id,
	},
	{
		name: 'Event',
		selector: row => row.event_type,
	},
    {
		name: 'Maker',
		selector: row => row.created_by,
	},
    {
		name: 'Module Name',
		selector: row => row.module_name,
	},
    {
		name: 'Status',
		selector: row => row.status,
	},
    {
        name:"Action",
        
    }
    
];



const ListApproval = ()=>{
    const [data,SetData]= useState([])
    const [status,setStatus]= useState('')
    const [options, setOptions] = useState([])
    const [total, setTotal] = useState(0)
    const [perPage, setPerpage] = useState(5)
    const [page, setPage] = useState(1)
    const {id} = useParams()
    const navigate = useNavigate()
    const [loading,setLoading] = useState()
    useEffect(()=>{
        setOptions([
            {id:"", value:""},
            {id:"ongoing", value:"ongoing"},
            {id:"approved", value:"approved"},
            {id:"rejected", value:"rejected"},


        ])
    },[])
    const handleButtonClick = (e,id)=>{
        setLoading(true)
        axios.put(`https://portal-audit-trail-service.onrender.com/ats/v1/approval-engine`,{approval_id:id,status:'approved'},{headers:{"user-id":"nidzam"}}).then(res=>{
            console.log(res?.data?.data)
            navigate(0)
        }).catch(err=>{
            alert(JSON.stringify(err?.response?.data?.meta))
        }).finally(()=>{
            setLoading(false)
        })

    }
    const handleButtonClickReject = (e,id)=>{
        setLoading(true)
        axios.put(`https://portal-audit-trail-service.onrender.com/ats/v1/approval-engine`,{approval_id:id,status:'rejected'},{headers:{"user-id":"nidzam"}}).then(res=>{
            console.log(res?.data?.data)
            navigate(0)
        }).catch(err=>{
            alert(JSON.stringify(err?.response?.data?.meta))
        }).finally(()=>{
            setLoading(false)
        })

    }
    if(columns.findIndex(aa=>aa.name==="Action")!==-1){
        columns[columns.findIndex(aa=>aa.name=="Action")]['selector']=(row) => {
            if (row.status=="ongoing"){
            return(
            <div style={{display:'flex', justifyContent:'space-evenly'}}><button
                className="btn btn-outline btn-xs"
                onClick={(e) => handleButtonClick(e, row?.approval_id)}
            >
                Approve
            </button>
        <button
        className="btn btn-outline btn-xs"
        onClick={(e) => handleButtonClickReject(e, row?.approval_id)}
    >
        Reject
    </button>   </div> 
        )}}
    }
    useEffect(()=>{
        setLoading(true)
        axios.get(`https://portal-audit-trail-service.onrender.com/ats/v1/approval-engine/list?page=${page}&row_perpage=${perPage}&status=${status}`).then(res=>{
           if(res?.data?.data){
            SetData(res?.data?.data)
            setTotal(res?.data?.total_records)
           }else{
            console.log(res)
           }
        }).catch(err=>{
            console.log(err)
        }).finally(()=>{
            setLoading(false)

        })
    },[page,perPage,status])
    return(
        <div style={{width:'80vw', }}>
            {loading?<div style={{position:'fixed',zIndex:'99',background:'rgba(0,0,0,0.3)',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'30px',top:0,left:0,right:0,bottom:0}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <img alt="cimb" style={{width:'300px',marginBottom:'10px'}} src={CIMBNiaga}></img>
            <BlinkBlur color="#FF0000" size="large" text="" textColor="" />
            </div>
            </div>:""}
            {/* <div style={{marginTop:'20px',marginBottom:'20px',display:'flex',justifyContent:'start',marginLeft:'20px'}}>
                <div onClick={()=>{navigate(`/create/${id}`)}} style={{cursor:'pointer', padding:'10px 10px', borderRadius:'10px', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>Create</div>
                <div onClick={()=>{navigate(`/`)}} style={{marginLeft:'20px',cursor:'pointer', padding:'10px 10px', borderRadius:'10px', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>Home</div>
            
            </div>   */}


<div style={{display:'flex', alignItems:'center',gap:'50px'}}>
                <div style={{width:'150px'}}>Status :</div>
                <select
                    value={status}
                    onChange={(e)=>{
                        setStatus(e.target.value)
                    }}
                    style={{height:'30px',width:'200px'}}
                    
                    >
                    {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.value}
                    </option>
                        ))}
                </select>
                {/* <input placeholder="search approval id"></input> */}
            </div>
<DataTable
			columns={columns}
			data={data}
            
            onRowClicked={(row)=>{navigate(`/approval-engine/detail/${row.approval_id}`)}}
            
                        paginationTotalRows={total}
                        paginationPerPage={perPage}
                        paginationRowsPerPageOptions={[5,15,50]}
                        highlightOnHover
                        pagination
                        paginationPosition="top" // both bottom or both
                        paginationServer
                        onChangePage={page => {
                            setPage(page)
                        }}
                        onChangeRowsPerPage={page => {
                            setPage(1);
                            setPerpage(page)
                        }}
		/>
        </div>
    )
}
export default ListApproval



