import React from 'react';
import { Navigate } from 'react-router-dom';

const MemberAuth = (Component) => {
    class MemberAuthenticatedComponent extends React.Component {
        render() {
            let isAuthenticated = false;
            const storedObject = JSON.parse(window.sessionStorage.getItem("USER_DETAILS"));            
            if (storedObject) {
                if (storedObject.token && (storedObject.role === 'MEMBER' || storedObject.role === 'FREE_TRIAL_MEMBER')) {
                    isAuthenticated = true;
                }
            }

            if (!isAuthenticated) {
                return <Navigate to="/" />;
            }
            return <Component />;
        }
    }
    return MemberAuthenticatedComponent;
};

export default MemberAuth;
