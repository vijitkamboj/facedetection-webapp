import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Nav from './Nav/Nav';
import Logo from './Logo/Logo';
import ImageForm from './ImageForm/ImageForm'

ReactDOM.render(<div id="container">
    <Nav />
    <Logo />
    <ImageForm />
</div>, document.getElementById('root'));



