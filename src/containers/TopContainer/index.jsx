import React  from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Chat, Notifications, Person, Search } from "@material-ui/icons";
import { Logo } from "../../components/logo";
import "./index.css";


const TopbarContainer = styled.div`
    height: 50px;
    width: 100%;
    background-color: #1877f2;
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 999;
`
const TopbarLeft  = styled.div`
    flex: 2;
`

const TopBarCenter = styled.div`
    flex: 4;
`
const SearchBracContainer = styled.div`
  width: 100%;
  height: 30px;
  background-color: white;
  border-radius: 30px;
  display: flex;
  align-items: center;
`
const SearchBarInput = styled.input`
  border: none;
  width: 70%;
`
const TopBarRight = styled.div`
  flex: 4;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: white;
`
const TopbarLinks = styled.div`
  margin-right: 10px;
  font-size: 14px;
  cursor: pointer;
`
const TopBarSpan = styled.span`
    margin-right: 10px;
  font-size: 14px;
  cursor: pointer;
`
const TopbarIcons  = styled.div`
    display: flex;
`
const TopbarIconItem  = styled.div`
  margin-right: 15px;
  cursor: pointer;
  position: relative;
`
const TopbarIconBadge = styled.div`
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 50%;
  color: white;
  position: absolute;
  top: -5px;
  right: -5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`
const TopbarImg = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
`
    
  
const test = "lamoSocial"
export function TopContainer (){
    return (
    <TopbarContainer>
        <TopbarLeft>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Logo text={test}/>
            </Link>
        </TopbarLeft>
        <TopBarCenter>
            <SearchBracContainer>
            <Search className="searchIcon"></Search>
            <SearchBarInput placeholder="Search for friend"/>
            </SearchBracContainer>          
        </TopBarCenter>
        <TopBarRight>
            <TopbarLinks>
                <TopBarSpan>HomePage</TopBarSpan>
            </TopbarLinks>
            <TopbarIcons>
                <TopbarIconItem>
                    <Person/>
                    <TopbarIconBadge>1</TopbarIconBadge>
                </TopbarIconItem>
                <TopbarIconItem>
                   <Chat/>
                    <TopbarIconBadge>2</TopbarIconBadge>
                </TopbarIconItem>
                <TopbarIconItem>
                    <Notifications/>
                    <TopbarIconBadge>3</TopbarIconBadge>
                </TopbarIconItem>
            </TopbarIcons>
        </TopBarRight>
    </TopbarContainer>)
}