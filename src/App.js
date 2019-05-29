import React, {Component} from 'react';
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

const app = new Clarify.App({
    apiKey: "f361776820ed4c49989ed965325baaae"
});

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: "",
            imageUrl: "",
            faceBoxes: [],
            route: "signin",
            isSignedIn: false,
            user: {}
        }
    }

    faceBoxPositions = (positionsArray) => {
        const image = document.getElementById("inputimg");
        const [iwidth, iheight] = [image.width, image.height];
        const box_position = positionsArray.map((i) => {
            const {
                top_row,
                left_col,
                bottom_row,
                right_col
            } = i;
            const posTop = top_row * iheight;
            const posLeft = left_col * iwidth;
            const bheight = iheight * (bottom_row - top_row);
            const bwidth = iwidth * (right_col - left_col);
            return ({
                posTop,
                posLeft,
                bheight,
                bwidth
            })
        })

        this.setState({
            faceBoxes: box_position
        });
    }

    boundingBox = (regionData) => {
        return (regionData.map((i) => {
            return i.region_info.bounding_box
        }))
    }

    onInputChange = (event) => {
        this.setState({
            input: event.target.value
        })
        if (event.target.value === ''){
            this.setState({imageUrl:'',faceBoxes:[]})
        }
    }

    onSubmitImage = () => {
        if (this.state.input !== '') {
            this.setState({
                imageUrl: this.state.input,
            });

            app.models.predict(Clarify.FACE_DETECT_MODEL, this.state.input)
            .then(response => {
                this.faceBoxPositions(this.boundingBox(response.outputs[0].data.regions))
                fetch("http://localhost:3000/imagecount", {
                    method: 'put',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: this.state.user.id,
                        count: this.boundingBox(response.outputs[0].data.regions).length
                    })
                }).then(
                    res => res.json()
                ).then(
                    data => this.setState(Object.assign(this.state.user, {
                        entries: data.entries
                    }))
                )
            })
            .catch(err => "Error in increasing entries " + err)
        }


    }

    onRouteChange = (route) => {
        this.setState({
            route: route
        });
        switch (route) {
            case 'home':
                this.setState({
                    isSignedIn: true
                })
                break;
            case 'signin':
                this.setState({
                    isSignedIn: false,
                    user: {},
                    input: "",
                    imageUrl: "",
                    faceBoxes: []
                })
                break;
            case 'register':
                this.setState({
                    isSignedIn: false
                })
                break
            default:
                this.setState({
                    route: "signin",
                    isSignedIn: false,
                    user: {}
                })
        }
    }

    loadUser = (user_data) => {
        this.setState({
            user: user_data
        })
    }


    render(){
        const {isSignedIn , route , imageUrl, faceBoxes} = this.state;
        const {onRouteChange , onInputChange , onSubmitImage} = this;
        return (
            <div id="container">
                <Particles 
                className='particles' 
                params={particlesOptions} />

                <Nav 
                isSignedIn={isSignedIn} 
                onRouteChange= {onRouteChange}
                />

                <Logo />

                <Rank 
                isSignedIn={isSignedIn}
                user = {this.state.user} />

                <ImageForm 
                isSignedIn={isSignedIn}
                onInputChange = {onInputChange} 
                onSubmit = {onSubmitImage}/>

                <FaceRecog 
                isSignedIn={isSignedIn} 
                imageUrl= {imageUrl} 
                faceBoxes= {faceBoxes}/>

                <Signin 
                route = {route} 
                onRouteChange ={onRouteChange}
                loadUser = {this.loadUser}
                />

                <Register 
                route = {route} 
                onRouteChange ={onRouteChange}/>
            </div>
        );
    }

}

export default App;