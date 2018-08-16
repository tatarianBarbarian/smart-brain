import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Particles from "react-particles-js";
import Clarifai from "clarifai";

const app = new Clarifai.App({
    apiKey: "7fb972b15b7b4dd99273c72169bc88bc"
});

const particlesOptions = {
    particles: {
        line_linked: {
            shadow: {
                enable: true,
                color: "#3CA9D1",
                blur: 5
            }
        },
        number: {
            value: 71
        }
    }
};

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: "",
            imageUrl: ""
        };
    }

    onInputChange = e => {
        this.setState({
            input: e.target.value
        });
    };

    onSubmit = () => {
        this.setState({ imageUrl: this.state.input });
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
            function(response) {
                console.log(response);
            },
            function(err) {
                // there was an error
            }
        );
    };

    render() {
        return (
            <div className="App">
                <Particles params={particlesOptions} className="particles" />
                <Navigation />
                <Logo />
                <Rank />
                <ImageLinkForm
                    onInputChange={this.onInputChange}
                    onSubmit={this.onSubmit}
                />
                <FaceRecognition imageUrl={this.state.imageUrl} />
            </div>
        );
    }
}

export default App;
