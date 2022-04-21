import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Header from '../Components/Header';
import { useProtectedPage } from '../CustonHooks/CustonHooks';
import axios from 'axios';
import { Detail, DetailContainer } from '../Components/Styled';


function TripDetailsPage() {

  const [tripDetails, setTripDetails] = useState({})
  const [candidatesAproved, setCandidatesAproved] = useState([])
  const [detailsCandidates, setDetailsCandidates] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [listen, setListen] = useState(0) //atualiza o array de dependências
  
  useProtectedPage()  

  useEffect(()=>{

    setIsLoading(true)

    const id = localStorage.getItem("id")
    const token = localStorage.getItem("token")
    const headers = {headers:{auth:token}}

    axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labeX/eliel-mariano-moreira/trip/${id}`,
    headers)
    .then((response)=>{
      //console.log(response.data.trip.approved)
      setTripDetails(response.data.trip)
      setIsLoading(false)
      setDetailsCandidates(response.data.trip.candidates)
      setCandidatesAproved(response.data.trip.approved)            
    })
    .catch((error)=>{
      console.log(error.data)
      setIsLoading(false)
    })
  }, [listen] )

  const decideCandidate =(approve)=>{

    const idCandidate = localStorage.getItem("idCandidate")
    const id = localStorage.getItem("id")
    const token = localStorage.getItem("token")
    const headers = {headers:{
      'Content-Type': 'application/json',
      auth:token}}
    const body = {"approve": approve}

    axios.put(
      `https://us-central1-labenu-apis.cloudfunctions.net/labeX/eliel-mariano-moreira/trips/${id}/candidates/${idCandidate}/decide`,
      body, headers)
      .then((response)=>{
        console.log(response.data)     
      })
      .catch((error)=>{
        console.log(error.response)
      })
    setListen(listen + 1)
  }  

  const navigate = useNavigate()

  const goBack = () => {
    navigate("/admin/trips/list")
  }

  //desestruturar objeto
  const {name, description, planet, durationInDays, date } = tripDetails
  
  
  const candidates = detailsCandidates.map(({age,applicationText,country,id,name,profession})=>{
    localStorage.setItem("idCandidate", id)
    return (
    <div key={id}>
      {!isLoading && detailsCandidates.length === 0 && <h2>Não há candidatos para esta viagem!</h2>}
      <h3>{name}</h3>
      <p><strong>Id do candidato:</strong> {id} </p>
      <p><strong>Idade:</strong> {age} </p>
      <p><strong>País:</strong> {country} </p>      
      <p><strong>Profissão:</strong> {profession} </p>
      <p><strong>Interesse:</strong> {applicationText} </p>
      <button onClick={()=>decideCandidate(true)} >Aprovar</button>
      <button onClick={()=>decideCandidate(false)}>Reprovar</button>
    </div>)
  })

  const listApproved = candidatesAproved.map(({age,applicationText,country,id,name,profession})=>{
    return (
      <div key={id}>        
        <h3>{name}</h3>
        <p><strong>Id do candidato:</strong> {id} </p>
        <p><strong>Idade:</strong> {age} anos</p>
        <p><strong>País:</strong> {country} </p>      
        <p><strong>Profissão:</strong> {profession} </p>
        <p><strong>Interesse:</strong> {applicationText} </p>
      </div>)
  })
     
  return (
    <div>
      <Header/>
      <DetailContainer>      

        {isLoading && <h3>Carregando detalhes da viagem...</h3>}
        {!isLoading && tripDetails.length === 0 && 
          <h2>Não há detalhes sobre essa viagem.</h2>}

        <div>
          <h2>{name}</h2>
          <p><strong>Descrição:</strong> {description} </p>
          <p><strong>Planeta:</strong> {planet} </p>
          <p><strong>Duração:</strong> {durationInDays} </p>
          <p><strong>Data:</strong> {date} </p>
        </div>      
        
        <button onClick={goBack}>Voltar</button>

        <h2>Candidatos Pendentes</h2>
        {candidates}      

        <h2>Candidatos Aprovados</h2>
        {listApproved}
    </DetailContainer>
    </div>
    
  );
}

export default TripDetailsPage;