import axios from "axios";
import React, { useEffect, useState } from "react"
import DataTable from 'react-data-table-component';
import { FourSquare } from "react-loading-indicators";
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
];



const MasterTypeList = ()=>{
    const [data,SetData]= useState([])
    const [loading,setLoading] = useState()
    useEffect(()=>{
        setLoading(true)
        axios.get("http://3.105.240.231/v1/cms/pagecontent/mastertype/list").then(res=>{
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
    },[])
    return(
        <div style={{width:'700px'}}>
            {loading?<div style={{position:'fixed',zIndex:'99',background:'rgba(0,0,0,0.3)',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'30px',top:0,left:0,right:0,bottom:0}}>
            <FourSquare color="red" size="medium" text="" textColor="" />
            </div>:""}

<DataTable
			columns={columns}
			data={data}
            onRowClicked={(row)=>{window.location=`/listofpage/${row.id}`}}
		/>
        </div>
    )
}
export default MasterTypeList



