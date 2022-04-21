import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ContainerCardMatchs, Fotos, Maincards } from './Style';


function CardMatchs () {

  const [matchList, setMatchList] = useState([])  

  const getMatches = () =>{
    axios.get("https://us-central1-missao-newton.cloudfunctions.net/astroMatch/eliel/matches")
    .then((response) => {
    //console.log(response)
    setMatchList(response.data.matches)
    })
    .catch((error) => {
    console.log("Erro ao carregar perfis - CardMatchs")
    })
  }
  
  useEffect(() => {
    getMatches()
  }, [])

  const auxMatchList = matchList.map((item)=>{
    //console.log(item)  
    return <ContainerCardMatchs key={item.id}>          
          <Fotos src={item.photo} />
          <p><strong>{item.name}</strong></p>
        </ContainerCardMatchs>    
  })  
  
  return (
      <Maincards>
        {auxMatchList}
      </Maincards>
    )
}
export default CardMatchs;