import React from 'react';
import styled from 'styled-components';
import sistemaSolar from "../assets/sistemaSolar.jpeg"



export const ContainerHeader = styled.div`
  display:flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  width: 96vw;
  position: fixed;
  top: 0;
  left: 5px;
  background-color: white;
  span{
      color: gray
  }
`

export const Title = styled.h2`
  display:flex;
  justify-content: center;
  font-family: 'Cedarville Cursive', cursive;
  background-image: url(${sistemaSolar});
  background-position: center;
  background-size: cover;
  height: 30vh;
  max-width:100%;
  margin-top: 50px;
`

export const ContainerButton = styled.div`
  display:flex;
  justify-content: space-evenly;
  padding: 30px;
`

export const Button = styled.button`
  background-color: rgb(255, 123, 0);
  color: black;
  border-radius: 10px;
  font-weight: 600;
  height: 50px;
  :hover{
    cursor: pointer;
    background-color: rgb(248, 164, 37);
  }   
`

export const AdminContainer = styled.div`
  margin-top: 50px;
  display:flex;
  flex-direction: column;
  align-items: center;
  h1{
    font-family:Arial, Helvetica, sans-serif;
    text-align: center
    }
  button{
    margin-right: 10px;
    background-color: rgb(255, 123, 0);
    border-radius: 10px;
    font-weight: 600;
    height: 30px;
    :hover{
        cursor: pointer;
        background-color: rgb(248, 164, 37);
    }
  }
`

export const ListContainer = styled.div`  
  display:flex;
  flex-direction: column;
  font-family:Arial, Helvetica, sans-serif;
  h2{
    text-align:center;
  }
  div{
    div{
      display:flex;
      flex-direction: column;
      align-items: center;
      background-color: rgb(255, 123, 0);
      border-radius: 20px;
      margin-bottom:10px;
      padding: 3px 10px 10px 10px;
      font-size: 15px;
      button{          
        margin-bottom: 10px;
        width: 150px;
        :hover{
          cursor: pointer;
          background-color: rgb(248, 164, 37);
        }
      }
    }    
  }  
`

export const CreateContainer = styled.div`
  margin-top:50px;
  font-family:Arial, Helvetica, sans-serif;
  flex-direction:column;
  display:flex;
  align-items: center;
  input, select{    
    margin-bottom: 10px;
    width: 500px;
    height: 30px;
    border-radius: 10px;
    max-width: 80%;
  }  
  button{
    margin-right: 10px;
    margin-bottom: 10px;
    background-color: rgb(255, 123, 0);
    color: black;
    border-radius: 10px;
    font-weight: 600;
    height: 30px;
    width: 150px;
    :hover{
        cursor: pointer;
        background-color: rgb(248, 164, 37);
    }
  }
`

export const DetailContainer = styled.div`
  margin-top: 50px;
  display:flex;
  flex-direction: column;
  align-items: center;
  font-family:Arial, Helvetica, sans-serif;
  h2{
    text-align:center;
  }
  div{
    display:flex;
    flex-direction: column;
    background-color: rgb(255, 123, 0);
    border-radius: 20px;
    margin-bottom:10px;
    padding: 3px 10px 10px 10px;
    font-size: 15px;
  }
  button{
    margin-right: 10px;
    margin-bottom: 10px;
    background-color: rgb(255, 123, 0);
    border-radius: 10px;
    font-weight: 600;
    height: 30px;
    width: 150px;
    :hover{
        cursor: pointer;
        background-color: rgb(248, 164, 37);
    }
  }
`
export const ListTrip = styled.div`
  margin-top: 50px;
  display:flex;
  flex-direction:column;
  align-items: center;
  font-family:Arial, Helvetica, sans-serif;
  button{
        margin-right: 10px;
        background-color: rgb(255, 123, 0);
        border-radius: 10px;
        font-weight: 600;
        height: 30px;
        width: 150px;
        :hover{
            cursor: pointer;
            background-color: rgb(248, 164, 37);
        }
    }  
  div{      
    div{
      display:flex;
      flex-direction: column;
      align-items: center;    
      background-color: rgb(255, 123, 0);
      border-radius: 20px;
      margin-bottom:10px;
      padding: 3px 10px 10px 10px;
      font-size: 15px;
      button{
        margin-right: 10px;
        background-color: rgb(255, 123, 0);
        border-radius: 10px;
        font-weight: 600;
        height: 30px;
        width: 150px;
        :hover{
            cursor: pointer;
            background-color: rgb(248, 164, 37);
        }
      }
    }
  }
`

export const ApplicationForm = styled.div`
  margin-top:50px;
  font-family:Arial, Helvetica, sans-serif;
  display:flex;
  flex-direction:column;
  align-items: center;
  input, select{
    display: block;
    margin-bottom: 10px;
    width: 500px;
    height: 30px;
    border-radius: 10px;
    max-width: 80vw;
  }  
  button{
    margin-right: 10px;
    margin-bottom: 10px;
    background-color: rgb(255, 123, 0);
    color: black;
    border-radius: 10px;
    font-weight: 600;
    height: 30px;
    width: 150px;
    :hover{
        cursor: pointer;
        background-color: rgb(248, 164, 37);
    }
  }
  form{
      display:flex;
      flex-direction: column;
      align-items: center;
  }
`