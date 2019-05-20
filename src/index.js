import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Particles from 'react-particles-js'
import particlesOptions from './particleOptions'
import Nav from './Nav/Nav';
import Logo from './Logo/Logo';
import ImageForm from './ImageForm/ImageForm'
import Rank from './Rank/Rank'



ReactDOM.render(<div id="container">
    <Particles className='particles' params={particlesOptions} />
    <Nav />
    <Logo />
    <Rank />
    <ImageForm />

</div>, document.getElementById('root'));



