import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
    return (
        <div>
            <p className="f3">
                {
                    "This Magic Brain will detect faces on your photos. Give it a try."
                }
            </p>
            <div className="center">
                <div className="pa4 br3 shadow-5 form center">
                    <input
                        onChange={onInputChange}
                        type="text"
                        className="f4 pa-2 w-70 center"
                    />
                    <button
                        onClick={onSubmit}
                        className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple bn pointer"
                    >
                        Detect
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageLinkForm;
