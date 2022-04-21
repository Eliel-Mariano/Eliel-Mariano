import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';


function LoginPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const goBack = () => {
    navigate("/")
  }

  const onChangeEmail=(event)=>{
    setEmail(event.target.value)
  }

  const onChangePassword=(event)=>{
    setPassword(event.target.value)
  }

  const onSubmitLogin=()=>{
    //console.log(email, password)

    const body = {
      email: email,
      password: password
    }

    axios.post("https://us-central1-labenu-apis.cloudfunctions.net/labeX/eliel-mariano-moreira/login",
    body)
    .then((response)=>{
      //console.log(response.data)
      localStorage.setItem("token", response.data.token)
      navigate("/admin/trips/list")
    })
    .catch((error)=>{
      console.log(error.response)
    })
  }

//eliel.mariano@engenharia.ufjf.br

  return (
    <div>
      <Header/>
      <h1>Login</h1>
      <input onChange={onChangeEmail} value={email} placeholder='E-mail' type="email" />
      <input onChange={onChangePassword} value={password} placeholder='Senha' type="password" />

      <button onClick={goBack}>Voltar</button>
      <button onClick={onSubmitLogin}>Entrar</button>
      
      <hr />
    </div>
  );
}

export default LoginPage;