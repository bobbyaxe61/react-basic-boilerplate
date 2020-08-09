import React from 'react';
import ChaseAnimation from '../animations/chaseAnimation';

function missing() {
    return (
        <div>
            <div style={{textAlign:'center', marginTop:'20%'}}>
                <div style={{marginLeft:'47%'}}>
                    <ChaseAnimation />
                </div>
                <h1>Page Not Found</h1>
            </div>
        </div>
    )
}

export default missing;
