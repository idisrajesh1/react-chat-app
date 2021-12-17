import React, { useState,useEffect } from 'react'
import {useHistory} from "react-router-dom";
import axios from "axios";
import "./hrChatFeed.css";
import {startSignalrConnectionForMessageList,sendMessageToChatHub} from "../chat/signalR"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PropTypes from 'prop-types';
import TablePagination from '@material-ui/core/TablePagination';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
        innerWidth:'100%',
        padding:"0.2em"
      },
      
    },
    fontBold:{
      fontWeight:"bold"
    }
  });
  

  
  function Row(props) {
    const {row} = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const history = useHistory();
    const clickHandlerForMessage =(conversionId)=>{
      history.push("/chat/"+conversionId);
    }
    return (
        <React.Fragment>
            <TableRow key={row[0].conversationId} className={classes.root + " border-bottom"} onClick={()=>clickHandlerForMessage(row[0].conversationId)}>
                <TableCell colSpan={3}>
                    <Table>
                        <TableBody>
                            {row.map(row => (
                                <TableRow key={row.messageId} className={(row.isRead == true? " ":"fontBold ") + classes.root}>
                                    <TableCell style={{width:"30%",paddingLeft:"0.8em"}} >{row.messages}</TableCell>
                                    <TableCell style={{width:"20%"}} >{row.toUserId}</TableCell>
                                    <TableCell style={{width:"20%"}} align="center" >{row.fromUserId}</TableCell>
                                    <TableCell style={{width:"20%"}} align="right">{row.conversationId}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableCell>


            </TableRow>
        </React.Fragment>
    );
  }
  

  

function HrChatFeed() {
    const [messageList,setMessageLit] = useState([]);
    
    const  getAllMessageOfUser = async ()=>{
        const apiUrl = process.env.REACT_APP_BACKEND_URL
        const response = await axios.get(apiUrl+"/api/Message/GetAllMessageOfAuser?userId=90");
        setMessageLit(response.data.messages)
    }
    
    useEffect(() => {

       getAllMessageOfUser();
       startSignalrConnectionForMessageList(function(messageList){
       
        setMessageLit(messageList);
    })
    }, [])

    
    // const msgUI = messageList.map(message=>(<div className="messageListContainer" onClick={()=>clickHandlerForMessage(message.conversationId,message.fromUserId)}>
    //         <div className="message-header">Recived a message from user {message.fromUserId}</div>
    //         <div >{message.messages}</div>
    //     </div>))
    // return (
    //     <div className="message-outerContainer">
    //         {msgUI}
    //     </div>
    // )
    return (
        <TableContainer component={Paper}>
          <Table >
            <TableHead>
              <TableRow>
                <TableCell >Message</TableCell>
                <TableCell >ToUserId</TableCell>
                <TableCell >FromUserId</TableCell>
                <TableCell >ConversationId</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messageList.map((row) => (
                <Row key={row.conversationId} row={row.messageModel} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
}

export default HrChatFeed
