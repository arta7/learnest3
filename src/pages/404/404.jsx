import React, { useState, useEffect } from 'react';

const NotFound = (props) => {

    useEffect(() => {
        document.getElementsByTagName("body")[0].style = "background-color:#fff !important;";
        // document.getElementsByTagName("aside")[0].style = "background-color:#fff !important;";
    }, []);

    return (
        <div className="m-0 m-auto p-5 d-flex flex-column justify-content-center align-items-center fs-2 fw-bold text-main-color-1">
            <h1 className="m-0 p-0 mb-2 fw-bold fs-1 text-main-color-1">
                404
            </h1>
            <div className="m-0 p-0 mb-2 fs-2 text-main-color-1">
                صفحه مورد نظر یافت نشد .
            </div>
        </div>
    );
}

export default NotFound;