import React from "react";
import { render } from "react-dom";

const Popup = () => {
    return(
        <div>
            <h1>Testing TO-Hacks</h1>
            <p>This is a popup</p>
        </div>
    )
}

render(<Popup/>, document.getElementById("react-target"))