"use client";
import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, Form } from 'antd';
import Select from 'react-select'
import axiosInstance from '../../config/axios';
import { useSelector } from 'react-redux';


const NewGroupModal = ({open, setOpen, setAllRelatedChats}) => {

    const userId = useSelector( state => state.user._id)

    const [name, setName] = useState("");
    const [isPrivate, setIsPrivate] = useState(false)
    const [participants, setParticipants] = useState([])

    const [options, setOptions] = useState([])
    console.log(options)

    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        console.log(name, isPrivate, participants)
        axiosInstance.post("/chat/create_group", {
            name, 
            isPrivate, 
            participants
        })
        .then( res => {
            console.log(res);
            setAllRelatedChats(state => {
                return [res.data, ...state]
            })
        })
        .catch( err => {
            console.log(err.message)
        })
        .finally( () => {
            setOpen(false);
        })
    };


    const handleCancel = () => {
        setOpen(false);
    };


    // fetching all users
    useEffect( () => {
        axiosInstance.get('/fetch_all_users')
        .then( (res) => {
            const userList = res.data.filter( x => x._id != userId)
            setOptions(userList.map( user => {
                return {
                    value: user._id, 
                    label: user.email
                }
            }))
        })
    }, [])


    // participants array updating
    function handleChange(e) {
        const idArray = e.map( v => v.value)
        setParticipants( idArray )
    }


  return (
    <>
      <Modal title="New Group" open={open} onOk={handleOk} onCancel={handleCancel}>
        <form className='mt-5'>
            <Form.Item label="Name">
                <Input placeholder="Example" value={name} onChange={(e) => setName(e.target.value)}/>
            </Form.Item>
            <Form.Item label="Access">
                <div className='w-full  flex'>
                    <button type='button' className={`flex-1 flex justify-center items-center py-2 bg-gray-200 rounded-l-3xl border border-solid  ${!isPrivate ? "border-blue-300 bg-blue-100" : "border-gray-300"}`} 
                    onClick={() => setIsPrivate(false)}>
                        Public
                    </button>
                    <button type='button' className={`flex-1 flex justify-center items-center py-2 bg-gray-200 rounded-r-3xl border border-solid  ${isPrivate ? "border-blue-300 bg-blue-100" : "border-gray-300"}`}
                    onClick={() => setIsPrivate(true)}>
                        Private
                    </button>
                </div>
            </Form.Item>
            <Form.Item label="Name">
                <Select options={options} isMulti onChange={handleChange}/>
            </Form.Item>
        </form>
      </Modal>
    </>
  );
};
export default NewGroupModal;