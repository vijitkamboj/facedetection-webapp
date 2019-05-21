import React from 'react';
import './Rank.css';

const App = ({isSignedIn}) => {
  if ( isSignedIn === true) {
    return (
      <div id="rank">
        <div className="rankh">Vijit, your rank is ...</div>
        <div className="rankh" id="rankn">#1</div>
      </div>
    )
  } else {
    return null
  }
}

export default App;


