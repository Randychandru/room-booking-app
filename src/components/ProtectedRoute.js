import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuthenticated }) => {
    const navigate = useNavigate();
    const haslocalStorage = !!localStorage.getItem('user');

    useEffect(() => {
        if (!haslocalStorage && isAuthenticated) {
            // This is likely a state desync, so force logout
            console.log("ProtectedRoute - SessionStorage missing, force navigate to /login")
            navigate('/login');
        } else if (!isAuthenticated) {
            //This protects route for user who navigates to url when localSession is expired
            navigate('/login');
        }
    }, [isAuthenticated, navigate, haslocalStorage]);

    if (!isAuthenticated) {
        // Protected route
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;