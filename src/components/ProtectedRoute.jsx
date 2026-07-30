import { Navigate } from "react-router-dom";


function ProtectedRoute({children}){


const user = localStorage.getItem("user");


if(!user){

    return <Navigate to="/student-login" />;

}


return children;


}


export default ProtectedRoute;