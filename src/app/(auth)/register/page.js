"use client"
import React, { useReducer, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex, message, Upload } from 'antd';
import Link from 'next/link';
import Cookies from 'js-cookie';




import OrDivider from "../../components/OrDivider"
import Input from "../../components/Input"
import {validateName, validateEmail, validatePassword} from "../../../helpers/validationHelpers.js"
import axios from "../../../config/axios"





const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};



const page = () => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const [fetchingResponse, setFetchingResponse] = useState(false)
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
        setLoading(true);
        return;
        }
        if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (url) => {
            setLoading(false);
            setImageUrl(url);
        });
        }
    };

    const [messageApi, contextHolder] = message.useMessage();
    const error = (message) => {
      messageApi.open({
        type: 'error',
        content: message,
      });
    };

    const uploadButton = (
        <button
          style={{
            border: 0,
            background: 'none',
          }}
          type="button"
        >
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div
            style={{
              marginTop: 8,
            }}
          >
            Upload
          </div>
        </button>
    );


    const initialState = {
      userName: "", 
      isUserNameValid: false, 
      nameError: null,

      email: "", 
      isEmailValid: false,
      emailError: null, 

      password: "", 
      isPasswordValid: false, 
      passwordError: null,
      file: null
    }

    const reducer = (state, action) => {
      const {payload, type} = action;
      switch (action.type) {
        case "name-update": 
          
          var [status, message] = validateName(payload)
          return {
            ...state, 
            userName: payload, 
            isUserNameValid: status, 
            nameError: status? null : message
          }

        case "email-update": 
          
          var [status, message] = validateEmail(payload)
          return {
            ...state, 
            email: payload, 
            isEmailValid: status, 
            emailError: status? null : message
          }

        case "password-update": 
          
          var [status, message] = validatePassword(payload)
          return {
            ...state, 
            password: payload, 
            isPasswordValid: status, 
            passwordError: status? null : message
          }

      }
    }

    const [state, dispatch] = useReducer(reducer, initialState)


    const isFormValid = () => {
      return state.isEmailValid && state.isPasswordValid && state.isUserNameValid
    }

    const submit = async event => {
      event.preventDefault()

      if(!isFormValid()) return
      
      console.log(imageUrl)
      const formData = new FormData()
      
      formData.append("userName", state.userName)
      formData.append("email", state.email)
      formData.append("password", state.password)


      if(imageUrl) {
        console.log("image appended")
        formData.append("image", imageUrl)}
      setFetchingResponse(true)

      axios.post("/register", formData)
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
        setFetchingResponse(false);
      })
    }

    


  return (
    <div className='w-5/6 md:w-2/3 lg:w-1/2'>
        {contextHolder}


      {/* Title */}
      <div className='mb-10'>
        <div>
          <span className='font-medium text-4xl'>Get Started!</span>
        </div>
        <div className='mt-6'>
          <p className='text-gray-500'>A new and improved way of communicating</p>
        </div>
      </div>

      {/* Form */}
      <div>
        <form>

            {/* image upload */}
            <div className='flex justify-center'>
                {/* <Upload
                    name="avatar"
                    listType="picture-circle"
                    className="avatar-uploader"
                    showUploadList={false}
                    onChange={handleChange}
                >
                    {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="avatar"
                        style={{
                        width: '100%',
                        }}
                    />
                    ) : (
                    uploadButton
                    )}
                </Upload> */}

                <input type='file' onChange={(e) => setImageUrl(e.target.files[0])} />
            </div>

            {/* input field */}
            <div className='mt-4'>
              <Input type={"name"} state={state.userName} handler={(e) => dispatch({type: "name-update", payload: e.target.value})} error={!state.isUserNameValid} errorMessage={state.nameError} />
              <Input type={"email"} state={state.email} handler={(e)=> dispatch({type: "email-update", payload: e.target.value})} error={!state.isEmailValid} errorMessage={state.emailError}/>
              <Input type={"password"} state={state.password} handler={(e)=> dispatch({type: "password-update", payload: e.target.value})} error={!state.isPasswordValid} errorMessage={state.passwordError}/>

            </div>

            <div className='mt-7'>
              <button className={`w-full py-3 rounded-xl transition-colors ${isFormValid() ? "bg-blue-500 text-white" : "bg-gray-300 text-white cursor-not-allowed"}`} disabled={!isFormValid()} onClick={submit}>Register</button>
            </div>
        </form>
      </div>

      {/* divider */}
      <OrDivider />

      {/* Register link */}
      <div className='flex justify-end'>
        <p className='mr-3 text-gray-500'>Already have an account?</p>
        <Link href={"/login"} className='text-blue-500'>Login</Link>
      </div>


    </div>
  )
}

export default page
