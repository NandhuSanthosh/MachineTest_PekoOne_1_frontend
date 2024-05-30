import React, { useEffect } from 'react'
import socket from '../../config/socket';

import { useSelector } from 'react-redux'

const Socket = ({children}) => {

    const userId = useSelector( state => state.user._id)

    useEffect( () => {
        socket.connect();
        return () => {
            socket.disconnect()
        };
    }, [userId])

    return children
}

export default Socket