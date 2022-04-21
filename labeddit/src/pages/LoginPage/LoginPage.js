import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/Constants";
import { useForm } from "../../hooks/useForm";
import swal from 'sweetalert';
import { ContainerLogin } from "./style";
import { BsKeyFill } from 'react-icons/bs';
import { FaKeyboard } from 'react-icons/fa';
import { GrReddit } from 'react-icons/gr';


function LoginPage() {

  const [loading, setLoading] = useState(false)
  const { form, onChange } = useForm({email:"", password:""})

  const submitForm = ((event)=>{
    event.preventDefault()
    //console.log("Formulário enviado:", form)
    onSubmitLogin()
  })

  const onSubmitLogin = (()=>{
    setLoading(true)
    const body = form
    const headers = {headers : {
      'Content-Type': 'application/json'}}
    axios.post(`${BASE_URL}/users/login`,
    body, headers)
    .then((response)=>{
      //console.log(response.data.token)
      localStorage.setItem('token', response.data.token)
      setLoading(false)
      swal("Bem vindo!", "Logado com sucesso!", "success")
      navigate("/")
    })
    .catch((error)=>{
      console.log(error.response)
      setLoading(false)
      swal("Algo deu errado!", "Cadastre-se ou tente novamente!", "error")
    })
  })

  const navigate = useNavigate()

  const goToRegister = ()=>{
    navigate("/register")
  }

  return (
    <ContainerLogin>
      {loading && <h3>Carregando...</h3>}
      <h1><GrReddit/> LabEddit</h1>
      <h2>Entre para Continuar</h2>
      <form onSubmit={submitForm}>
        <input name={"email"} value={form.email} onChange={onChange} placeholder="e-mail" type="email" required /><FaKeyboard/>
        <input name={"password"} value={form.password} onChange={onChange} placeholder="senha" type="password" required/><BsKeyFill/>
        <button type={"submit"}>Entrar</button>        
      </form>
      <button onClick={goToRegister}>Não possui cadastro?</button>
      
    </ContainerLogin>
  );
}

export default LoginPage;