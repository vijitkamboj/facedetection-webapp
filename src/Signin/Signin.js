import React from 'react';
import './Signin.css';

const App = ({route , onRouteChange}) => {
	if (route === "signin") {
		return(
			<div id = "form-cont">
				<div id="heading" >Welcome</div>
				<div className="field">
					<p className="label">Email</p>
					<input type="email" className="form" name="email"/>
				</div>
				<div className="field">
					<p className="label">Password</p>
					<input type="password" className="form" name="password"/>
				</div>
				<div id="signin" onClick={() => onRouteChange("home")}>Sign In</div>
			</div>
		)
	} else {
		return null
	}
}

export default App;
