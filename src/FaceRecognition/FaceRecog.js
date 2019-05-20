import React from 'react';
import './FaceRecog.css';

const App = ({imageUrl}) => {
  return (
    <div id="facerecog">
        <img src= {imageUrl} alt="" />
    </div>
  );
}

export default App;
