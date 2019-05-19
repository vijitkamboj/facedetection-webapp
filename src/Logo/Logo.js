import React from 'react';
import './Logo.css';
import Tilt from 'react-tilt'

function App() {
  return (
    <div id="logo">
        <Tilt className="Tilt" options={{ max : 25 }} >
           <div className="Tilt-inner"> </div>
        </Tilt>
    </div>

  );
}

export default App;