import React from 'react';
import { useNavigate } from 'react-router-dom';


function CardListTrip() {

  const nameTripString = localStorage.getItem("nameTrip")
  const nameTrip = JSON.parse(nameTripString)
  //console.log(nameTrip)

  const navigate = useNavigate()

  const goToApplicationForm = () => {
    navigate("/trips/application")
  }

  const listName = nameTrip.map(({id, name, planet, description,date, durationInDays })=>{ //desestruturação no lugar do "item"
    const onClickDetails = (()=>{
      goToApplicationForm()
      localStorage.setItem("id", id)
      localStorage.setItem("nameChoice", name)
    })
    return <div key={id}> 
      <h3>{name}</h3>
      <p><strong>Descrição: </strong>{description}</p>
      <p><strong>Planeta: </strong>{planet}</p>
      <p><strong>Data: </strong>{date}</p>
      <p><strong>Duração: </strong>{durationInDays} dias</p>
      <button onClick={onClickDetails}>Inscreva-se</button>
    </div>
  })

  return (
    <div>
      {listName}
    </div>
  );
}

export default CardListTrip;