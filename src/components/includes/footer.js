import React from 'react';

function footer() {
    return (
        <footer className="my-5 pt-5 text-muted text-center text-small">
            <p className="mb-1">© {new Date().getFullYear()} {process.env.REACT_APP_NAME}</p>
            <ul className="list-inline">
                <li className="list-inline-item"><a href="#0">Privacy</a></li>
                <li className="list-inline-item"><a href="#0">Terms</a></li>
                <li className="list-inline-item"><a href="#0">Support</a></li>
            </ul>
        </footer>
    )
}

export default footer;
