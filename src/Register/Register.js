import React from 'react';
import './Register.css';

const App = ({route , onRouteChange}) => {
	if (route === 'register') {
		return(
			<div id = "form-cont">
				<div id="heading" >Register</div>
				<div className="field">
					<p className="label">Name</p>
					<input type="text" className="form" name="name"/>
				</div>
				<div className="field">
					<p className="label">Email</p>
					<input type="email" className="form" name="email"/>
				</div>
				<div className="field">
					<p className="label">Password</p>
					<input type="password" className="form" name="password"/>
				</div>
				<div id="register" onClick={() => onRouteChange('signin')}>Register</div>
			</div>
		)
	} else {
		return null
	}
}

export default App;
