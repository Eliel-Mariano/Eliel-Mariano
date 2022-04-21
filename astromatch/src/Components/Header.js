import React from 'react';
import { HeaderHome } from './Style';
import home from "../images/home.png";
import batepapo from "../images/batepapo.png"


function Header(props) {

  if(props.condicionalCabecalho==="Home"){
    return(
      <div>
        <HeaderHome>
          <h2>
            <span class="material-icons">volunteer_activism</span>
            AstroMatch 
            <span class="material-icons">favorite</span>
          </h2>
          <img onClick={props.goToMatchList} src={batepapo} alt="vai para lista de matches" />               
        </HeaderHome>        
      </div>      
    );
  }else{
    return(
      <div>
        <HeaderHome>
          <img onClick={props.goToHome} src= {home} alt="volta para página principal" />          
          <h2>AstroMatch</h2>                          
        </HeaderHome>        
      </div>      
    );
  } 
}
export default Header;