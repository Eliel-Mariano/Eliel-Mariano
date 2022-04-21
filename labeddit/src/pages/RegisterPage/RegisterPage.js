import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/Constants";
import { useForm } from "../../hooks/useForm";
import swal from 'sweetalert';
import { ContainerRegister } from "./style";

function RegisterPage() {

  const [loading, setLoading] = useState(false)
  const { form, onChange } = useForm({username:"", email:"", password:""})

  const submitForm = ((event)=>{
    event.preventDefault()
    console.log("Formulário enviado:", form)
    onSubmitSignup()
  })

  const onSubmitSignup = (()=>{
    setLoading(true)
    const body = form
    const headers = {headers : {
      'Content-Type': 'application/json'}}
    axios.post(`${BASE_URL}/users/signup`,
    body, headers)
    .then((response)=>{
      console.log(response.data)
      setLoading(false)
      swal("Usuário cadastrado com sucesso!", "Faça login para continuar!", "success")
      navigate("/login")
    })
    .catch((error)=>{
      console.log(error.response)
      setLoading(false)
      swal("Algo deu errado!", "Tente novamente!", "error")
    })
  })

  const navigate = useNavigate()

  const goToLogin = ()=>{
    navigate("/login")
  }

  return (
    <ContainerRegister>
      <h1>Registre-se aqui!!!</h1>
      {loading && <h3>Carregando...</h3>}
      <form onSubmit={submitForm}>
          <input name={"username"} value={form.username} onChange={onChange} placeholder="Nome" type="text" required/>
          <input name={"email"} value={form.email} onChange={onChange} placeholder="E-mail" type="email" required/>
          <input name={"password"} value={form.password} onChange={onChange} placeholder="Senha" type="password" required/>
          <button type={"submit"}>Cadastrar!</button>        
        </form>
      <button onClick={goToLogin}>Voltar</button>
    </ContainerRegister>
  );
}

export default RegisterPage;