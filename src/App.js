import React, {Component} from 'react';
import Particles from 'react-particles-js';
import './App.css';

import particlesOptions from './particleOptions'
import Nav from './Components/Nav/Nav';
import Logo from './Components/Logo/Logo';
import ImageForm from './Components/ImageForm/ImageForm'
import Rank from './Components/Rank/Rank'
import FaceRecog from './Components/FaceRecognition/FaceRecog'
import Signin from './Containers/Signin/Signin'
import Register from './Containers/Register/Register'



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

            fetch("https://vast-woodland-56506.herokuapp.com/imageApi", {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    imageUrl : this.state.input
                })
            })
            .then( res => res.json())
            .then(response => {
                this.faceBoxPositions(this.boundingBox(response.outputs[0].data.regions))
                fetch("https://vast-woodland-56506.herokuapp.com/imagecount", {
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
                    new_entries => {
                        this.setState(Object.assign(this.state.user, {
                            entries: new_entries
                        }))
                    }
                )
            })
            .catch(err => "Error in getting response from FACE DETECT api " + err)
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
        this.onRouteChange("home");
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