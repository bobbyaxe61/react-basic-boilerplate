import React from 'react';
import './chaseAnimation.css';

function chaseAnimation(props = {style:{}}) {
    return (
        <div className="chase-animation-sk-chase" style={props.style}>
            <div className="chase-animation-sk-chase-dot"></div>
            <div className="chase-animation-sk-chase-dot"></div>
            <div className="chase-animation-sk-chase-dot"></div>
            <div className="chase-animation-sk-chase-dot"></div>
            <div className="chase-animation-sk-chase-dot"></div>
            <div className="chase-animation-sk-chase-dot"></div>
        </div>
    )
}

export default chaseAnimation;
