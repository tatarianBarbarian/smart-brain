import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, boxes = [] }) => {
    const regions = boxes.map((box, key) => {
        return (
            <div
                key={key}
                className="bounding-box"
                style={{
                    top: box.topRow,
                    left: box.leftCol,
                    right: box.rightCol,
                    bottom: box.bottomRow
                }}
            />
        );
    });

    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img
                    src={imageUrl}
                    alt="Face recognition target"
                    width="500px"
                    height="auto"
                    id="inputimage"
                />
                <div>{regions}</div>
            </div>
        </div>
    );
};

export default FaceRecognition;
