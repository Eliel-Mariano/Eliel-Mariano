import React from 'react';
import Header from './Header';
import CardMatchs from "./CardMatchs"
import Footer from './Footer';
import { ContainerMatchList, TituloMatchList } from './Style';


function MatchList(props) {  
  
  return (
    <ContainerMatchList>
      <Header goToHome={props.goToHome}/>

      <TituloMatchList>Seus Matchs</TituloMatchList>

      <CardMatchs />

      <Footer/>
    </ContainerMatchList>    
  );
}
export default MatchList;