// src/components/ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContect";

const ProtectedRoute = ({ children }) => {
    
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!user || !token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
