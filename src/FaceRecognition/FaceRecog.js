import React from 'react';
import './FaceRecog.css';

const App = ({imageUrl , faceBox}) => {
  const {posTop , posLeft , bheight , bwidth} = faceBox; 
  return (
    <div id="facerecog">
        <img src= {imageUrl} alt="" id="inputimg"/>
        <div id="face" style={{height: bheight, width: bwidth, top: posTop, left: posLeft }}></div>
    </div>
  );
}

export default App;
