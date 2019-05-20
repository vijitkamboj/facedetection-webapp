import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarify from 'clarifai';
import './App.css';

import particlesOptions from './particleOptions'
import Nav from './Nav/Nav';
import Logo from './Logo/Logo';
import ImageForm from './ImageForm/ImageForm'
import Rank from './Rank/Rank'
import FaceRecog from './FaceRecognition/FaceRecog'

const app = new Clarify.App(
    {
        apiKey: "f361776820ed4c49989ed965325baaae"
    }
);

class App extends Component {
    constructor(){
        super();
        this.state ={
            input : "",
            imageUrl : ""
        }  
    }

    onInputChange = (event) =>{
        this.setState({input: event.target.value})
    }  

    onSubmit = () => {
        this.setState({imageUrl:this.state.input});
        app.models.predict(Clarify.FACE_DETECT_MODEL, this.state.input)
        .then(
                function (response) {
                    console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
                },
                function (err) {
                    console.log("OOPS!! Something went wrong " + err)                    
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
                <FaceRecog imageUrl= {this.state.imageUrl}/>
            </div>
        );
    }

}

export default App;