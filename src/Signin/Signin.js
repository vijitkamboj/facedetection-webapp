import React from 'react';
// import './Signin.css';

class App extends React.Component {
	constructor(){
		super();
		this.state = {
			signInEmail : '',
			sighInPass : '',
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail : event.target.value})
	}

	onPassChange = (event) => {
		this.setState({signInPass : event.target.value})
	}

	onSubmitSignIn = () => {
		
		this.props.onRouteChange("home")
		this.setState({signInEmail : ''})
		this.setState({signInPass :''})
	}

	render(){
		const {route} = this.props;
		if (route === "signin") {
			return(
				<div id = "form-cont">
					<div id="heading" >Welcome</div>
					<div className="field">
						<p className="label">Email</p>
						<input type="email" className="form" name="email" onChange={this.onEmailChange}/>
					</div>
					<div className="field">
						<p className="label">Password</p>
						<input type="password" className="form" name="password" onChange = {this.onPassChange}/>
					</div>
					<div id="signin" onClick={this.onSubmitSignIn}>Sign In</div>
				</div>
			)
		} else {
			return null
		}
	}
}

export default App;
