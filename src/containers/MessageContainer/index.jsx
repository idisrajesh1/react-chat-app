import styled  from "styled-components";
import React  from "react";
import { useState,useEffect,useCallback,useRef } from "react";
import Input from "../../components/input/Input";
import axios from "axios";
import { Suggestions } from "../../components/suggestions";
import { ContactSupportOutlined } from "@material-ui/icons";
import  "../../components/input/Input.css"

const MessageContainer = styled.div`
    height: calc(100vh - 70px);
    display: flex;
`

const ChatMenu = styled.div`
     flex: 2;
     border-right: 1px solid black ;
`
const ChatMenuWrapper = styled.div`
  padding: 10px;
  height: 100%;
`
const ChatMenuInput = styled.input`
    width: 90%;
    padding: 10px 0;
    border: none;
    border-bottom: 1px solid gray;
`

const ChatBox  = styled.div`
    flex: 4;
    margin-right:1px solid black;
  `
const ChatBoxWrapper = styled.div`
   display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  padding-left:15px;
`

const ChatBoxTop =  styled.div`
  height: 500px;
  overflow-y: scroll;
  padding-right: 10px;
`

const ChatBoxBottom = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 2px solid #D3D3D3;
`

const ChatOnline = styled.div`
    flex:2;
`

const SuggestionMark = styled.span`
    font-weight: bold;
    background-color: #d5e1ea;
    padding:0.4em;
    &:focus{
        outline: none;
    }
`
const NoteMark = styled.span`
    padding-top: 8px;
     &:focus{
        outline: none;
    }
`;
const EmptySpan = styled.span`
    width: 10px;
`
const MessageDiv = styled.div`
    display: flex;
    width:100%;
    padding-top: 5px;
    padding-bottom: 5px;
`

const SuggestionContainer = styled.div`
    display: flex;
    padding-top:3%;
    height: 50%;
    &:focus{
        outline: none;
    }
`
  
export function MessageBox(){
    const allUserData = {id:'all',first_name:'ALL',last_name:'',email:'',avatar:''};
    const [message,setMessage] = useState('');
    const [isDisplaySuggestion,setIsDisplaySuggestion ] = useState(false);
    const [allActiveUsers,setAllActiveUsers] = useState([]);
    const [suggestionUser,setSuggestionUser] = useState([]);
    const [isDisplaySugestionMark,setIsDisplaySugestionMark] = useState(false);
    const [sugestedUserId,setSugestedUserId] = useState([]);
    const [userForSuggestion,setUserForSuggestion] = useState([]);
    const [noteUIList,setNoteUIList] = useState([]);
    const [currentEditableMessage,setCurrentEditableMessage] = useState('');
    const [currentSequenceOfSugeestionSpan,setCurrentSequenceOfSugeestionSpan]=useState(-1);
    const [currentUserIdForSelectedPerson,setCurrentUserIdForSelectedPerson]= useState(-1);
    const [cursor,setCursor] = useState(0);  
    const [totalMessage,setTotalMessage] = useState([]);
    const inputElem = useRef();
    const suggestionRef = useRef();
    const fetchUser=async ()=>{
        const response = await axios.get("https://reqres.in/api/users")
        .catch(err=>{console.log(err)});
        setAllActiveUsers(response.data.data);
        const userForFiltering = [...response.data.data];
        userForFiltering.splice(0,0,allUserData);
        setUserForSuggestion(userForFiltering);
        
    }
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

    const isValidChar= (char)=>{
        const cc = char.charCodeAt()
        if ((cc > 47 && cc < 58) || (cc > 64 && cc < 91) || (cc > 96 && cc < 123)) {
            return true;
        } else {
           
            return false;
        }
    }

    const getFilterDateForSuggestion = (note='')=>{
        let filterUser =[];
        if(note.trimStart().startsWith('@') && note.indexOf(' ') > 2){
            const f_name = note.toLowerCase().substring(1,note.indexOf(' '));
            const l_name = note.toLowerCase().substr(note.indexOf(' ')+1,note.length);
            filterUser =  userForSuggestion.filter(user=> user.first_name.toLowerCase()
            .startsWith(f_name) &&  user.last_name.toLowerCase()
            .startsWith(l_name)) 
            setIsDisplaySuggestion(true);   
        }
        else if(note.trimStart().startsWith('@')){
            filterUser =  userForSuggestion.filter(user=> user.first_name.toLowerCase()
            .startsWith(note.toLowerCase().trim().substr(1,note.length))) 
            setIsDisplaySuggestion(true);   
        }
        setSuggestionUser(filterUser);
    }

    const changeCursorOnMouseHover = ( id )=>{
        setCursor(id);
    }
    const  sendMessage = (event,keyCode) =>{
       if(isDisplaySuggestion && keyCode === "ArrowUp" && cursor > 0){
        setCursor( prevState => {
            return prevState - 1
          });
       }
       else if(isDisplaySuggestion && keyCode === "ArrowDown" && cursor < suggestionUser.length-1){
        setCursor( prevState => {
            return prevState + 1 
            })
       }

       if( isDisplaySuggestion && keyCode === "Enter"){
           event.preventDefault(); 
           const userId = suggestionUser.filter((x,index)=>index === cursor)[0].id;
           setUserSuggestionInNote(userId);
           return false;
       }

        if(keyCode === 'Backspace' ){
            if (message === '') {
                if (noteUIList.length >= 1) {
                    const copyNoteUIList = [...noteUIList];
                    const updateNoteUIList = copyNoteUIList.pop();
                    if (noteUIList[noteUIList.length - 1].key.indexOf('@') === -1) {
                        let userIdList = [...sugestedUserId]
                        const key = updateNoteUIList.props.key;
                        userIdList.splice(userIdList.indexOf(key), 1);
                        setSugestedUserId(userIdList);
                        setMessage('@' + updateNoteUIList.key.substring(0, updateNoteUIList.key.length - 1));

                    }
                    else if (noteUIList[noteUIList.length - 1].props.text != undefined &&
                        noteUIList[noteUIList.length - 1].props.text != undefined) {
                        setMessage(updateNoteUIList.key.substring(0, updateNoteUIList.key.length - 1));
                        
                    }
                    setNoteUIList(copyNoteUIList);
                }
            }
            else{
                setMessage(message.substring(0,message.length-1));
                return;
            }

            
        }
        if(keyCode === "@"){
            if(message.trimStart().length > 1 && !isValidChar(message[message.length-2]) ){
                const noteMark =[...noteUIList];
                noteMark.push(<NoteMark contentEditable="true" data-sequence={noteMark.length} onKeyDown={()=>{}} 
                text={message} key={message}>{message.substring(0,message.length-1)}</NoteMark>);
                setNoteUIList(noteMark);
                
                setMessage('@');
            }
            
        }

       
         
       

        
    }

    

  
    const setUserSuggestionInNote =(userId) =>{
        
        
        const f_name = userForSuggestion.filter(x=> {
            if(x.id=== userId) return x
        })[0].first_name;
        
        if(!sugestedUserId.includes(userId)){
            const updateUserId = [...sugestedUserId];
            updateUserId.push(userId);
            setSugestedUserId(updateUserId);
            const noteMark =[...noteUIList];
            if(currentSequenceOfSugeestionSpan!==-1){
                noteMark.splice(currentSequenceOfSugeestionSpan,1, <SuggestionMark 
                    data-sequence={currentSequenceOfSugeestionSpan} contenteditable="true"
                     onKeyUp={(event)=>resetTextOfNote(event)} id={userId} 
                    key={f_name + getRandomInt(10)}>
                        @{f_name}
                    </SuggestionMark>);
                setCurrentSequenceOfSugeestionSpan(-1);
            }
            else{
                setMessage('');
                noteMark.push(<SuggestionMark  data-sequence={noteMark.length} contentEditable="true"
                    onKeyUp={(event)=>resetTextOfNote(event)} id={userId} key={f_name}>@{f_name}</SuggestionMark>);
                noteMark.push(<pre key={f_name+'@'}> </pre>);
                const totalMsg = [...totalMessage];
                setTotalMessage(totalMessage.push('@'+{f_name}))
            }
            
            setNoteUIList(noteMark);          
        }
        
        setMessage(' ');
        setIsDisplaySuggestion(false);
    }

    const resetTextOfNote=(event)=>{
        console.log("in event");
        if(event.code ==="ArrowUp"||event.code ==="ArrowDown" || event.code ==="ArrowLeft" || 
         event.code==="ArrowRight"){
             return;
         }
        const currentMessage = event.currentTarget.innerHTML;
        setCurrentEditableMessage(currentMessage);
        if(currentSequenceOfSugeestionSpan !== parseInt(event.currentTarget.getAttribute('data-sequence'))){
            setCurrentSequenceOfSugeestionSpan(parseInt(event.currentTarget.getAttribute('data-sequence')))
        }
      
        if(event.currentTarget.id != undefined && event.currentTarget.id !==null && 
            event.currentTarget.id != currentUserIdForSelectedPerson){
            setCurrentUserIdForSelectedPerson(parseInt(event.currentTarget.id));         
        }
    }
    


     useEffect(() => {
        fetchUser();
        
    }, [])

 

    useEffect(()=>{
        
        getFilterDateForSuggestion(message);
    },[message])

    useEffect(()=>{
        getFilterDateForSuggestion(currentEditableMessage);
        if(currentEditableMessage ==='' && currentSequenceOfSugeestionSpan!=-1){
            const noteMark =[...noteUIList];
            noteMark.splice(currentSequenceOfSugeestionSpan,1);
            setNoteUIList(noteMark);
        }
    },[currentEditableMessage])

    useEffect(()=>{
        if(sugestedUserId.indexOf(currentUserIdForSelectedPerson)!==-1){
           const temp = [...sugestedUserId];
           temp.splice(sugestedUserId.indexOf(currentUserIdForSelectedPerson),1);
           setSugestedUserId(temp);
        }

        if(currentSequenceOfSugeestionSpan !==-1){
            const noteMark =[...noteUIList];
            noteMark.splice(currentSequenceOfSugeestionSpan,1, <NoteMark  contentEditable="true"
                data-sequence={currentSequenceOfSugeestionSpan} 
                onKeyUp={(event)=>{resetTextOfNote(event)}} 
            text={currentEditableMessage} key={currentEditableMessage}>{currentEditableMessage}</NoteMark>);
            setNoteUIList(noteMark);
        }
    },[currentUserIdForSelectedPerson,currentSequenceOfSugeestionSpan])


    
    const noteList = noteUIList;
    return(
    <MessageContainer>
        <ChatMenu>
            <ChatMenuWrapper>
                <ChatMenuInput placeholder="Search for friend"/>
            </ChatMenuWrapper>
        </ChatMenu>
        <ChatBox>
            <ChatBoxWrapper>
                <ChatBoxTop>
                    <div>No meesage to Display</div>
                    </ChatBoxTop>
                    <ChatBoxBottom>
                        {isDisplaySuggestion && suggestionUser.length ?
                            <Suggestions  changeCursorOnMouseHover={changeCursorOnMouseHover}
                                cursor={cursor} setUserSuggestionInNote={setUserSuggestionInNote} users={suggestionUser} /> : null}
                        <MessageDiv>
                            <SuggestionContainer  >
                                {noteUIList}
                            </SuggestionContainer>
                            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                        </MessageDiv>
                        
                        
                    </ChatBoxBottom>
                </ChatBoxWrapper>
            </ChatBox>
            <ChatOnline></ChatOnline>
    </MessageContainer>
    )
}