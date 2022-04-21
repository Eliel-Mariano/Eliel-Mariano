import axios from "axios"
import { useEffect, useState } from "react/cjs/react.development"

//?????????????????????????????????????????????????????/

export function useRequestData(){

    const [nameTrip, setNameTrip] = useState([])

    useEffect(()=>{

    axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labeX/eliel-mariano-moreira/trips")
    .then((response)=>{
    //console.log(response.data.trips)
    setNameTrip(response.data.trips)
    })
    .catch((error)=>{
    console.log(error.data)
    })

    return nameTrip


},[])
}

    