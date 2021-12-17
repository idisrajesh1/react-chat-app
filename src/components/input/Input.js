import React from "react";
import "./Input.css"
import styled from "styled-components";
import { useRef,useEffect } from "react";


const Input = ({message,setMessage,sendMessage})=>{
 const inputElem = useRef();

 const printMessage =()=>{
     
 }
 
 useEffect(() => {
     console.log(message);
    inputElem.current.focus();
 },[])
 
    return(
    <div className="form">
        <input ref={inputElem} type={message}  className="input" ref={inputElem}  value={message}              
        onChange = {(event)=>{setMessage( event.target.value)}}/>
        
        

        <button className="sendButton" onClick={(event)=> sendMessage(event)}>Send</button>
    </div>)
}

export default Input;