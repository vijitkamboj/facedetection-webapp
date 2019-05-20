import React, { Component } from 'react';
import Particles from 'react-particles-js'
import './App.css';

import particlesOptions from './particleOptions'
import Nav from './Nav/Nav';
import Logo from './Logo/Logo';
import ImageForm from './ImageForm/ImageForm'
import Rank from './Rank/Rank'


class App extends Component {
    constructor(){
        super();
        this.state ={
            input : ""
        }  
    }

    onInputChange = (event) =>{
        console.log(event.target.value)
    }  

    onSubmit = () => {
        console.log("click")
    }

    render(){
        return (
            <div id="container">
                <Particles className='particles' params={particlesOptions} />
                <Nav />
                <Logo />
                <Rank />
                <ImageForm onInputChange = {this.onInputChange} onSubmit = {this.onSubmit}/>
            </div>
        );
    }

}

export default App;