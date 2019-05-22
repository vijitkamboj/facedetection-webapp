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
import Signin from './Signin/Signin'
import Register from './Register/Register'

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
            imageUrl : "",
            faceBoxes : [],
            route:"home",
            isSignedIn: true
            
        }  
    }


    faceBoxPositions = (positionsArray) => {
        const image = document.getElementById("inputimg");
        const [iwidth,iheight] = [image.width , image.height];
        const box_position = positionsArray.map(  (i)  => {
            const {top_row,left_col,bottom_row,right_col} = i ;
            const posTop = top_row*iheight;
            const posLeft = left_col*iwidth;
            const bheight = iheight*(bottom_row - top_row );
            const bwidth = iwidth*(right_col - left_col );
            return({posTop , posLeft , bheight , bwidth})
        } )

        this.setState({faceBoxes : box_position});
    }

    boundingBox = (regionData) => {
        return ( regionData.map( (i) => {
            return i.region_info.bounding_box
        }))
    }

    onInputChange = (event) =>{
        this.setState({input: event.target.value})
    }  

    onSubmit = () => {
        if (this.state.input !== ''){
            this.setState({imageUrl:this.state.input});
            app.models.predict(Clarify.FACE_DETECT_MODEL, this.state.input)
            .then( response => this.faceBoxPositions(this.boundingBox(response.outputs[0].data.regions)))
            .catch( err => "OOPS Something went wrong" + err)
        }
        
    }

    onRouteChange = (route) =>{
        this.setState({route : route});
        if( route === 'home'){
            this.setState({isSignedIn: true})
        }
        else{
            this.setState({isSignedIn: false})
        }  
    }

    render(){
        const {isSignedIn , route , imageUrl, faceBoxes} = this.state;
        const {onRouteChange , onInputChange , onSubmit} = this;
        
        return (
            <div id="container">
                <Particles 
                className='particles' 
                params={particlesOptions} />

                <Nav 
                isSignedIn={isSignedIn} 
                onRouteChange= {onRouteChange}/>

                <Logo />

                <Rank 
                isSignedIn={isSignedIn} />

                <ImageForm 
                isSignedIn={isSignedIn}
                 onInputChange = {onInputChange} 
                 onSubmit = {onSubmit}/>

                <FaceRecog 
                isSignedIn={isSignedIn} 
                imageUrl= {imageUrl} 
                faceBoxes= {faceBoxes}/>

                <Signin 
                route = {route} 
                onRouteChange ={onRouteChange}/>

                <Register 
                route = {route} 
                onRouteChange ={onRouteChange}/>
            </div>
        );
    }

}

export default App;