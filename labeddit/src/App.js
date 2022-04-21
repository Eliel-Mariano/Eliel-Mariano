import React from "react";
import styled from "styled-components";
import Router from "./routes/Router"
import jornal from "./assets/jornal.jpg"

const Container = styled.div`
  background-image:url(${jornal});
`

function App() {
  return (
    <Container>
      <Router/>
    </Container>
  );
}

export default App;
