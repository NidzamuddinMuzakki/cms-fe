import axios from "axios";
import React, { useEffect, useState,useRef } from "react"
import DataTable from 'react-data-table-component';
import { BlinkBlur } from "react-loading-indicators";
import CIMBNiaga from './../../images/cimb.png'
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from 'react-google-recaptcha'
import { jsPDF }  from "jspdf";
import html2canvas from "html2canvas";
import Html from 'react-pdf-html';
import APA from "../Nidzam";
import download from 'downloadjs'

// const htmlStringToPdf = async (htmlString, user_id, form_id) => {
//     let iframe = document.createElement("iframe");
//     iframe.style.visibility = "hidden";
//     document.body.appendChild(iframe);
//     let iframedoc = iframe.contentDocument || iframe.contentWindow.document;
//     iframedoc.body.innerHTML = htmlString;
    
//     let canvas = await html2canvas(iframedoc.body, {});
    
//     // Convert the iframe into a PNG image using canvas.
//     let imgData = canvas.toDataURL("image/png");
  
//     // Create a PDF document and add the image as a page.
//     const doc = new JsPDF({
//       format: "a4",
//       unit: "mm",
//     });
//     doc.addImage(imgData, "PNG", 0, 0, 210, 297);
  
//     // Get the file as blob output.
//     let blob = doc.output("blob");
//     document.body.removeChild(iframe);

//     var csvURL = window.URL.createObjectURL(blob);
//     let tempLink = document.createElement('a');
//     tempLink.href = csvURL;
//     tempLink.setAttribute('download', user_id+form_id+'.pdf');
//     tempLink.click();
//     return blob
//     // Remove the iframe from the document when the file is generated.
//   };
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
    const navigate = useNavigate()
    const [data,SetData]= useState([])
    const [loading,setLoading] = useState()
    const [tokenCap, setTokenCap] = useState('')
    const [form_id, setFromId] = useState(0)
    const [user_id, setUserId] = useState("")
    const [dataHtml, setDataHmlt] = useState("")
    const [show,setShow ] = useState(false)
    const handleSubmit=async ()=>{
        if(!form_id || !user_id){
            alert("form id or user id must not empty")
            return
        } 
        
            
        setDataHmlt("")
        setLoading(true)
        axios.get(`http://localhost:8081/onboarding/v1/form/donwload-file/${form_id}?type=pdf`,{responseType: 'blob',headers:{"user-id":user_id,"request-id":"asa","Content-Type":"application/pdf"}}).then(response=>{
        
            download(response.data, "form-pdf.pdf", "application/pdf")
            //    if(res?.data){
        //     // setDataHmlt(res?.data?.data)
                 
        //     // var w =window.open("pdf-file","pdf-file",'height=900,width=1300')
        //     // if (w == null || typeof(w)=='undefined') {  
        //     //     alert('Please disable your pop-up blocker and click the Download PDF Again'); 
        //     //     return
        //     // } 
        //     // w.name="pdf-file"
            
        //     // w.document.write(res?.data?.data)
        //     // setTimeout(()=>{
        //     //     w.document.body.style.zoom = "60%"
        //     //     w.document.body.style.overflow = "auto"

        //     //     w.print()
        //     // },200)
            
        //    }else{
        //     console.log(res)
        //    }
        }).catch(err=>{
            if(err?.response?.data?.meta?.description){

                alert(err?.response?.data?.meta?.description)
            }else{
                alert(JSON.stringify(err))
            }
        }).finally(()=>{
            setLoading(false)
        })
    }

    const handleSubmitHtml=async ()=>{
        if(!form_id || !user_id){
            alert("form id or user id must not empty")
            return
        } 
        
            
        setDataHmlt("")
        setLoading(true)
        axios.get(`http://localhost:8081/onboarding/v1/form/donwload-file/${form_id}?type=html`,{headers:{"user-id":user_id,"request-id":"asa","Content-Type":"application/pdf"}}).then(res=>{
        
           
               if(res?.data?.data){
        
                 
            var w =window.open(res?.data?.meta?.description,res?.data?.meta?.description,'height=900,width=1300')
            if (w == null || typeof(w)=='undefined') {  
                alert('Please disable your pop-up blocker and click the Download PDF Again'); 
                return
            } 
            w.name=res?.data?.meta?.description
            
            w.document.write(res?.data?.data)
            setTimeout(()=>{
                w.document.body.style.zoom = "60%"
                w.document.body.style.overflow = "auto"

                w.print()
            },200)
            
           }else{
            console.log(res)
           }
        }).catch(err=>{
            if(err?.response?.data?.meta?.description){

                alert(err?.response?.data?.meta?.description)
            }else{
                alert(JSON.stringify(err))
            }
        }).finally(()=>{
            setLoading(false)
        })
    }
    useEffect(()=>{
        if(show){
        setLoading(true)
        axios.get("https://portal-cms-service-latest.onrender.com/cms/v1/admin/pagecontent/mastertype/list").then(res=>{
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
    }
    },[show])
    console.log(dataHtml)
    useEffect(()=>{
        if(dataHtml){
           
              
    //       setLoading(true)
    //         let iframe = document.createElement("iframe");
    //         iframe.style.visibility = "hidden";
    //         document.body.appendChild(iframe);
    //         let iframedoc = iframe.contentDocument || iframe.contentWindow.document;
    //         iframedoc.body.innerHTML = dataHtml;
    //         html2canvas(iframedoc.body,{ useCORS: true, allowTaint: true, scrollY: 0 }).then(canvas=>{
    //             const image = { type: 'jpeg', quality: 0.98 };
    //   const margin = [0.5, 0.5];
    //   const filename = 'myfile.pdf';

    //   var imgWidth = 8.5;
    //   var pageHeight = 11;

    //   var innerPageWidth = imgWidth - margin[0] * 2;
    //   var innerPageHeight = pageHeight - margin[1] * 2;

    //   // Calculate the number of pages.
    //   var pxFullHeight = canvas.height;
    //   var pxPageHeight = Math.floor(canvas.width * (pageHeight / imgWidth));
    //   var nPages = Math.ceil(pxFullHeight / pxPageHeight);

    //   // Define pageHeight separately so it can be trimmed on the final page.
    //   var pageHeight = innerPageHeight;

    //   // Create a one-page canvas to split up the full image.
    //   var pageCanvas = document.createElement('canvas');
    //   var pageCtx = pageCanvas.getContext('2d');
    //   pageCanvas.width = canvas.width;
    //   pageCanvas.height = pxPageHeight;

    //   // Initialize the PDF.
    //   var pdf = new jsPDF('p', 'in', [8.5, 11]);

    //   for (var page = 0; page < nPages; page++) {
    //     // Trim the final page to reduce file size.
    //     if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
    //       pageCanvas.height = pxFullHeight % pxPageHeight;
    //       pageHeight = (pageCanvas.height * innerPageWidth) / pageCanvas.width;
    //     }

    //     // Display the page.
    //     var w = pageCanvas.width;
    //     var h = pageCanvas.height;
    //     pageCtx.fillStyle = 'white';
    //     pageCtx.fillRect(0, 0, w, h);
    //     pageCtx.drawImage(canvas, 0, page * pxPageHeight, w, h, 0, 0, w, h);

    //     // Add the page to the PDF.
    //     if (page > 0) pdf.addPage();
    
    //     var imgData = pageCanvas.toDataURL('image/' + image.type, image.quality);
    //     pdf.addImage(imgData, image.type, margin[1], margin[0], innerPageWidth, pageHeight);
    //   }

    //   pdf.save("nidzam.pdf");
                
    //             // const data = ress.toDataURL('image/png');

    //             // const pdf = new jsPDF();
    //             // const imgProperties = pdf.getImageProperties(data);
    //             // const pdfWidth = pdf.internal.pageSize.getWidth();
    //             // const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    //             // pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    //             // pdf.save('print.pdf');
    //         }).catch(e=>console.log(e)).finally(()=>{
    //       setLoading(false)

    //         })
        //var myWindow = window.open('','_blank','width=400,height=600')
        // myWindow.moveTo(0,0);
        // myWindow?.document?.write("<p>hay</p>");
    
    
        // myWindow?.document.close(); //missing code
    
    
        // myWindow?.focus();
        // setTimeout(()=>{

        //     myWindow?.print(); 
        // },5000)

        // curlconverter.toGo(['curl', 'ftp://example.com']);
        }
    },[dataHtml])
    // console.log(dataHtml)
    const recaptcha = useRef()
   
    return(
        <div style={{width:'700px'}}>
            {loading?<div style={{position:'fixed',zIndex:'99',background:'rgba(0,0,0,0.3)',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'30px',top:0,left:0,right:0,bottom:0}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <img alt="cimb" style={{width:'300px',marginBottom:'10px'}} src={CIMBNiaga}></img>
            <BlinkBlur color="#FF0000" size="large" text="" textColor="" />
            </div>
            </div>:""}

<button onClick={()=>setShow(!show)}>show/hide list master type</button>
{show?<DataTable
			columns={columns}
			data={data}
            onRowClicked={(row)=>{navigate(`/listofpage/${row.id}`)}}
		/>:""}


<ReCAPTCHA ref={recaptcha} onChange={(e)=>{setTokenCap(e)}} sitekey={"6LeUsEEUAAAAALN2ScdGGV5xHJR78quyxjnM8Blt"} />
        <div>{"token Captcha: "+ tokenCap}</div>
        <div>
            <input placeholder="user-id" value={user_id} type="text" onChange={(e)=>{setUserId(e.target.value)}}/> 
            <br></br>
            <input placeholder="form-id" value={form_id} type="number" onChange={(e)=>{setFromId(e.target.value)}}/> 
            <br></br>
            <button onClick={()=>{handleSubmit()}}>DOWNLOAD PDF</button>
            <button onClick={()=>{handleSubmitHtml()}}>DOWNLOAD HTML to PDF</button>
        </div>
       {/* <div id="nidzam" style={{position:'absolute',opacity:1, display:'flex',justifyContent:'center',alignItems:'center',width:'100vw',height:'100%',opacity:dataHtml?1:0,zIndex:dataHtml?-1:9999,background:'white'}}>
            
            
        </div> */}
     

       
    </div>
    )
}
export default MasterTypeList






