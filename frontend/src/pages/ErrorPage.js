import React from "react";

const ErrorPage = () => {
    return (
        <div className="errorPage">
            <div className="card">
                <h3>Error</h3>
                <p>Unfortunately, an error has occurred. Please try again later.</p>
                <button className="btn" onClick={() => window.location.href = "/"}>Return to Home</button>
                <div className="link-home">
                    <p>
                        Or <button type="button" onClick={() => window.location.href = "/login"}>log in</button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
