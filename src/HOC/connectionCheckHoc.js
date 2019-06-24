import React,{Component} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const connetionCheckHoc =(WrappedComponent,socket)=>{
	return class extends Component{
		state={
			connection:false
		}
		componentDidMount(){
			 socket.on('connect',(data)=>{
				this.setState({connection:true});
			})
		}
		shoudComponentUpdate(){
			socket.on('status', (response)=>{
				console.log('shoudComponentUpdate')
				if(response) this.setState({connection:true});
				else  this.setState({connection:false});
			});
		}
		notify = () => toast("Wow so easy !");
		render(){
			return(
			this.state.connection?
				<WrappedComponent/>
			:  <div>
                   <button onClick={this.notify}>Notify !</button>
                 <ToastContainer />
                </div>
				)
		}
	}
} 

export default connetionCheckHoc; 