import Main from "./pages/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main></Main>}></Route>
          <Route path="/detail" element={<div>Detail Page</div>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
