import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

export const RequireLoginUser = () => {
    const token = Cookies.get("jwt");
    return(
        
    
        token ? <Outlet /> : <Navigate to="/login" />

    )

    
    
};

export const RequireLoginGuide=()=>{
    const token = Cookies.get("guide_jwt");
    return(
        
    
        token ? <Outlet /> : <Navigate to="/guide_login" />

    )

    
    
};

export  function AuthorizeUser({children}){
    const token = Cookies.get("jwt");

    if(!token) return <Navigate to={'/login'}/>

    return children
}

export  function AuthorizeGuide({children}){
    const token = Cookies.get("guide_jwt");

    if(!token) return <Navigate to={'/guide_login'}/>

    return children
}