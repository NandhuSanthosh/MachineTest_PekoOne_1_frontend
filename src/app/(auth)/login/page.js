"use client";
import React, { useState } from 'react'
import Link from 'next/link';
import { message } from 'antd';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'


import Input from "../../components/Input"
import OrDivider from "../../components/OrDivider"
import axiosInstance from '../../../config/axios';



const page = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const router = useRouter();

  const submit = async event => {
    event.preventDefault()

    // setFetchingResponse(true)

    axiosInstance.post("/login", {
      email, 
      password
    })
    .then( res => {
      console.log("Success response redirect to home")
      const {jwtToken} = res.data;
      console.log(jwtToken)
      Cookies.set('token', jwtToken, { expires: 7 }); // Expires in 7 days
      router.replace("/")
    })
    .catch( err => {
      console.log(err)
      error(err.response.data.message)
    })
    .finally( () => {
      // setFetchingResponse(false);
    })
  }

  const [messageApi, contextHolder] = message.useMessage();
  const error = (message) => {
    messageApi.open({
      type: 'error',
      content: message,
    });
  };


  return (
    <div className='w-5/6 md:w-2/3 lg:w-1/2'>
        {contextHolder}

      {/* Title */}
      <div className='mb-10'>
        <div>
          <span className='font-medium text-4xl'>Welcome back!</span>
        </div>
        <div className='mt-6'>
          <p className='text-gray-500'>A new and improved way of communicating</p>
        </div>
      </div>

      {/* Form */}
      <div>
        <form>
            {/* input field */}
            <div className='mt-4'>
              <Input type={"email"} state={email} handler={(e) => setEmail(e.target.value)}/>
              <Input type={"password"} state={password} handler={(e) => setPassword(e.target.value)}/>
            </div>

            <div className='mt-7'>
              <button className='w-full py-3 rounded-xl bg-blue-500 text-white' onClick={submit}>Login</button>
            </div>
        </form>
      </div>

      {/* divider */}
      <OrDivider />

      {/* Register link */}
      <div className='flex justify-end'>
        <p className='mr-3 text-gray-500'>Don't have an account?</p>
        <Link href={"/register"} className='text-blue-500'>Register</Link>
      </div>


    </div>
  )
}

export default page
