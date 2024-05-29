"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { CiMenuKebab } from "react-icons/ci";
import { IoMdArrowBack } from "react-icons/io";
import Message from './Message';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../config/axios';
import { chatRemoved } from '../../redux/chatSlice';


const chat = {
    image: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1716897815~exp=1716901415~hmac=db994c78828994e1525c0636915a44b64a8b27894f543c7bf2ea8fab05824018&w=740", 
    userName: "Rahul", 
    status: "Offline",
    lastMessage: "hi", 
    lastMessageTime: new Date(2002, 6, 2), 
    unreadCount: 2, 
    _id: 3
}

const MessageSession = () => {

    const dispatch = useDispatch()

    const userId = useSelector( state => state.user._id)

    const {selectedChatId, isGroup} = useSelector( state => state.chat)
    const [messageDetails, setMessageDetails] = useState(null)
    console.log(messageDetails)

    async function fetchChatDetails(){
        
        const params = new URLSearchParams();
        params.set("chatId", selectedChatId)
        params.set("isGroup", isGroup)

        axiosInstance.get('/chat/?' + params.toString())
        .then( res => {
            console.log(res.data)
            setMessageDetails(res.data)
        })
        .catch( err => {
            console.log(err.message)
        })
    }

    function pushMessage(newMessage){
        setMessageDetails({
            ...messageDetails, 
            messages: [...messageDetails.messages, newMessage]
        })
    }

    function handleRemoveSelectedChat(){
        dispatch(chatRemoved())
    }

    useEffect( () => {
        if(!selectedChatId ) return;
        
        fetchChatDetails();

    }, [selectedChatId])


    function getImageUrl(){
        if(messageDetails.isGroup) return "/group_stock.jpg";
        const otherUser = messageDetails.participants.filter( x => x.userId._id != userId);

        return otherUser[0].userId.profilePicture || "/default_user.avif"
    }

    function getName(){
        if(messageDetails.isGroup) return messageDetails.name;
        const otherUser = messageDetails.participants.filter( x => x.userId._id != userId);
        return otherUser[0].userId.userName
    }

    function getStatus(){
        if(messageDetails.isGroup) return messageDetails.name;
        const otherUser = messageDetails.participants.filter( x => x.userId._id != userId);
        return otherUser[0].userId.isOnline
    }


  return (
    <div className={` flex-1 flex-col md:gap-3 h-full flex ${ !selectedChatId && "hidden xl:flex"  }`}>

        {
            messageDetails ? 
                <>
                    <div className="bg-white md:shadow-md h-20 md:h-20 md:rounded-3xl border-solid border-b md:border-none border-gray-300">

                        <div className='flex items-center justify-between h-full px-5 xl:px-10'>

                            <div className='flex gap-3 items-center'>

                                <div className='xl:hidden' onClick={handleRemoveSelectedChat}>
                                    <IoMdArrowBack size={25} className='text-gray-600' />
                                </div>

                                {/* user profile picture */}
                                <div className='rounded-full relative'>
                                    <Image alt='user_profile' src={getImageUrl()} width={60} height={60} className='rounded-full'/>
                                    {
                                        !messageDetails.isGroup &&
                                        <div className={`absolute w-4 h-4 rounded-full border-4 border-solid border-white bottom-1 right-1 ${getStatus() ? "bg-green-400" : "bg-gray-500"}`} ></div>
                                    }
                                </div>


                                <div className=''> 
                                    <div className='flex gap-3 justify-between'>
                                        {/* user name */}
                                        <div>
                                            <span className='font-medium line-clamp-1'>{getName()}</span>
                                        </div>
                                    </div>
                                        
                                    {
                                        !messageDetails.isGroup && 
                                        <div className='flex gap-3 justify-between'>
                                            {/* online status */}
                                            <div>
                                                <span className={`text-sm line-clamp-1 text-gray-500`}>{getStatus() ? "Online" : "Offline"} </span>
                                            </div>
                                        </div>
                                    }
                                </div>


                            </div>


                            <div>
                                <button>
                                    <CiMenuKebab size={30} />
                                </button>
                            </div>

                        </div>
                    </div>
                    <Message messages={messageDetails.messages} pushMessage={pushMessage}/>
                </>
            : 

                <div className="bg-white md:shadow-md h-20 md:h-20 md:rounded-3xl border-solid border-b md:border-none border-gray-300 flex-1 flex flex-col justify-center items-center">
                    <Image src={"/chat_stock_image.png"} width={200} height={200} alt='no chat selected' />
                    <div className='flex flex-col items-center'>
                        <h3 className='text-2xl text-semibold'>Dialog Web</h3>
                        <p className='text-xs text-gray-500'>Send and receive message without keeping your phone online.</p>
                        <p className='text-xs text-gray-500'>Use Dialog on different divices.</p>
                    </div>
                </div>
        }


    </div>
  )
}

export default MessageSession
