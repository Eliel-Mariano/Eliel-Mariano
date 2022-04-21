import React from 'react';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, ContainerButton, Title } from '../Components/Styled';


function HomePage() {
  
  const navigate = useNavigate()

  const goToListTrip = () =>{
    navigate("/trips/list")
  }

  const  adminHomePage = () => {
    navigate("/admin/trips/list")
  }

  return (
    <div>
      <Header/>
      <Title>
        <p>
          <font color = "red"> porque </font>
          <font color = "orange">o universo </font>
          <font color = "green">é seu</font>
        </p>        
      </Title>
      <ContainerButton>
        <Button onClick={goToListTrip}>Ver Viagens</Button>
        <Button onClick={adminHomePage}>Área de Administrador</Button>
      </ContainerButton>
      
    </div>
  );
}

export default HomePage;