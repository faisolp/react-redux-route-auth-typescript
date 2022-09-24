import React, { Component } from 'react'

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {connect} from 'react-redux'
import {
  Login,
  LoadUserProfileServer,
  
 // loadUserProfile,
} from "./redux/userStoreSlice";
import HomePage from './page/Home';
import LoginPage from './page/Login';
import TestPage from './page/Test';
import IUserState from './redux/Interfaces/UserAuth/IUserState';
import IUserLogin from './redux/Interfaces/UserAuth/IUserLogin';
import './App.css'; 
import IUserToken from './redux/Interfaces/UserAuth/IUserToken';
interface IProps {
  userState:IUserState
  dispatch: (fn:any) => any;
} 
interface IState {
  
 // isAuthenticated:boolean;
}

const mapStateToProps=(state:any)=> ({
    
  userState:{ authToken: state.userStore.authToken,
              error:state.userStore.error,
              loading:state.userStore.loading,
              //userProfile:state.userStore.userProfile
            } as IUserState ,

})

class App extends Component<IProps,IState> {
  constructor(props:any) {
    super(props)
  
   
  };
  LogInClick=async ()=>{
    let authLogin:IUserLogin={
      username :"test",
      password:"1234"
    }
    await this.props.dispatch(Login(authLogin));
    const {userState}=this.props ;

    if(userState.authToken){
      let authToken:IUserToken={
        username:authLogin.username,
        token:userState.authToken
      }
      await this.props.dispatch(LoadUserProfileServer(authToken));
    }
    
  }

  render() {
    const isAuthenticated=Boolean(this.props.userState.authToken)
    return (
      <div  style={{ padding: 20, marginTop: 30 }}>
        <Router>
            
          {isAuthenticated?(
            <Routes>
                <Route path="/" element={<HomePage/>}>
                  <Route index element={<TestPage/>} />
                  <Route path="*" element={<HomePage/>} />
                </Route> 
            </Routes>):(
            <Routes>
                <Route path="/" element={<LoginPage LogInClick={this.LogInClick}/>}>
    
                  <Route path="*" element={<LoginPage  LogInClick={this.LogInClick}/>} />
                </Route> 
            </Routes>
            )
          }
        </Router>
        </div>
    )
  }
}

export default connect(mapStateToProps)(App)

/**
 
<Routes>
     
         <Route path="/" element={<HomePage/>}>
            <Route index element={<TestPage/>} />
            <Route path="*" element={<HomePage/>} />
         </Route>) 
       </Routes>
 */
