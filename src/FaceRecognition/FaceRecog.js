import React from 'react';
import './FaceRecog.css';

const App = ({imageUrl , faceBox}) => {
  const {posTop , posLeft , bheight , bwidth} = faceBox; 
  return (
    <div id="facerecog">
      <div id="face" style={{height: bheight, width: bwidth, top: posTop, left: posLeft }}></div>
      <img src= {imageUrl} alt="" id="inputimg"/>
        
    </div>
  );
}

export default App;
