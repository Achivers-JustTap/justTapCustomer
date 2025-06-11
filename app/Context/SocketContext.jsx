import React,{ createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const socket = io('http://192.168.29.13:5000');

const SocketProvider = ({ children }) => {
    useEffect(() => {
        socket.on('connect', () => {
            console.log('charithas Socket connected');
        });

        socket.on('disconnect', () => {
            console.log('charithas Socket disconnected');
        });

    
    }, []);

    const sendMessage=(eventName, message) =>{
        socket.emit(eventName,message);
    };

    const receiveMessage=(eventName, callback) =>{
        socket.on(eventName, callback);
    };

    return(
        <SocketContext.Provider value={{socket,sendMessage,receiveMessage}}>
            {children}
        </SocketContext.Provider>
    )
};

export default SocketProvider;