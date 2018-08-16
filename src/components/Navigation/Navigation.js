import React from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <div style={{ textAlign: "right" }} className="pv3">
                <span
                    onClick={() => onRouteChange("signout")}
                    className="f3 link dim black underline pa3 pointer"
                >
                    Sign out
                </span>
            </div>
        );
    } else {
        return (
            <div style={{ textAlign: "right" }} className="pv3">
                <span
                    onClick={() => onRouteChange("signin")}
                    className="f3 link dim black underline pa3 pointer"
                >
                    Sign in
                </span>
                <span
                    onClick={() => onRouteChange("register")}
                    className="f3 link dim black underline pa3 pointer"
                >
                    Register
                </span>
            </div>
        );
    }
};

export default Navigation;
