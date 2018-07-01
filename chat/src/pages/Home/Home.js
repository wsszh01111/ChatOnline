import React from 'react';
import io from 'socket.io';
import './style.css';

class Home extends React.Component{

    constructor(props){
        super(props);
        this.socket; //连接对象
        this.state={
            id:undefined,
            message:'', //用户输入的信息
            messages:[] //聊天记录
        }
    }

    componentWillMount(){
        this.socket = io.connect();
        this.socket.on('connected', (id)=>{
            console.log('connected---', id)
            this.setState({messages:[{id, msg:'连接成功'}], id});
        });
        this.socket.on('message', (rsp)=>{
            console.log('receive message: ', rsp);
            // const newMsg = rsp.id === this.state.id?`${rsp.msg}：${rsp.id}`:`${rsp.id}：${rsp.msg}`;
            this.setState({messages:[...this.state.messages, rsp]});
        })
    }

    onInputChange(e){
        this.setState({message:e.target.value});
    }

    onButtonClick(){
        console.log('sending message: ', this.state.message)
        this.socket.emit('message', this.state.message);
        this.setState({message:''});
    }

    render(){
        return(
            <div className='wrapper'>
                <div className='message'>
                    <ul>
                        {this.state.messages.map((m, i)=>{
                            return m.id == this.state.id?
                            <li key={i} style={{justifyContent:'flex-end'}}><span>{m.id}：{m.msg}</span></li>:
                            <li key={i} style={{justifyContent:'flex-start'}}><span>{m.id}：{m.msg}</span></li>
                        })}
                    </ul>
                </div>
                <div className='input-wrapper'>
                    <input value={this.state.message} onChange={this.onInputChange.bind(this)} className='input' type="text" />
                    <button onClick={this.onButtonClick.bind(this)} className='input-button'>输入</button>
                </div>
            </div>
        )
    }
}

export default Home;