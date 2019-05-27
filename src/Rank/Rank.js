import React from 'react';
import './Rank.css';

const App = ({isSignedIn ,user}) => {
  if ( isSignedIn === true) {
    return (
      <div id="rank">
        <div className="rankh">{`${user.name}`}, your rank is ...</div>
        <div className="rankh" id="rankn">#1</div>
      </div>
    )
  } else {
    return null
  }
}

export default App;


