import React from "react";
import {Avatar} from "@material-ui/core";
import closeIcon from  "../../icon/closeIcon.png"
import onlineIcon from  "../../icon/onlineIcon.png"
import "./InfoBar.css"

function InfoBar({room}){
return(
    <div className="infoBar">
        <div className="leftInnerContainer">
        <Avatar  alt={room}
            src="/static/images/avatar/1.jpg" 
             style={{height:"40px",width:"40px",borderRadius:"30px",marginBottom:"0.2em",marginRight:"0.2em"}}/>
            <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer" >
            <a href='/'> <img src={closeIcon} alt="close image"/></a>
        </div>
    </div>)
}

export default InfoBar;