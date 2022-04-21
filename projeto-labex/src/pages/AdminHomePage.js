import React, { useEffect, useState } from 'react';
import CardAdminTrip from '../Components/CardAdminTrip';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import axios from 'axios';
import { useProtectedPage } from '../CustonHooks/CustonHooks';
import { AdminContainer } from '../Components/Styled';




function AdminHomePage() {

  const [nameTrip, setNameTrip] = useState([])  
  const [listen, setListen] = useState(0) //atualiza o array de dependências
  const [isLoading, setIsLoading] = useState(false)

  localStorage.setItem("nameTrip", JSON.stringify(nameTrip))


  useProtectedPage()

  useEffect(()=>{

    setIsLoading(true)

    axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labeX/eliel-mariano-moreira/trips")
    .then((response)=>{
      //console.log(response.data.trips)
      setNameTrip(response.data.trips)
      setIsLoading(false)
    })
    .catch((error)=>{
      console.log(error.data)
      setIsLoading(false)
    })
    //console.log(listen)
  },[listen])


  const deleteTrip =()=>{

    const id = localStorage.getItem("id")
    const token = localStorage.getItem("token")
    const headers = {headers:{
      'Content-Type': 'application/json',
      auth: token}}

    axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labeX/eliel-mariano-moreira/trips/${id}`,
    headers)
    .then((response)=>{
      console.log(response.data)      
    })
    .catch((error)=>{
      console.log(error.response)
    })
    setListen(listen+1)
  }

  const navigate = useNavigate()

  const goBack = () => {
    navigate("/")
  }

  const createTrip = () => {
    navigate("/admin/trips/create")
  }

  const tripDetails = () => {
    navigate("/admin/trips/:id")
  }

  const logout = () => {
    localStorage.clear()
    navigate("/")
  }  
  
    
  const listName = nameTrip.map(({id, name})=>{ //desestruturação no lugar do "item"
    const onClickDetails = (()=>{
      tripDetails()
      localStorage.setItem("id", id)
    })
    return <div key={id}> 
      <h3>{name}</h3>
      <button onClick={onClickDetails}>Ver detalhes</button>
      <button onClick={()=>deleteTrip()}>Excluir</button>
    </div>
  })
      
  return (
    <div>
      <Header/>
      <AdminContainer>      

        {isLoading && <h3>Carregando viagens espaciais...</h3>}
        {!isLoading && listName.length === 0 && <h2>Não há viagens...</h2> }

        <h1>Painel Administrativo</h1>
        <div>
          <button onClick={goBack}>Voltar</button>
          <button onClick={createTrip}>Criar Viagem</button>
          <button onClick={logout}>Logout</button>
        </div>            

      <CardAdminTrip listName={listName}/>
    </AdminContainer></div>
    
  );
}
export default AdminHomePage;