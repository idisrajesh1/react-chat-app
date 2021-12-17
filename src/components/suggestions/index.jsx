import styled from "styled-components";
import React ,{useState,useEffect} from "react";
import {Group } from "@material-ui/icons";
import "./index.css"

const SuggestionContainer = styled.div`
    position:absolute;
    bottom: 105px;
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    z-index:1;
    background-color: white;
    padding: 10px;
    box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);

`
const UserDetails = styled.div`
    height: 40px;
    padding: 5px;
    display: flex;
    cursor: pointer;
    img{
       height :25px;
       width: 25px;
       border-radius:10px ;
    }
    span{
        margin-left:5px;
    }
`


export function Suggestions({setUserSuggestionInNote,users,cursor,changeCursorOnMouseHover}){
    const [currentTarget,setCurrentTarget] = useState(cursor);
    const userDetails = users.map((user,i)=>{ return user.id !=='all' ?<UserDetails data-index={i}
    onMouseEnter={(e)=>handleKeyDown(e)}
     onClick={()=> setUserSuggestionInNote(user.id)} key={user.id}
     className={cursor === i ? 'active' : null}>
      
        <img src={user.avatar}/>
        <span>{user.first_name} {user.last_name}</span>    
    </UserDetails > : <UserDetails  onMouseEnter={(e)=>handleKeyDown(e)} data-index={i}
     onClick={()=> setUserSuggestionInNote(user.id)} key={user.id}
     className={cursor === i ? 'active' : null}>
       
        <Group/>
       <span>{user.first_name} {user.last_name}</span>   
   </UserDetails>})

  
const handleKeyDown = (e) => {
    // arrow up/down button should select next/previous list element
    console.log("on mouseEnter");
    changeCursorOnMouseHover(parseInt(e.currentTarget.dataset.index));
    // if (e.keyCode === 38 && cursor > 0) {
    //  setCursor( prevState => {
    //     return prevState+1
    //   });
    // } else if (e.keyCode === 40 && cursor < users.length - 1) {
    //   this.setCursor( prevState => {
    //   return prevState + 1 
    //   })
    // }
  }
  useEffect(() => {
   console.log("currentTarget:",cursor);  
  })
    return (
        <SuggestionContainer >
            <Container >
                {userDetails}
            </Container>
        </SuggestionContainer>
    )
}