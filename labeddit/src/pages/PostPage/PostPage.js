import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../constants/Constants";
import { useForm } from "../../hooks/useForm";
import { useProtectedPage } from "../../hooks/useProtectedPage";
import swal from 'sweetalert';
import { BsReddit, BsChatText } from 'react-icons/bs';
import { ContainerPost } from "./style";
import { MdOutlineHowToVote } from 'react-icons/md';
import curtir from "../../assets/curtir.png";
import descurtir from "../../assets/descurtir.png";
import deletar from "../../assets/delete.png";


function PostPage() {

  const [postDetail, setPostDetail] = useState()
  const { form, onChange, cleanFields } = useForm({body:""})
  const [voteComent, setVoteComent] = useState(0) //estado que atualiza o body
  const [loading, setLoading] = useState(false)
  const [listen, setListen] = useState(0)
  
  const params = useParams()
  //console.log(params)

  useProtectedPage()

  const token = localStorage.getItem("token")

  useEffect(()=>{
    setLoading(true)
    const headers = {headers : {
      'Authorization': token
    }}
    axios.get(`${BASE_URL}/posts/${params.id}/comments`,
    headers)
    .then((response)=>{
      //console.log(response.data)
      setPostDetail(response.data)
      setLoading(false)
    })
    .catch((error)=>{
      console.log(error.response.data)
      setLoading(false)
    })
  },[listen])


  const submitForm = ((event)=>{
    event.preventDefault()
    console.log("Formulário enviado:", form)
    cleanFields()
    onSubmitComent()
  })


  const onSubmitComent = (()=>{
    const body = form
    const headers = {headers : {
      'Content-Type': 'application/json',
      'Authorization': token
    }}
    axios.post(`${BASE_URL}/posts/${params.id}/comments`,
    body, headers)
    .then((response)=>{
      console.log(response.data)
      swal("Feito!", "Comentário enviado!", "success")
      setListen(listen + 1)     
    })
    .catch((error)=>{
      console.log(error.response)
      swal("Algo deu errado!", "Tente novamente!", "error")
    })
  })

                        //voteComent
  const body = {"direction": ""}//porque o primeiro clique acusa erro na requisição???
  //console.log(body)

  const createComentVote = ((id)=>{
    const headers = {headers : {
      'Content-Type': 'application/json',
      'Authorization': token
    }}
    axios.post(`${BASE_URL}/comments/${id}/votes`,
    body, headers)
    .then((response)=>{
      console.log(response.data)
      setListen(listen + 1)      
    })
    .catch((error)=>{
      console.log(error.response)
    })
  })


  const changeComentVote = ((id)=>{
    const headers = {headers : {
      'Content-Type': 'application/json',
      'Authorization': token
    }}
    axios.post(`${BASE_URL}/comments/${id}/votes`,
    body, headers)
    .then((response)=>{
      console.log(response.data)
      setListen(listen + 1)     
    })
    .catch((error)=>{
      console.log(error.response)
    })
  })

  const onClickPositive = ((id)=>{
    body.direction = 1 //setVoteComent(1)
    createComentVote(id)
    //if (body.direction = -1) changeComentVote(id)
  })
 
  const onClickNegative = ((id)=>{
    body.direction = -1 //setVoteComent(-1)
    createComentVote(id)
    //if (body.direction = 1) changeComentVote(id)
  })


  const deleteComentVote = ((id)=>{
    const headers = {headers : {
      'Authorization': token
    }}
    axios.delete(`${BASE_URL}/comments/${id}/votes`,
    headers)
    .then((response)=>{
      console.log(response)
      setListen(listen + 1)
    })
    .catch((error)=>{
      console.log(error.response)
    })
  })

  const navigate = useNavigate()

  const goToFeed = ()=>{
    navigate("/")
  }


  const postDetailList = postDetail && postDetail.map(({id, username, body, voteSum, userVote})=>{
    return <div key={id}>
      <p><strong>{username}: </strong>{body}</p>
      <div className="comentsVotes">
        <p><MdOutlineHowToVote/>{voteSum}</p>
        <p>Seu voto: {userVote}</p>
      </div>
      
      <button onClick={()=>onClickPositive(id)}><img src={curtir}/></button>
      <button onClick={()=>onClickNegative(id)}><img src={descurtir}/></button>
      <button onClick={()=>deleteComentVote(id)}><img src={deletar}/></button>
    </div>
  })

  const userNameFeed = localStorage.getItem("username")
  const titleFeed = localStorage.getItem("title")
  const bodyFeed = localStorage.getItem("body")

  return (
    <ContainerPost>
      <h1>Comentários</h1>

      {loading && <h3>Carregando...</h3>}

      <button onClick={goToFeed}>Voltar para o Feed</button>

      <div className="animista">
        <h2><BsReddit/> {userNameFeed}</h2>
        <h3><BsChatText/> {titleFeed}</h3>
        <p>{bodyFeed}</p>
      </div>
      

      <form onSubmit={submitForm} >
        <input name={"body"} value={form.body} onChange={onChange}
          required placeholder="Escreva seu comentário" type="text" />
        <button type={"submit"} >Comentar</button>
      </form>
     
      {postDetailList}

    </ContainerPost>
  );
}

export default PostPage; 