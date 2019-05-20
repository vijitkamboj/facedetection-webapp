import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Particles from 'react-particles-js'
import Nav from './Nav/Nav';
import Logo from './Logo/Logo';
import ImageForm from './ImageForm/ImageForm'
import Rank from './Rank/Rank'

const particlesOptions = {
    particles: {
        number: {
            value:100,
            density: {
                enable: true,
                value_area: 800
            }
        },line_linked: {
            color: "#000000",
        },
        color: {
            value: "#000000",
        },shape: {
            type: "polygon",
        },size: {
            value: 3
        }
    }
}

ReactDOM.render(<div id="container">
    <Particles className='particles' params={particlesOptions} />
    <Nav />
    <Logo />
    <Rank />
    <ImageForm />

</div>, document.getElementById('root'));



