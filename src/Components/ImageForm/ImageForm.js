import React from 'react';
import './ImageForm.css';


function App({onInputChange,onSubmit , isSignedIn}) {
	if ( isSignedIn === true) {
		return (
		  <div id="Form-cont">
			  <p id="message">This app will detect faces in your pictures.Give it a try!!</p>
			  <div id="input-cont">
				  <div id="deticon" onClick = {onSubmit} ></div>
				  <input type="text" placeholder="Enter the url of image..." onChange={onInputChange}/>
			  </div>
		  </div>
		)
	  } else {
		return null
	  }	  
}

export default App;



