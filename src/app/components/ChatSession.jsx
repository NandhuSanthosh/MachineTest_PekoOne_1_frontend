"use client"
import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { MdOutlineMoreHoriz } from "react-icons/md";
import { Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';



import Chats from './Chats';
import axiosInstance from '../../config/axios';
import { setSearch } from '../../redux/optionSlice';
import ChatLoading from "../components/ChatLoading"
import NewGroupModal from "../components/NewGroupModal"
import socket from "../../config/socket"



const ChatSession = () => {
    const dispatch = useDispatch();
    const { option } = useSelector( (state) => state.option)
    const {selectedChatId } = useSelector( state => state.chat)
    const userId = useSelector( state => state.user._id)


    const [loading, setLoading] = useState(true)
    const [allRelatedChats, setAllRelatedChats] = useState([])
    const [chats, setChats] = useState([])

    const [searchText, setSearchText] = useState("")

    const [open, setOpen] = useState(false)
    console.log("Rerendered", )
    
    // dropdown menu options
    const items = [
        {
          key: '1',
          label: (
            <button onClick={() => setOpen(true)}>
              New Group
            </button>
          ),
    }]

    // fetch chats based on the search query
    async function handleSearch(e) {
        if(e.key != "Enter") return 

        axiosInstance.get(`/get_user?search=${searchText}`)
        .then( res => {
            dispatch(setSearch())
            setChats(res.data.content)
        })
        .catch( (err) => {
            console.log(err.message)
        })

    }

    // fetching all chats related to the user
    async function fetchChats(){

        const params = new URLSearchParams();

        const url = "/get_user_chat?" + params.toString();
        axiosInstance.get(url)
        .then( res => {
            console.log("data: ", res.data.chats)
            setAllRelatedChats(res.data.chats)
        })
        .catch( err => {
            console.log(err.message)
        })
        .finally( () => {
            setLoading(false)
        })
    }




    // fetch chats
    useEffect( () => {
        fetchChats();

        return () => {
            setLoading(true)
        }
    }, [])

    // updated chats according to the option (all, one-on-one, group and serach)
    useEffect( () => {
        console.log("executted", allRelatedChats)
        if(loading) return;
        // if(option == "SEARCH") {
        //     setChats([])
        // };
        if(option == "ALL") {
            setChats([{
                tag: "All",
                list: allRelatedChats
            }])
        }
        else if(option == "GROUP") {
            setChats([{
                tag: "Group",
                list: allRelatedChats.filter( chat => chat.isGroup)
            }])
        }
        else if(option == "INDIVIDUAL") {
            setChats([{
                tag: "User",
                list: allRelatedChats.filter( chat => !chat.isGroup)
            }])
        }


    }, [allRelatedChats, option])


    useEffect( () => {
        if(!socket) return;

        socket.emit("authenticate", userId)
        socket.on("new-message", data => {
            
            setAllRelatedChats( allRelatedChats => {
                let updatedAllChat = [];
                updatedAllChat = allRelatedChats.map(x => {
                    if(x._id == data.to) {
                        return {
                            ...x, 
                            lastMessaage: data, 
                            unreadCount: x.unreadCount + 1
                        }
                    }   
                    return x;   
                } )
                return updatedAllChat
            })
        })

        return () =>  {
            socket.off("new-message")
        }
    }, [socket, selectedChatId])



  return (
    <div className={`flex-col gap-3 flex h-full flex-1 2xl:flex-none 2xl:w-3/12  ${selectedChatId && "hidden"} xl:flex`}>

        {/* header */}
        <div className="bg-white h-14 md:h-20 md:rounded-3xl">
            <div className='h-full flex items-center justify-between px-2 md:px-10'>

                <div className='text-xl font-semibold hidden md:block'>Chat</div>

                <div className='flex-1 flex justify-end'>
                    <div className='w-full md:w-8/12'>
                        <input
                        state={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={handleSearch}
                        className='rounded-full border border-solid border-gray-600 py-2 px-4 outline-none text-gray-600 w-full '
                        placeholder='Search...'
                        />
                    </div>
                    <div>
                        <button className='h-10 w-10 bg-primary-red text-white flex justify-center items-center rounded-full ml-2'>
                            <AiOutlinePlus size={25} />
                        </button>
                    </div>
                </div>
                
            </div>
        </div>


        <div className="bg-white flex-1 w-full rounded-3xl overflow-y-scroll relative">
            {/* chats */}
            <div className='py-10 h-full'>
                {
                    loading ? 
                        <ChatLoading />
                    : 
                        chats.map( chat => {
                            return <Chats key={chat.tag} data={chat.list} heading={chat.tag} />
                        })

                }
                
                {/* <Chats data={chats} heading={"Pinned"}/> */}
            </div>

            {/* Dropdown menu */}
            <div className='absolute top-0 w-full flex justify-end items-center py-5 px-5'>
                <Dropdown menu={{ items }}>
                    <Space>
                        <MdOutlineMoreHoriz size={27} />
                    </Space>
                </Dropdown>
            </div>

        </div>

        {
            open && 
            <NewGroupModal open={open} setOpen={setOpen} setAllRelatedChats={setAllRelatedChats}/>
        }
    </div>
  )
}

export default ChatSession
