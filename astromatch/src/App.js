import React, { useState } from 'react';
import Home from "./Components/Home"
import MatchList from "./Components/MatchList"

function App() {
  const [tela, setTela] = useState ("Home")

  const goToMatchList = () => {
    setTela("MatchList")
  }

  const goToHome = () => {
    setTela("Home")
  }

  const condicionalCabecalho = tela

  switch (tela){
    case "Home":
      return <Home goToMatchList={goToMatchList} condicionalCabecalho={condicionalCabecalho}/>
    case "MatchList":
      return <MatchList goToHome={goToHome}/>
    default:
      return "ERRO"
  }

  return (
    <div>
           
    </div>
  );
}

export default App;
