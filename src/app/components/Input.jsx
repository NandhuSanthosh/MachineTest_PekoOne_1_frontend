"use client";
import React, { useState } from 'react'
import { MdOutlineAlternateEmail } from "react-icons/md";
import { TbPasswordFingerprint } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";


import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";


function getIcon(type) {
    if(type == "password") return <TbPasswordFingerprint  size={25}/>
    else if(type == "name") return <FaRegUserCircle  size={25}/>
    else return <MdOutlineAlternateEmail  size={25}/>
}

function getPlaceholder(type){
    if(type == "password") return "Atleast 8 characters";
    else if(type == "name") return "Enter you name"
    else  return "you@example.com"
}

const Input = ({type, state, handler, error, errorMessage}) => {
   
    const [isVisible, setIsVisible] = useState(false)

  return (
    <div className={`relative p-2 bg-gray-100 rounded-xl mb-7 flex gap-3 border border-solid  ${error && state != "" ? "border-red-500" : "border-gray-100"}`} >
        <div className='bg-white rounded-xl flex justify-center items-center p-2 text-blue-400'>
            { getIcon(type) }
        </div>
        <input state={state} onChange={handler} type={ type == "password" ? isVisible ? "text" : "password" : "text" } className='bg-transparent outline-none text-lg flex-1' placeholder={getPlaceholder(type)} />
        {
            type == "password" &&
            <div className='w-10 flex items-center'>
                {
                    isVisible ? 
                        <FaEye size={25} onClick={() => setIsVisible(false)}/>
                    : 
                        <FaEyeSlash size={25} onClick={() => setIsVisible(true)}/>
                }
            </div>
        }
        {
            error && state != "" && 
            <div className='absolute text-xs text-red-500 right-1 -top-4 '>
                <span>{errorMessage}</span>
            </div>
        }
    </div>

  )
}

export default Input
