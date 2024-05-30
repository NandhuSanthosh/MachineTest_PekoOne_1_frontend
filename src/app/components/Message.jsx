import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";
import IndividualMessageTile from './IndividualMessageTile';
import axiosInstance from '../../config/axios';
import { useSelector } from 'react-redux';
import socket from "../../config/socket"


const Message = ({messages, pushMessage}) => {

    const {selectedChatId, isGroup} = useSelector( state => state.chat)
    const userId = useSelector( state => state.user._id)

    const [text, setText] = useState("")

    console.log(text)
    async function submit(){
        axiosInstance.post('/chat/sent', {
            chatId: selectedChatId, 
            isGroup: isGroup, 
            text
        })
        .then( res => {
            console.log(res.data)
            setText("")
            pushMessage(res.data)
            socket.emit("new-message", res.data)
        })
    }


    useEffect( () => {
        if(!socket) return;
        
        socket.emit("join-chat", selectedChatId)
        socket.on("new-message", data => {
            console.log("socket message: ", data)
            pushMessage(data)
        })

        return () =>  {
            socket.off("new-message")
        }
    }, [socket, selectedChatId])


  return (
    <div className="flex flex-col flex-1 w-full md:gap-3">

        {/* messages */}
        <div className='bg-white flex-1  md:rounded-3xl md:shadow-md px-4 md:px-10 border-solid border-b md:border-none border-gray-300'>
            <div className='flex flex-col gap-2 justify-end h-full pb-4'>
                {
                    messages.map( message => {
                        return (
                            <IndividualMessageTile key={message._id} text={message.text} date={new Date(message.time)} isSendByCurrUser={message.from == userId} />
                        )
                    })
                }
            </div>
        </div>

        {/* input field */}
        <div className='flex md:gap-3'>
            <div className='bg-white md:rounded-3xl md:shadow-md flex-1'>
                <input value={text} onChange={(e) => setText(e.target.value)}
                className='outline-none p-5 px-5 w-full bg-transparent' placeholder='Send messages...' />
            </div>
            <div className=''>
                <button onClick={submit} className='p-5 md:rounded-3xl bg-primary-red text-white md:shadow-md'>
                    <IoIosSend size={25} />
                </button>
            </div>
        </div>
    </div>
  )
}

export default Message
