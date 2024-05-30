import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import axiosInstance from '../../config/axios';
import { chatSelected } from '../../redux/chatSlice';


function formatDate(date) {
    const inputDate = new Date(date);
    const now = new Date();
    
    const isToday = inputDate.toDateString() === now.toDateString();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    if (isToday) {
        return inputDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (inputDate >= startOfWeek && inputDate <= endOfWeek) {
        return inputDate.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
        const day = String(inputDate.getDate()).padStart(2, '0');
        const month = String(inputDate.getMonth() + 1).padStart(2, '0');
        const year = inputDate.getFullYear();
        return `${day}/${month}/${year}`;
    }

    
}

const Chats = ({data, heading}) => {
    const { option } = useSelector( (state) => state.option)
    const userId = useSelector( state => state.user._id)

    const [chatList, setChatList] = useState(data)

    const dispatch = useDispatch();
    if(!data.length && option == "SEARCH"){
        return (
            <div className='h-full w-full flex flex-col justify-center items-center gap-3'>
                <Image src={"/search_user.jpg"} width={300} height={300} alt='search-user-image'/> 
                <h1 className='font-medium text-2xl'>Search User</h1>
            </div>
        )
    }
    if(!data.length){
        return (
            <div className='h-full w-full flex flex-col justify-center items-center gap-3'>
                <h1 className='font-medium text-xl'>No {heading == "All" ? "Chat" : heading} Found!</h1>
                <Image src={"/no_chat_image.png"} width={200} height={200} alt='no-user-image'/> 
                <div className='flex flex-col items-center'>
                    <h3 className='text-2xl text-semibold'>No messages yet!</h3>
                    <p className='text-xs text-gray-500'>Looks like you haven't initiated a conversation with anyone.</p>
                </div>
            </div>
        )
    }


    function handleSelect(chat){
        const isGroup = Array.isArray(chat.participants)
        setChatList( state => {
            return state.map( x => {
                if(x._id == chat._id)
                    return {
                        ...chat, 
                        unreadCount: 0
                    }

                return x;
            })
        })
        if(isGroup) {
            dispatch(chatSelected({id: chat._id, isGroup}))
        }
        else {
            axiosInstance.get('/chat/chat_userId?userId=' + chat._id)
            .then( res => {
                dispatch(chatSelected({id: res.data._id, isGroup: false}))
            })
            .catch( err => {
                console.log(err.message)
            })
        }
    }


    function getImageUrl(chat){
        if(chat.isGroup) return "/group_stock.jpg";
        
        if(Array.isArray(chat.participants)){
            const otherUser = chat.participants.filter( x => x._id != userId);
            return otherUser[0].profilePicture || "/default_user.avif"
        }
        else {
            return chat.profilePicture || "/default_user.avif"
        }

    }

    function getName(chat){
        if(chat.isGroup) return chat.name;
        if(Array.isArray(chat.participants)){
            const otherUser = chat.participants.filter( x => x._id != userId);
            return otherUser[0].userName
        }
        else {
            return chat.userName
        }
    }

    useEffect( () => {
        
        setChatList(data)
    }, [data])


  return (
    <div className='mb-6'>
      {
        heading && 
        <div className='text-gray-600 font-medium text-xs px-10'>
            <span>{heading.toUpperCase()}</span>
        </div>
      }
      <div>
        {
            chatList.length == 0 ? 
                <div className='h-7 flex justify-center items-center'>
                    <span className='text-xs text-gray-500'>No <span className='font-semibold'>{heading.slice(0,1).toUpperCase() + heading.slice(1).toLowerCase()}</span> with the name.</span>
                </div>

            : 

                chatList.map( (chat, index) => {
                    return (
                        <div key={index} className='px-10 h-full hover:bg-gray-100' onClick={() => handleSelect(chat)}>
                            <div className='flex gap-3 py-4 border-b border-solid border-gray-200'>
                                {/* user profile picture */}
                                <div className='bg-gray-300 rounded-full'>
                                    <Image alt='user_prfile' src={getImageUrl(chat)} width={60} height={60} className='rounded-full'/>
                                </div>

                                <div className='flex-1 flex  flex-col justify-center'> 
                                    <div className='flex gap-3 justify-between'>
                                        {/* user name */}
                                        <div>
                                            <span className='font-medium line-clamp-1'>{getName(chat)}</span>
                                        </div>

                                        {/* date */}
                                        {
                                            chat.lastMessaage &&
                                            <div>
                                                <span className={`text-sm text-nowrap ${chat.unreadCount ? "font-semibold text-primary-red" : "text-gray-600"}`}>{formatDate(chat.lastMessaage.time)}</span>
                                            </div>
                                        }
                                    </div>
                                
                                    {
                                        chat.lastMessaage && 
                                        <div className='flex gap-3 justify-between'>
                                            {/* last message */}
                                            <div>
                                                <span className={`line-clamp-1 text-gray-500`}>{chat.lastMessaage.text}</span>
                                            </div>

                                            {/* count */}
                                            {
                                                chat.unreadCount != 0 &&
                                                <div className='bg-primary-red  py-1 px-3 rounded-full text-white flex justify-center items-center'>
                                                    <span className={`text-sm inline-block `}>{chat.unreadCount}</span>
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>

                            </div>
                        </div>
                    )
                })
        }
      </div>
    </div>
  )
}

export default Chats
