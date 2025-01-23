import './App.css';
import MasterTypeList from './component/MasterType';
import ListPage from './component/ListPage';
import Create from './component/Create'
import Detail from './component/Detail';
import LoginPage from './component/Login';
import {Route,Routes as Switch, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ListApproval from './component/ApprovalEngineList';
import DetailApproval from './component/ApprovalEngineDetail';
import ListUserToken from './component/UserToken';
import ForgotPassword from './component/ForgotPassword';
import ResetPassword from './component/ResetPassword';
import ChangePassword from './component/ChangePassword';
import Invitation from './component/Invitation';
import Verify from './component/Verify';
import ListAuditTrail from './component/AuditTrailList';
import DetailAuditTrail from './component/AuditTrailDetail';
import ListUser from './component/User';
import DetailUser from './component/UserDetail';
import HapusAkunWithActivitationAgain from './component/HapusAkunWithActivationAgain';

function App() {
  const navigate= useNavigate()
  const [show,setShow] = useState(true)
  return (
    <div >
      <div onClick={()=>{setShow(true)}} style={{marginBottom:'20px',cursor:'pointer',borderRadius:'10px',display:'flex', justifyContent:'center', alignItems:'center', width:'70px', height:'50px',boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
        Menu
      </div>
      <div style={{display:show?'block':'none',width:'300px', position:'fixed', left:0, top:0, bottom:0, height:'100vh',zIndex:2,marginTop:'0px', background:'white',boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
        <div className='Menu' onClick={()=>{setShow(false);navigate("/")}}>
          <div>Landing Page</div>
        </div>
        <div className='Menu' onClick={()=>{setShow(false);navigate("/user-list")}}>
          <div>Users</div>
        </div>
        <div className='Menu' onClick={()=>{setShow(false);navigate("/user-delete-activation")}}>
          <div>Hapus Akun dan Aktivasi Lagi</div>
        </div>
        <div className='Menu' onClick={()=>{setShow(false);navigate("/approval-engine")}}>
          <div>Approval Engine</div>
        </div>
        <div className='Menu' onClick={()=>{setShow(false);navigate("/audit-trail")}}>
          <div>Audit Trail</div>
        </div>
        <div className='Menu' onClick={()=>{setShow(false);navigate("/user-token-list")}}>
          <div>User Token</div>
        </div>
        <div className='Menu' onClick={()=>{setShow(false);navigate("/login")}}>
          <div>Login</div>
        </div>
        <div className='Menu' onClick={()=>{setShow(false);navigate("/invitation")}}>
          <div>Invitation</div>
        </div>
        <div className='Menu' onClick={()=>{setShow(false);navigate("/verify")}}>
          <div>Verify</div>
        </div>
        <div className='Menu' onClick={()=>{setShow(false);navigate("/change-password")}}>
          <div>Change Password</div>
        </div>
        <div className='Menu' onClick={()=>{setShow(false);navigate("/forgot-password")}}>
          <div>Forgot Password</div>
        </div>
        <div className='Menu' onClick={()=>{setShow(false);navigate("/reset-password")}}>
          <div>Reset Password</div>
        </div>
        <div className='Close' onClick={()=>{setShow(false)}} >
          <div>Close</div>
        </div>
      </div>
      <Switch>
        {/* <Route path="/" element={<LoginPage />} /> */}
        <Route exact path='/' element={ <MasterTypeList></MasterTypeList>}></Route>
        <Route exact path='/login' element={ <LoginPage></LoginPage>}></Route>
        <Route exact path='/user-list' element={ <ListUser></ListUser>}></Route>
        <Route exact path='/user-detail/:id' element={ <DetailUser></DetailUser>}></Route>
        <Route exact path="/user-delete-activation" element={ <HapusAkunWithActivitationAgain></HapusAkunWithActivitationAgain>}></Route>


        
        <Route exact path='/user-token-list' element={ <ListUserToken></ListUserToken>}></Route>
        <Route exact path='/invitation' element={ <Invitation></Invitation>}></Route>
        <Route exact path='/verify' element={ <Verify></Verify>}></Route>

        
        <Route exact path='/forgot-password' element={ <ForgotPassword></ForgotPassword>}></Route>
        <Route exact path='/reset-password' element={ <ResetPassword></ResetPassword>}></Route>
        <Route exact path='/change-password' element={ <ChangePassword></ChangePassword>}></Route>


        
        
        <Route exact path='/approval-engine' element={ <ListApproval></ListApproval>}></Route>
        <Route exact path='/audit-trail' element={ <ListAuditTrail></ListAuditTrail>}></Route>

        <Route exact path='/approval-engine/detail/:id' element={ <DetailApproval></DetailApproval>}></Route>
        <Route exact path='/audit-trail/detail/:id' element={ <DetailAuditTrail></DetailAuditTrail>}></Route>
        
        <Route exact path='/listofpage/:id' element={ <ListPage></ListPage>}>
           
        </Route>
        <Route exact path='/create/:id' element={<Create></Create>}>
            
        </Route>
        <Route exact path='/detail/:id' element={<Detail></Detail>}>
            
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
