import React from 'react'
import io from 'socket.io-client';
import Parent from './Parent';
import './App.css';
import connetionCheckHoc from './HOC/connectionCheckHoc';
const socket = io(process.env.REACT_APP_SOCKET_URL);
class App extends React.Component {
  state={
    message:'',
    messageList:[]
  }
  componentDidMount(){
    socket.on('connect', msg=>console.log(msg));

  }
   sendMessage=()=> {
    let messageList = [...this.state.messageList];
    socket.emit('message', this.state.message);
    socket.on("outgoing data", (data)=>{
      messageList.push(data);
        this.setState({messageList:messageList,message:''})
    });
  }
  onMessageChangeHandler=(event)=>{
    this.setState({message:event.target.value});
  }
 render(){
  // var number = 123456.789;
  // console.log(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number));
  // console.log(new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(number));
  // console.log(new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(number));

  const divStyle={
    textAlign: 'center',
    color: 'rgb(255, 255, 255)',
    padding: '9px',
    width: '50%',
    marginLeft: '23%',
    background: '#5b4173',
    borderRadius: '22px'
  }
  return (
      <div className="container-fluid h-100">
         <div className="row justify-content-center h-100">
            <div className="col-md-12 col-xl-3 chat">
               <div className="card mb-sm-3 mb-md-0 contacts_card">
               <Parent>
                  <div className="card-body contacts_body">
                  </div>
                  <div className="card-footer">
                  <div className="form-group col-xl-3">
                    <input onChange={(e)=>this.onMessageChangeHandler(e)}
                     value={this.state.message}
                     style={{width: '18%',marginLeft:'37%'}} type="text" className="form-control" id="pwd" />
                     <button onClick={this.sendMessage} style={{ float: 'right',marginTop: '-35px',marginRight: '39%'}} type="button" className="btn btn-primary">Send</button>
                    </div>
                  </div>
                  <div className="col-xl-6">
                  {
                    this.state.messageList.map((message,index)=>
                      <h4 key={index} style={divStyle}>{message.message}</h4>
                    )
                  }
                  </div>
                  </Parent>
               </div>
            </div>
         </div>
      </div>
      );
   }
}
 
export default connetionCheckHoc(App,socket);
