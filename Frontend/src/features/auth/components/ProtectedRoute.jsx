import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
    const {isAuthenticated , loading} = useSelector(
        (state) => state?.auth
    );
    // console.log(loading);
    
    if (loading) {
        return <h1>Loading...</h1>;
    }
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;