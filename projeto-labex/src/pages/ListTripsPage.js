import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CardListTrip from '../Components/CardListTrip';
import Header from '../Components/Header';
import { ListTrip } from '../Components/Styled';


function ListTripsPage() {

  const navigate = useNavigate()

  const goBack = () => {
    navigate("/")
  }

  return (
    <div>
      <Header/>
      <ListTrip>      
        <button onClick={goBack}>Voltar</button>
        <h2>Lista de Viagens Disponíveis</h2>
        <CardListTrip/>
        <hr />
    </ListTrip>
    </div>
    
  );
}

export default ListTripsPage;