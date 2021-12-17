import React from "react";
import  "./chatFeedback.css";
import {Badge,Avatar} from "@material-ui/core";
export const UserChat = ({user,selectUserForChat})=>{
    return <div className="userChat-outer" 
    onClick={()=>selectUserForChat(user.userId,user.firstName+" "+ user.lastName)}>
        <div className="user-container">
            <Avatar  alt={user.firstName}
            src="/static/images/avatar/1.jpg" 
             style={{height:"40px",width:"40px",borderRadius:"30px",marginBottom:"0.2em",marginRight:"0.2em"}}/>
            <div className="user-text-container">
                <div className="user-Name">
                    {user.firstName} {user.lastName}
                </div>
                <div className="last-message">

                </div>
            </div>
        </div>
    </div>
}