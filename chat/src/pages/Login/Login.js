import React, {Component} from 'react';

class Login extends Component{

    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
        }
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }

    onUsernameChange(e){
        this.setState({username:e.target.value});
    }

    onPasswordChange(e){
        this.setState({password:e.target.value});
    }

    onLogin(){
        const {username, password} = this.state;
        fetch('/loginRequest', {
            method:'POST',
            body:JSON.stringify({username, password}),
            headers:{
                'Content-Type':'application/json'
            },
            credentials:'include'
        }).then(rsp=>rsp.json()).then(rsp=>console.log('rsp----', rsp));
    }

    onVerify(){
        fetch('/verifyRequest', {
            method:'POST',
            body:JSON.stringify({}),
            headers:{
                'Content-Type':'application/json'
            },
            credentials:'include'
        }).then(rsp=>rsp.json()).then(rsp=>console.log('rsp----', rsp));
    }

    render(){
        return (
            <div>
                <label>
                    账户名：<input type="text" value={this.state.username} onChange={this.onUsernameChange} />
                    密码：<input type="password" value={this.state.password} onChange={this.onPasswordChange} />
                </label>
                <button onClick={this.onLogin}>登录</button>
                <button onClick={this.onVerify}>验证</button>
            </div>
        );
    }

}

export default Login;