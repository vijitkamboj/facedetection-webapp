import React from 'react';
import './Register.css';

class App extends React.Component{
	constructor(){
		super();
		this.state = {
			registerEmail: '',
			registerPass : '',
			registerName : '',
			error : ''
		}
	}

	onEmailChange = (event) => {
		this.setState({registerEmail : event.target.value})
	}

	onPassChange = (event) => {
		this.setState({registerPass : event.target.value})
	}

	onNameChange = (event) => {
		this.setState({registerName : event.target.value})
	}

	onSubmitRegister = () => {
		const {registerEmail ,registerName ,registerPass} = this.state;
		if ( registerEmail !== '' && registerName !== '' && registerPass !==''){
			fetch('https://vast-woodland-56506.herokuapp.com/register' , {
				method : 'post',
				headers : {'Content-type' : 'application/json'},
				body: JSON.stringify({
					email : this.state.registerEmail,
					password : this.state.registerPass,
					name : this.state.registerName
				})
			})
			this.props.onRouteChange('signin')
		}else{
			alert("Please fill out all feilds")
		}
	}

	render(){
		const {route} = this.props;
		if (route === 'register') {
			return(
				<div id = "form-cont">
					<div id="heading" >Register</div>
					<div className="field">
						<p className="label">Name</p>
						<input type="text" className="form" name="name" onChange = {this.onNameChange}/>
					</div>
					<div className="field">
						<p className="label">Email</p>
						<input type="email" className="form" name="email" onChange = {this.onEmailChange}/>
					</div>
					<div className="field">
						<p className="label">Password</p>
						<input type="password" className="form" name="password" onChange = {this.onPassChange}/>
					</div>
					<div id="register" onClick={this.onSubmitRegister} >Register</div>
				</div>
			)
		} else {
			return null
		}
	}
}

export default App;
