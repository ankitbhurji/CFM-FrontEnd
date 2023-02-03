import Home from "./Home/Home";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Routes>
        {/* <Home /> */}
        <Route path="/"  element={<Home />}/>
        <Route path="/:id"  element={<Home />}/>
      </Routes>
    </div>
  );
}

export default App;
