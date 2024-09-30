import { Navigate, Route, Routes } from "react-router-dom";

import { useContext, useEffect } from "react";
import Login from "../component/page/login/login";
import Signup from "../component/page/signup/signUp";
import Dashboard from "../component/page/dashboard/Dashboard";
import { UserContext } from "../Context/UserContext";
import { GET_CASHE } from "../utils/helper";
import Sidebar from "../component/common/sidebar/Sidebar";
import Update from "../component/page/update";

function AuthRoutes() {
    const { setUserLogin, UserLogin } = useContext(UserContext);
    useEffect(() => {
        let getvalue = GET_CASHE("token") ?? null
        console.log('getvalue: ', getvalue);
        setUserLogin(getvalue)
        console.log('getvalue: ', getvalue);
    }, [UserLogin])


    console.log('UserLogin: ', UserLogin);


    return (
        <>
            <Routes>

                {!UserLogin ? (
                    <>
                    
                        <Route path="/" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />

                    </>
                ) : (
                    <>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                        <Route path="/update" element={<Update />}/>
                    </>

                )}
                <Route path="*" element={<Login />} />
            </Routes>
        </>
    );
}

export default AuthRoutes;
