import React from 'react';
import './Signin.css';

const App = () => {
	return(
		<div id = "form-cont">
			<div id="heading" >Welcome</div>
			<div className="field">
				<p className="label">Email</p>
				<input type="text" className="form"/>
			</div>
			<div className="field">
				<p className="label">Password</p>
				<input type="password" className="form" />
			</div>
			<div id="signin">Sign In</div>
		</div>
	)
}

export default App;
