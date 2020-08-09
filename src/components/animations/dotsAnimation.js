import React from 'react';
import './dotsAnimation.css';

function dotsAnimation(props = {style:{}}) {
    return (
        <div className="dots-animation-spinner" style={props.style}>
            <div className="dots-animation-bounce1"></div>
            <div className="dots-animation-bounce2"></div>
            <div className="dots-animation-bounce3"></div>
        </div>
    )
}

export default dotsAnimation;
