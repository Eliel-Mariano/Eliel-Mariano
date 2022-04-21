import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/Constants";
import { useProtectedPage } from "../../hooks/useProtectedPage";
import { useForm } from "../../hooks/useForm";
import swal from 'sweetalert';
import { BsReddit, BsChatText } from 'react-icons/bs';
import { FaHeadSideCough } from 'react-icons/fa';
import { MdOutlineHowToVote } from 'react-icons/md';
import { ContainerFeed } from "./style";
import curtir from "../../assets/curtir.png";
import descurtir from "../../assets/descurtir.png";
import deletar from "../../assets/delete.png";



function FeedPage() {

  const [post, setPost] = useState([])
  const [listen, setListen] = useState(0)
  const [page, setPage] = useState(1)
  const { form, onChange, cleanFields } = useForm({title:"", body:""})
  const [votePost, setVotePost] = useState(0) //estado que atualiza o body
  const [loading, setLoading] = useState(false)

  useProtectedPage()

  const token = localStorage.getItem("token")

  useEffect(()=>{    
    setLoading(true)
    const headers = {headers : {
      'Content-Type': 'application/json',
      'Authorization': token
    }}
    axios.get(`${BASE_URL}/posts?size=5&page=${page}`, //?size=5&page=${}(query params da API)quantidade e numero da página.
    headers)
    .then((response)=>{
      //console.log(response.data)
      setPost(response.data)
      setLoading(false)
    })
    .catch((error)=>{
      console.log(error.response.data)
      setLoading(false)
    })
  },[listen, page])


  const submitForm = ((event)=>{
    event.preventDefault()
    console.log("Formulário enviado:", form)
    cleanFields()
    onSubmitPost()
  })


  const onSubmitPost = (()=>{
    const body = form
    const headers = {headers : {
      'Content-Type': 'application/json',
      'Authorization': token
    }}
    axios.post(`${BASE_URL}/posts`,
    body, headers)
    .then((response)=>{
      console.log(response.data)
      swal("Feito!", "Publicação enviada!", "success")
      setListen(listen + 1)    
    })
    .catch((error)=>{
      console.log(error.response.data)
      swal("Algo deu errado!", "Tente novamente!", "error")
    })
  })

                            //votePost
  const body = {"direction": ""} //quando uso o body puxando do estado,por que o primeiro clique acusa erro na requisição???
  //console.log(body)                     //parece estar com um clique de atraso...
  
  const createPostVote = ((id)=>{    
    const headers = {headers : {
      'Content-Type': 'application/json',
      'Authorization': token
    }}
    axios.post(`${BASE_URL}/posts/${id}/votes`,
    body, headers)
    .then((response)=>{
      console.log(response.data)
      setListen(listen + 1)
    })
    .catch((error)=>{
      console.log(error.response)
    })
  })

  const changePostVote = ((id)=>{ // erro 500 - internal server error
    const headers = {headers : {
      'Content-Type': 'application/json',
      'Authorization': token
    }}
    axios.post(`${BASE_URL}/posts/${id}/votes`,
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
    body.direction = 1 //setVotePost(1)    
    createPostVote(id)
    //if (body.direction = -1) changePostVote(id)
  })
 
  const onClickNegative = ((id)=>{
    body.direction = -1 //setVotePost(-1)
    createPostVote(id)
    //if (body.direction = 1) changePostVote(id)
  })

  const deletePostVote = ((id)=>{
    const headers = {headers : {
      'Authorization': token
    }}
    axios.delete(`${BASE_URL}/posts/${id}/votes`,
    headers)
    .then((response)=>{
      console.log(response)
      //setVotePost(0)
      setListen(listen + 1)
    })
    .catch((error)=>{
      console.log(error.response)
    })
  })
  
  const navigate = useNavigate()

  const goToPost = (id, username, title, body)=>{
    navigate(`/post/${id}`)
    localStorage.setItem("username", username)
    localStorage.setItem("title", title)
    localStorage.setItem("body", body)
  }

  const postList = post.map(({id, username, title, body, voteSum, commentCount})=>{
    return <div key={id}>
      <div className="animista">
        <h2><BsReddit/> {username}</h2>
        <h3><BsChatText/> {title}</h3>
        <p>{body}</p>
      </div>
      <button onClick={()=>goToPost(id, username, title, body)}>Ir para o post</button>
      <div className="comentsVotes">
        <p><MdOutlineHowToVote/> {voteSum}</p>
        <p><FaHeadSideCough/> {commentCount}</p>
      </div>
      
      <button onClick={()=>onClickPositive(id)}> <img src={curtir}/></button>
      <button onClick={()=>onClickNegative(id)}><img src={descurtir}/></button>
      <button onClick={()=>deletePostVote(id)}><img src={deletar}/></button>
      
    </div>
  })

  const logout = (()=>{
    localStorage.clear()
    setListen(listen + 1)
    swal("Você saiu da sua conta!", "Volte sempre!", "success")
  })
  

  return (
    <ContainerFeed>
      <h1>Feed de notícias</h1>
      <button onClick={logout}>Sair</button>
      {loading && <h3>Carregando...</h3>}
      <form onSubmit={submitForm}>
        <input name={"title"} value={form.title} onChange={onChange} 
          required placeholder="Título do seu post" type="text" />
        <input className="inputPost" name={"body"} value={form.body} onChange={onChange} 
          required placeholder="Escreva seu post" type="text" />
        <button type={"submit"} >Publicar</button>
      </form>      

      {postList}

      <button onClick={()=>setPage(page>1? page-1 : page)}>Página anterior</button>
      <strong> {page} </strong>
      <button onClick={()=>setPage(page + 1)}>Próxima página</button>      
    </ContainerFeed>
  );
}

export default FeedPage;