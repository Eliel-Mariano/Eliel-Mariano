import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


export function useProtectedPage () {

    const navigate = useNavigate()

    useEffect(()=>{
      const token = localStorage.getItem("token")

      if(token === null) {
        console.log("Faça login para continuar!")
        alert("Faça login para continuar!")
        navigate("/login")
      }
    },[])

  }
