import React from 'react';

class App extends React.Component {
	constructor(){
		super();
		this.state = {
			signInEmail : '',
			sighInPass : '',
			error : false,
			loading : false
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
		this.setState({loading: true});
		if ( this.state.signInEmail === '' || this.state.signInPass === ''){
			this.setState({error: true , loading: false})
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
					this.setState({signInEmail : '',signInPass :'', loading: false});
				}else{
					
					this.setState({error :true , loading:false})
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
		const {error , loading} = this.state;
		if (route === "signin") {
			if (loading === false){
				if (error === false){
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
				}else{
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
							<div id = "error" >wrong email or password</div>
						</div>
					)
				}
			}else{
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
						<div id = "login" className="loading" >Signing In...</div>
					</div>
				)
			}
	
		}else{
			return null
		}
	}
}

export default App;
