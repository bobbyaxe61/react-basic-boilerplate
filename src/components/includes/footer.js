import React from 'react';

const footer= ()=> {
    return (
        <footer className="bg-dark mt-5 py-4 text-muted text-center text-small">
            <div className="container">
                Copyright© &nbsp;<span className="liqair-color">{process.env.REACT_APP_NAME}</span>&nbsp; All Rights Reserved {new Date().getFullYear()}
            </div>
        </footer>
    )
}

export default footer;
