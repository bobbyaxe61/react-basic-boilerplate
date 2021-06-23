import React, { Component } from 'react';
import DotsAnimation from '../animations/dotsAnimation';

export const Landing = () => {
    
        return (
            <div style={{height:'100vh'}}>
                <div style={{textAlign:'center', marginTop:'20%'}}>
                    <DotsAnimation />
                    <h1>Hello From {process.env.REACT_APP_NAME}</h1>
                </div>
            </div>
        )
    
}

export default Landing;
