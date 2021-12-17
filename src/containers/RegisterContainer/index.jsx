import React from "react";
import styled from "styled-components";
import { Logo } from "../../components/logo";
import { useRef } from "react";

const RegisterContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #f0f2f5;
    display: flex;
    align-items: center;
    justify-content: center;
`
const RegisterWrapper = styled.div`
    width: 70%;
    height: 70%;
    display: flex;
`
const RegisterWrapperBox = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const LoginDesc = styled.span`
    font-size: 24px;
`
const LoginBox = styled.form`
    height: 400px;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const LoginInput = styled.input`
    height: 50px;
    border-radius: 10px;
    border: 1px solid gray;
    font-size: 18px;
    padding-left: 20px;
    &:focus{
        outline: none;
    }
`

export function Register(){
    const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
    return (<RegisterContainer>
        <RegisterWrapper>
            <RegisterWrapperBox>
                <Logo colors='#1877f2' text="Lamasocial"></Logo>
                <LoginDesc> Connect with friends and the world around you on Lamasocial.</LoginDesc>
            </RegisterWrapperBox>
            <RegisterWrapperBox>
                <LoginBox>
                    <LoginInput placeholder="user name"  ref={username}/>
                </LoginBox>
            </RegisterWrapperBox>
        </RegisterWrapper>
    </RegisterContainer>)
}