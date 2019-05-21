import React from 'react';
import './Nav.css';

const App = (isSignedIn) => {
	if (isSignedIn === true) {
		return(
			<div id="nav">
				<div className="navbtn">Sign Out</div>
			</div>
		)
	} else {
		return(
			<div id="nav">
				<div className="navbtn">Register</div>
				<div className="navbtn">Sign In</div>
			</div>
		)
	}
	
}

export default App;
