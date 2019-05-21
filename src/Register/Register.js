import React from 'react';
import './Register.css';

const App = () => {
	return(
		<div id = "form-cont">
			<div id="heading" >Register</div>
			<div className="field">
				<p className="label">Name</p>
				<input type="text" className="form"/>
			</div>
			<div className="field">
				<p className="label">Email</p>
				<input type="text" className="form"/>
			</div>
			<div className="field">
				<p className="label">Password</p>
				<input type="password" className="form" />
			</div>
			<div id="register">Register</div>
		</div>
	)
}

export default App;
