import React,{Component} from 'react';

class Parent extends Component{
	render(){
		return(
			<div>
				{this.props.children}
			</div>
			)
	}
}

export default Parent;