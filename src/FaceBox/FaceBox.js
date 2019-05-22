import React from 'react';
import './FaceBox.css';

const App = ({bheight , bwidth ,posTop , posLeft}) => {
    return(
        <div id="face" style={{height: bheight, width: bwidth, top: posTop, left: posLeft }}></div>
    )
}

export default App;


