import axios from "axios";
import React, { useEffect, useState } from "react"
import DataTable from 'react-data-table-component';
import { FourSquare } from "react-loading-indicators";
import { useParams } from "react-router-dom";
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
	},
];



const ListPage = ()=>{
    const [data,SetData]= useState([])
    const {id} = useParams()
  
    const [loading,setLoading] = useState()
    useEffect(()=>{
        setLoading(true)
        axios.get(`http://3.105.240.231/v1/cms/pagecontent/type/${id}`).then(res=>{
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
            <FourSquare color="red" size="medium" text="" textColor="" />
            </div>:""}
            <div style={{marginTop:'20px',marginBottom:'20px',display:'flex',justifyContent:'start',marginLeft:'20px'}}>
                <div onClick={()=>{window.location=`/create/${id}`}} style={{cursor:'pointer', padding:'10px 10px', borderRadius:'10px', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>Create</div>
                <div onClick={()=>{window.location=`/`}} style={{marginLeft:'20px',cursor:'pointer', padding:'10px 10px', borderRadius:'10px', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>Home</div>
            
            </div>  
<DataTable
			columns={columns}
			data={data}
            onRowClicked={(row)=>{window.location=`/detail/${row.id}`}}
		/>
        </div>
    )
}
export default ListPage



