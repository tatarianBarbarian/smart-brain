import React from "react";

const Navigation = ({ onRouteChange }) => {
    return (
        <div style={{ textAlign: "right" }}>
            <p
                onClick={() => onRouteChange("signin")}
                className="f3 link dim black underline pa3 pointer"
            >
                Sign out
            </p>
        </div>
    );
};

export default Navigation;
