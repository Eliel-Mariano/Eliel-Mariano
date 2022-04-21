import React from 'react';
import styled from 'styled-components';
import { useProtectedPage } from '../CustonHooks/CustonHooks';
import { ListContainer } from './Styled';


function CardAdminTrip(props) {
  
  useProtectedPage()
  
  return (
    <ListContainer>
      <h2><strong>Lista de viagens </strong></h2>
      <div>
        {props.listName}
      </div>
    </ListContainer>
  );
}
export default CardAdminTrip;