import { io } from 'socket.io-client';

const socket = io('http://192.168.0.115:5000'); // Replace with your backend URL

socket.on('connect', () => {
    console.log(`Connected to server with socket ID: ${socket.id}`);
});

export default socket;
