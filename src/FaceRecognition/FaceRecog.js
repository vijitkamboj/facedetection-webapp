import React from 'react';
import './FaceRecog.css';
import FaceBox from "../FaceBox/FaceBox"

const App = ({imageUrl , faceBoxes , isSignedIn}) => { 
  if (isSignedIn ===true) {
    return (
      <div id="facerecog">
        {
          faceBoxes.map( (i) =>{
            const {posTop , posLeft , bheight , bwidth} = i;
            return(
              <FaceBox posTop={posTop} posLeft={posLeft} bheight={bheight} bwidth={bwidth}/>
            )
          } )
        }
        <img src= {imageUrl} alt="" id="inputimg"/>
      </div>
    );
  } else{
    return null;
  }
}

export default App;
