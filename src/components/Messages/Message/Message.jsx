import React from 'react'
import "./Message.css"
import ReactEmoji  from "react-emoji";

const getUserIdFromLocalStorage = () => localStorage.getItem("userId");
function Message({message:{ text, userId },name}) {
    let isSentByCurrentUser = false;
    // const trimmedName = name.trim().toLowerCase();
   
    if(getUserIdFromLocalStorage() === userId){
        isSentByCurrentUser=true;
    }
    return (
        isSentByCurrentUser ? (
            <div className="messageContainer justifyEnd">
                <p className="sentText pr-10">{name}</p>
                <div className="messageBox backgroundBlue">
                    <p  className="messageText colorWhite">{text}</p>
                </div>
            </div>
        )
        :(
            <div className="messageContainer justifyStart">            
                <div className="messageBox backgroundLight">
                    <p className="messageText colorDark">{text}</p>
                </div>
                <p className="sentText pr-10">{name}</p>
            </div>
        )
    )
}

export default Message
