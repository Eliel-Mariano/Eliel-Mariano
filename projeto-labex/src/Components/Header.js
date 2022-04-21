import React from 'react';
import { ContainerHeader } from './Styled';


function Header() {

  return (
    <ContainerHeader>
        <h1>
          <font color = "red">La</font>
          <font color = "orange">be</font>
          <font color = "green">X</font>     
        </h1>
        <span class="material-icons">sailing</span>
    </ContainerHeader>
    
  );
}

export default Header;