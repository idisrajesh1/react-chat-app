import { colors } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

const LogoContainer = styled.span`
  font-size: 24px;
  margin-left: 20px;
  font-weight: bold;
  color: ${(props) => props.colors};
  cursor: pointer;
`

 function Logo({text,colors}){
    return(
        <LogoContainer colors={colors}>{text}</LogoContainer>
    )
}

Logo.defaultProps = {
  colors:'white'
}

export { Logo};