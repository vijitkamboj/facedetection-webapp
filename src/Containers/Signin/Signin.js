import React from 'react';

class App extends React.Component {
	constructor(){
		super();
		this.state = {
			signInEmail : '',
			sighInPass : '',
			error : false
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail : event.target.value , error:false})
	}

	onPassChange = (event) => {
		this.setState({signInPass : event.target.value})
		this.setState({error:false})
	}

	onSubmitSignIn = () => {
		if ( this.state.signInEmail === '' || this.state.signInPass === ''){
			this.setState({error: true})
		}else{
			fetch("https://vast-woodland-56506.herokuapp.com/signin" ,{
				method : 'post',
				headers : {'Content-type' : 'application/json'},
				body: JSON.stringify({
					email : this.state.signInEmail,
					password : this.state.signInPass
				})
			})
			.then( res => res.json())
			.then( data => {
				if (data !== false){
					this.props.loadUser(data);
					this.setState({signInEmail : '',signInPass :''});
				}else{
					
					this.setState({error :true})
				}
			}).catch("Error while signin")
		}
	}

	onKeyPressEnter =(event) => {
		if (event.keyCode === 13){
			this.onSubmitSignIn()
		} 
	}

	render(){

		const {route } = this.props;
		const {error} = this.state;
		if (route === "signin" && error === false) {
			return(
				<div id = "form-cont" onKeyDown ={this.onKeyPressEnter}>
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
		} else if(route === "signin" && error === true) {
			return (
				<div id = "form-cont" onKeyDown ={this.onKeyPressEnter}>
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
					<p className = "label" id="error">wrong email or password</p>
				</div>
			)
		}else{
			return null
		}
	}
}

export default App;
