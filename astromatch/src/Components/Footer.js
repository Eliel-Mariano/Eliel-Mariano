import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import naocurtiu from "../images/naocurtiu.png"
import curtiu from "../images/curtiu.png"
import deletar from "../images/deletar.png"
import { FooterHome, BotoesFooter } from './Style';


function Footer(props) {

  const [profileLiked, setProfileLiked] = useState()

  if(props.condicionalCabecalho==="Home"){    

    const choosePerson = () => {
      const body = {id: props.profile.id, choice:true}
      const headers = { headers: {'Content-Type': 'application/json'}}

      axios.post("https://us-central1-missao-newton.cloudfunctions.net/astroMatch/eliel/choose-person",
        body, headers)
        .then((response) => {
          //console.log(response.data.isMatch)
          setProfileLiked(response.data.isMatch)
        })
        .catch((error) => {
          console.log("Erro do choosePerson")
        })

      props.getProfileToChoose()
    }
    
    if (profileLiked){
      console.log(profileLiked)
      console.log("deu match")  
    }

    return (
      <div>      
        <FooterHome>
          <BotoesFooter>
            <img onClick={props.getProfileToChoose} src= {naocurtiu} alt="não curtiu" />
            <span class="material-icons">social_distance</span>
            <img onClick={()=>choosePerson()} src= {curtiu} alt="curtiu" />
          </BotoesFooter>
          
        </FooterHome>
      </div>    
    );

  }else{

    const clear = () => {
      const headers = {headers: {'Content-Type': 'application/json'}}

      axios.put("https://us-central1-missao-newton.cloudfunctions.net/astroMatch/eliel/clear",
        headers)
        .then((response) => {
          console.log("Perfis excluidos!")
          alert("Perfis excluídos com sucesso!")
        })
        .catch((error) => {
          console.log("Erro ao excluir")
        })
    }

    return(
      <FooterHome>
        <p><strong>Excluir todos perfis?</strong></p>
        <img onClick={()=>clear()} src={deletar} alt="" />     
      </FooterHome>
    )
  }  
}
export default Footer;