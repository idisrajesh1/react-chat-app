import React, { useEffect,useState } from "react";
import queryString from 'query-string';
import "./Chat.css"
import { io } from "socket.io-client";
import InfoBar from "../infoBar/infoBar";
import Input from "../input/Input.js";
import Message from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";
import {startSignalrConnection,sendMessageToChatHub} from "./signalR"

let socket ;
const getUserIdFromLocalStorage = () => localStorage.getItem("userId");
const Chat =({receiverUserId,userName,messageList})=>{
    const ENDPOINT = "localhost:5000";
    const [name,setName] = useState('');
    const [room , setRoom] = useState('');
    const [message ,setMessage] = useState('');
    const [messages ,setMessages] = useState(messageList);
    const [users, setUsers] = useState([]);
    const [conversationId,setConversationId] = useState(-1);
    const [receiverId,setReceiverId] = useState(90);


    useEffect(()=>{
        setMessages(messageList);
        if(receiverUserId !==-1){setReceiverId(receiverUserId)}
    },[receiverUserId,userName,messageList])
    useEffect(()=>{
        // console.log("count");
        // socket.on('message',(msg)=>{
        //     setMessages(messages => [ ...messages, msg ]);
        // })

        // socket.on('roomData',(x)=>{
        //     setUsers(x.users);
        //     console.log(users);
        // })
        startSignalrConnection(function(messageModel){
            const messageData = {
                text:messageModel.messages,
                userId:messageModel.fromUserId
            }
            
            if(messageData.text !== "")
                 {setMessages(prevMsg=>[...prevMsg,messageData]);
                    setReceiverId(messageModel.fromUserId);}
            setConversationId(messageModel.conversationId);
            
        })
    },[])

    const sendMessage =  ()=>{
       
        if(message){
            const conversationModel ={
                UserIp:"116.12.250.1",
                UserId:parseInt(getUserIdFromLocalStorage()),
                Message:message,
                ConversationId:conversationId,
                ReciverUserId:receiverId
            };
            setMessage("");
            const messageData = {
                text:message,
                userId:getUserIdFromLocalStorage()
            }
            setMessages(prevMsg=>[...prevMsg,messageData]);
            sendMessageToChatHub(conversationModel,function(conversationId,userId,message){
                setConversationId(conversationId);
                setReceiverId(userId);
                const messageData = {
                    text:message,
                    userId:userId
                }
                setMessages(prevMsg=>[...prevMsg,messageData]);
            });
            
        }
    }

    console.log("user:",users);
    return(
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={userName} />
                <Message messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} 
                sendMessage={sendMessage} />
              
            </div>
            <TextContainer users={users}/>
        </div>
    )
}

export default Chat;
