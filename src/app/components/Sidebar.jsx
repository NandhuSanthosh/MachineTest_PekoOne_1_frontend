"use client"
import React from 'react'
import { PiParallelogramFill } from "react-icons/pi";

import { FaRegUser } from "react-icons/fa";
import { IoMdChatboxes } from "react-icons/io";
import { IoMdMail } from "react-icons/io";
import { MdGroups } from "react-icons/md";
import { IoSearch } from "react-icons/io5";

import { useDispatch, useSelector } from 'react-redux';

import { setAll, setGroup, setIndividual, setSearch } from '../../redux/optionSlice';
import { chatRemoved } from '../../redux/chatSlice';



const options = [{
    icon: <IoMdMail size={"22"} />,
    tag: "ALL"
}, {
    icon: <FaRegUser size={"22"} />,
    tag: "INDIVIDUAL"
}, {
    icon: <MdGroups  size={"22"} />, 
    tag: "GROUP"
}, , {
    icon: <IoSearch  size={"22"} />, 
    tag: "SEARCH"
}]




const Sidebar = () => {

    const {option} = useSelector( (state) => state.option)
    const dispatch = useDispatch()


    function clickHandler(tag){
        dispatch(chatRemoved())
        console.log(tag)
        if(tag == "ALL") dispatch(setAll());
        else if(tag == "GROUP") dispatch(setGroup());
        else if(tag == "SEARCH") dispatch(setSearch())
        else dispatch(setIndividual())
    }

    console.log("options: ", option)

  return (
    <div className="md:w-20 bg-gray-800 md:rounded-3xl py-5 md:py-10">
        <div className='flex flex-row md:flex-col h-full justify-around md:justify-between'>

            <div className='md:w-full flex justify-center items-center'>
                <PiParallelogramFill size={"35"} className='text-primary-red'/>
            </div>

            <div className='flex md:flex-col gap-5 md:gap-16'>
                    {
                        options.map( op => {
                            return (
                                <div key={op.tag} onClick={() => clickHandler(op.tag)} className={`flex justify-center items-center+ hover:text-primary-red ${option == op.tag ? "text-primary-red" : "text-white"} transition-colors`}>
                                    {op.icon}
                                </div>
                            )
                        })
                    }
            </div>

            <div className='hidden md:block'></div>
        </div>
    </div>
  )
}

export default Sidebar
