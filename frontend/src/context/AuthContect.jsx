import { useEffect } from "react";
import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const backend_Url = import.meta.env.VITE_BACKEND_URL; // Ensure this is set in your .env file
    const navigate = useNavigate();

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
        }
    }, [])

    const value = {
        token,
        setToken,
        backend_Url,
        navigate,
    };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
