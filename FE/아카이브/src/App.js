import Start from "./routes/Start";
import NearHome from "./routes/NearHome";
import MiddleMap from "./routes/MiddleMap";
import styled from "styled-components";
import Result from "./routes/Result";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Main className="App">
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/nearhome" element={<NearHome />}></Route>
        <Route path="/middlemap" element={<MiddleMap />}></Route>
        <Route path="/result" element={<Result />}></Route>
      </Routes>
    </Main>
  );
}

const Main = styled.div`
  width: 100%;
  height: 100%;
`;

export default App;
