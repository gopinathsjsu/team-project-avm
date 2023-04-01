import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminAuth = (Component) => {
    class AdminAuthenticatedComponent extends React.Component {
        render() {
            let isAuthenticated = false;
            const storedObject = JSON.parse(window.sessionStorage.getItem("USER_DETAILS"));            
            if (storedObject) {
                if (storedObject.token && storedObject.role === 'STAFF') {
                    isAuthenticated = true;
                }
            }

            if (!isAuthenticated) {
                return <Navigate to="/" />;
            }

            return <Component />;
        }
    }
    return AdminAuthenticatedComponent;
};

export default AdminAuth;
