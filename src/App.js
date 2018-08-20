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

const initialState = {
    input: "",
    imageUrl: "",
    boxes: [],
    route: "signin",
    isSignedIn: false,
    user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: ""
    }
};

class App extends Component {
    constructor() {
        super();
        this.state = initialState;
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
        fetch("http://localhost:3000/imageurl", {
            method: "post",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                input: this.state.input
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    fetch("http://localhost:3000/image", {
                        method: "put",
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                        .then(response => response.json())
                        .then(count => {
                            this.setState(
                                Object.assign(this.state.user, {
                                    entries: count
                                })
                            );
                        });
                }
                this.displayFaceBox(this.calculateFaceLocation(response));
            })
            .catch(err => {
                console.log(err);
            });
    };

    onRouteChange = route => {
        if (route === "signout") {
            this.setState(initialState);
        } else if (route === "home") {
            this.setState({ isSignedIn: true });
        }
        this.setState({ route: route });
    };

    loadUser = userData => {
        this.setState({
            user: {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                entries: userData.entries,
                joined: userData.joined
            }
        });
    };

    componentDidMount() {}

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
                        <Rank
                            name={this.state.user.name}
                            entries={this.state.user.entries}
                        />
                        <ImageLinkForm
                            onInputChange={this.onInputChange}
                            onSubmit={this.onSubmit}
                        />
                        <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
                    </div>
                ) : this.state.route === "signin" ? (
                    <SignIn
                        onRouteChange={this.onRouteChange}
                        loadUser={this.loadUser}
                    />
                ) : (
                    <Register
                        onRouteChange={this.onRouteChange}
                        loadUser={this.loadUser}
                    />
                )}
            </div>
        );
    }
}

export default App;
