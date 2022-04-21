import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import Header from "./Header";
import { ContainerPerfil } from './Style';


function Home (props) {

  const [profile, setProfile] = useState({})  

  const getProfileToChoose = () =>{
    axios.get("https://us-central1-missao-newton.cloudfunctions.net/astroMatch/eliel/person")
    .then((response) => {
      //console.log(response.data.profile)
      setProfile(response.data.profile)       
    })
    .catch((error) => {
      console.log("Erro do getProfileToChoose")
    })
  }  
  
  useEffect(() => {
    getProfileToChoose()
  }, []) 
  
  
  return (
  <div>
    <Header goToMatchList={props.goToMatchList} condicionalCabecalho={props.condicionalCabecalho}/>

    <ContainerPerfil>
      <h3>{profile.name}, {profile.age} anos</h3>
      <img src={profile.photo} alt="foto de perfil" />
      <p><strong>{profile.bio}</strong></p>      
    </ContainerPerfil>    
    
    <Footer getProfileToChoose={() => getProfileToChoose()}   
    condicionalCabecalho={props.condicionalCabecalho}
    profile={profile} />
  </div>
    
  );
}

export default Home;