import React from 'react';
import './FaceRecog.css';

const App = ({imageUrl , faceBox , isSignedIn}) => {
  const {posTop , posLeft , bheight , bwidth} = faceBox; 
  if (isSignedIn ===true) {
    return (
      <div id="facerecog">
        <div id="face" style={{height: bheight, width: bwidth, top: posTop, left: posLeft }}></div>
        <img src= {imageUrl} alt="" id="inputimg"/>
          
      </div>
    );
    
  } else {
    return null
  }
}

export default App;
