import React from "react";
import {useState,useEffect} from "react";
import {useParams} from "react-router-dom"
import axios from "axios";
import Chat from "../chat/Chat";
import { UserChat } from "./userChat";
import  "./chatFeedback.css";


export function ChatFeedBack(){
    const [users,setUsers] = useState([]);
    const [selectedUserIdForChat,setSelectedUserIdForChat] = useState(-1);
    const [selectedUserNameForChat,setSelectedUserNameForChat] = useState("bot User");
    const [messages,setMessages] = useState([]);
    const {conversationId} =  useParams();
    console.log("conversationId:",conversationId);
    const apiUrl = process.env.REACT_APP_BACKEND_URL;
    const selectUserForChat = (userId,userName) =>{
        setSelectedUserIdForChat(userId);
        setSelectedUserNameForChat(userName);
        console.log(`userId:${userId} userName:${userName}`);
    }
    const getAllactiveUsers =()=>{
        
        axios.get(apiUrl+"/api/User/GetAllActiveUsers")
        .then(response=>{
            setUsers(response.data.users);
            console.log(response.data.users);
        })
        .catch(err=>{
            console.error(err)
        })
    }

    const getMessageForAConversation = ()=>{
        axios.get(apiUrl+"/api/Message/GetAllMessageForAConversation?conversationId="+conversationId)
        .then(response=>{
            const messageList = response.data.messages.map(x=>({text:x.messages,
                userId:x.toUserId}));
                setMessages(messageList);
                setSelectedUserNameForChat(response.data.user.userName);
                setSelectedUserIdForChat(response.data.user.userId);
        })
        .catch(err=>{
            console.error(err)
        })
    }
    useEffect(()=>{
        if(conversationId !=undefined && conversationId!=null){
            getMessageForAConversation();
        }
    },[])
    useEffect(() => {
        getAllactiveUsers();
        
    },[]);
    const userDetailsForChat = users.map((user)=><UserChat user={user} selectUserForChat={selectUserForChat}></UserChat>)
    return (<div className="chatFeed-outer">
        <div className="chatFeed-right-container">
            <Chat receiverUserId={selectedUserIdForChat} userName={selectedUserNameForChat} messageList={messages}/>
        </div>
    </div>)
}