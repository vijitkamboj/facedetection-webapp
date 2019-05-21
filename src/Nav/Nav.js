import React from 'react';
import './Nav.css';

const App = ({isSignedIn , onRouteChange}) => {
	if (isSignedIn === true) {
		return(
			<div id="nav">
				<div className="navbtn" onClick={() => onRouteChange("signin")}>Sign Out</div>
			</div>
		)
	} else {
		return(
			<div id="nav">
				<div className="navbtn" onClick={() => onRouteChange("register")}>Register</div>
				<div className="navbtn" onClick={() => onRouteChange("signin")}>Sign In</div>
			</div>
		)
	}
	
}

export default App;
