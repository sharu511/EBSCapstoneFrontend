import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'
import { toast } from 'sonner';
import Cookies from "js-cookie"

const ProtectedRoutes = () => {
    const userId = Cookies.get("userToken");
    if (!userId) {
        toast.warning("Please Login before accessing", 3000)
        // setTimeout(() => {
        //     return <Navigate to="/login" /> 
        // }, 3000);
        return <Navigate to="/login" />

    }

    return <Outlet />
}

export default ProtectedRoutes;