import React from 'react'
import { socketConnect } from 'socket.io-react';
 import './App.css';
class App extends React.Component {
  state={
    message:'',
    messageList:''
  }
   sendMessage=()=> {
    this.props.socket.emit('message', this.state.message);
     this.props.socket.on('sendMessage', msg => this.setState({messageList:msg}));
  }
  onMessageChangeHandler=(event)=>{
    this.setState({message:event.target.value});
  }


 render(){
       return (
       <div className="App">
          <header className="App-header">
          <input type="text" onChange={this.onMessageChangeHandler} />
            <button onClick={this.sendMessage}>
              Send!
            </button>
            <h5>{this.state.messageList.hello}</h5>
          </header>
        </div>
      );
  }
}
 
export default socketConnect(App);
