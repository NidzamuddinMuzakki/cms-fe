import axios from "axios";
import React, { useEffect, useState } from "react"
import DataTable from 'react-data-table-component';
import { BlinkBlur } from "react-loading-indicators";
import { useNavigate } from "react-router-dom";
import CIMBNiaga from './../../images/cimb.png'
const columns = [
    {
		name: 'ID',
		selector: row => row.id,
	},
    {
		name: 'Module Name',
		selector: row => row.module_name,
	},
    {
		name: 'User ID',
		selector: row => row.user_id,
	},
    {
		name: 'Object ID',
		selector: row => row.object_id,
	},
    {
        name:"Event Type",
        selector:row=> row.event_type,

    },
	{
		name: 'Method',
		selector: row => row.method,
	},
	
    {
		name: 'Path',
		selector: row => row.path,
	}
    
];



const ListAuditTrail = ()=>{
    const [data,SetData]= useState([])
    const [status,setStatus]= useState('')
    const [options, setOptions] = useState([])
    const [total, setTotal] = useState(0)
    const [perPage, setPerpage] = useState(5)
    const [page, setPage] = useState(1)
    // const {id} = useParams()
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
   
    
    useEffect(()=>{
        setLoading(true)
        axios.get(`https://portal-audit-trail-service.onrender.com/ats/v1/audit-trail/list?page=${page}&row_perpage=${perPage}&status=${status}`).then(res=>{
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
            
            onRowClicked={(row)=>{navigate(`/audit-trail/detail/${row.id}`)}}
            
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
export default ListAuditTrail



