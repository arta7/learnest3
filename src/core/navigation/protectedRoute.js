import React, { lazy, Suspense } from "react";
// import { Switch, Route} from "react-router";
import { Switch, Route } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { useLoginContext } from "../contexts/authentication/authenticationProvider";
// import { Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, layout: Layout, ...rest }) => {
    const { token } = useLoginContext();
    // const token = true;
    return (
        <Route
            {...rest}
            element={(props) => {
                if (token) {
                    return (
                        <Layout>
                            <Component {...props} />
                        </Layout>
                    );
                } else {
                    return <Navigate to="/login" />;
                }
            }}
        />
    );
};

export default ProtectedRoute;

