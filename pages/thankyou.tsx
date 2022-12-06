import React from "react";
const Timer = window.setTimeout(() => {
    window.location.href = "./index.tsx";
    }, 10000);

export
const ThankYou = () => {
    return (
        <><div>
            {/* create a 10 second timer to route back to the index.tsx file */}

            <h1>Thank you! </h1>
            <img src="/nikeicon.png" alt="nikeicon" />
        </div><Timer /></>
    );
    }
    export default ThankYou;