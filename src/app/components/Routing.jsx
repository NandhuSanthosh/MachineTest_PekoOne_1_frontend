"use client"
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'
import axiosInstance from '../../config/axios';
import { Spin } from 'antd';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../../redux/userSlice';

const contentStyle= {
  padding: 50,
  borderRadius: 4,
};

const content = <div style={contentStyle} />;



export const IsProtected = ({children}) => {
    const token = Cookies.get('token');
    const router = useRouter()
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(true)
    const [isAuth, setIsAuth] = useState(false)


    async function fetchUser(){
        setIsLoading(true)
        await axiosInstance.get('/auth')
        .then( res => {
            console.log(res)
            dispatch(userLoggedIn({_id: res.data._id, email: res.data.email, userName: res.data.userName, profilePicture: res.data.profilePicture}))
            setIsAuth(true)
        })
        .catch( err => {
            console.log(err)
            Cookies.remove('token')
            router.replace('/login')
        })
        .finally( () => {
            setIsLoading(false)
        })
    }

    useEffect( () => {
        fetchUser();
    }, [])

    console.log(isLoading)

    return (
        <>
            { isLoading && 
                <div className='w-lvw h-lvh flex justify-center items-center'>
                    <Spin tip="Loading" size="large">
                        {content}
                    </Spin>
                </div>
            }
            { isAuth && children }
        </>
       )
}


export const IsAuthRouter = ({children}) => {
    console.log("rendered")
    const token = Cookies.get('token');
    const router = useRouter()
    if(token){
        router.replace("/")
        return null
    } 
    return children;
}

