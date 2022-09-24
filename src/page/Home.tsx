import React, { Component } from 'react'
//import { withRouter } from '../components/navigation/withRouter';
//import { INavigation } from '../components/navigation/INavigation';
import {connect} from 'react-redux'
import IUserState from '../redux/Interfaces/UserAuth/IUserState';

import {
  LogOut,
} from "../redux/userStoreSlice";

interface IProps {
  userState:IUserState
  dispatch: (fn:any) => any;
} 

const mapStateToProps=(state:any)=> ({
    
  userState:{ 
    userProfile: state.userStore.userProfile,
  } as IUserState ,

})
class Home extends Component<IProps> {

  LogOutClick = async ()=>{
    await this.props.dispatch(LogOut());
  }  
  render() {
    const {userProfile}=this.props.userState
    console.log("userProfile",userProfile)
    return (
      <div  style={{ padding: 20, marginTop: 30 }}>
        <div>Home</div>
        <p>{userProfile?.username}</p>
        <p>{userProfile?.email}</p>
        <button onClick={()=>this.LogOutClick()}>Logout</button>
      </div>
    )
  }
}
export default connect(mapStateToProps)(Home)