import React, { useState } from "react";

const MyTabsComponent = () => {
    const [isDisplayContainer1,setisDisplayContainer1]=useState(true);
    const [isDisplayContainer2,setisDisplayContainer2]=useState(false);
    const [isDisplayContainer3,setisDisplayContainer3]=useState(false);
    const renderContainer = () => {
        if (isDisplayContainer1) {
          return <div title={"Section title 1"} className="view">
          Content of section 1
        </div>
        } else if(isDisplayContainer2) {
          return<div title={"Section title 3"} className="view">
          Content of section 2
        </div>
        }
        else if(isDisplayContainer3) {
            return<div title={"Section title 3"} className="view">
            Content of section 3
          </div>
          }
      }

      const clickHandler = (btn)=>{
        if(btn === "btn1"){
            setisDisplayContainer1(true);
            setisDisplayContainer2(false);
            setisDisplayContainer3(false);
        }
        else if(btn === "btn2"){
            setisDisplayContainer1(false);
            setisDisplayContainer2(true);
            setisDisplayContainer3(false);
        }
        else if(btn === "btn3"){
            setisDisplayContainer1(false);
            setisDisplayContainer2(false);
            setisDisplayContainer3(true);
        }
      }

    return (<div className="tabs">
        <button className={isDisplayContainer1?"btn-active":"btn"} disabled={isDisplayContainer1} onClick={()=>clickHandler("btn1")}>Section title 1</button>
        <button className={isDisplayContainer2?"btn-active":"btn"} disabled={isDisplayContainer2}  onClick={()=>clickHandler("btn2")}>Section title 2</button>
        <button className={isDisplayContainer3?"btn-active":"btn"} disabled={isDisplayContainer3}  onClick={()=>clickHandler("btn3")}>section title 3</button>
        {renderContainer()}
        <img image></img>
    </div>)
    
};

export default MyTabsComponent;