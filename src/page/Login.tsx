import React, { Component } from 'react'


interface IProps {
    LogInClick:()=>any
}
export default class Login extends Component<IProps> {
    LoginClick =()=>{

    }
    render() {
        return (
        <div>
            <p>Login</p>
            <button onClick={()=>this.props.LogInClick()}>Login</button>
        </div>
        
        )
    }
}
