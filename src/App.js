import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
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
            imageUrl: "",
            boxes: [],
            route: "signin",
            isSignedIn: false
        };
    }

    calculateFaceLocation = data => {
        const faceRegions = data.outputs[0].data.regions;
        const image = document.getElementById("inputimage");
        const width = Number(image.width);
        const height = Number(image.height);
        let boxesArr = [];

        faceRegions.forEach(el => {
            let box = {};
            el = el.region_info.bounding_box;
            box.leftCol = el.left_col * width;
            box.rightCol = width - el.right_col * width;
            box.topRow = el.top_row * height;
            box.bottomRow = height - el.bottom_row * height;
            boxesArr.push(box);
        });
        return boxesArr;
    };

    displayFaceBox = boxes => {
        this.setState({
            boxes: boxes
        });
    };

    onInputChange = e => {
        this.setState({
            input: e.target.value
        });
    };

    onSubmit = () => {
        this.setState({ imageUrl: this.state.input });
        app.models
            .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            .then(response => {
                this.displayFaceBox(this.calculateFaceLocation(response));
            })
            .catch(err => {
                console.log(err);
            });
    };

    onRouteChange = route => {
        if (route === "signout") {
            this.setState({ isSignedIn: false });
        } else if (route === "home") {
            this.setState({ isSignedIn: true });
        }
        this.setState({ route: route });
    };

    render() {
        const { imageUrl, boxes, route, isSignedIn } = this.state;
        return (
            <div className="App">
                <Particles params={particlesOptions} className="particles" />
                <Navigation
                    onRouteChange={this.onRouteChange}
                    isSignedIn={isSignedIn}
                />
                {route === "home" ? (
                    <div>
                        <Logo />
                        <Rank />
                        <ImageLinkForm
                            onInputChange={this.onInputChange}
                            onSubmit={this.onSubmit}
                        />
                        <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
                    </div>
                ) : this.state.route === "signin" ? (
                    <SignIn onRouteChange={this.onRouteChange} />
                ) : (
                    <Register onRouteChange={this.onRouteChange} />
                )}
            </div>
        );
    }
}

export default App;
