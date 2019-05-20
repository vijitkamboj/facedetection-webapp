import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarify from 'clarifai';
import './App.css';

import particlesOptions from './particleOptions'
import Nav from './Nav/Nav';
import Logo from './Logo/Logo';
import ImageForm from './ImageForm/ImageForm'
import Rank from './Rank/Rank'

const app = new Clarify.App(
    {
        apiKey: "f361776820ed4c49989ed965325baaae"
    }
);

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
        console.log("click");
        app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg")
        .then(
                function (response) {
                    console.log(response)
                },
                function (err) {
                    // there was an error
                }
        );
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