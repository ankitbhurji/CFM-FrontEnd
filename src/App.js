import Home from "./Home/Home";
import { Routes, Route } from "react-router-dom";

import Home1 from "./Home1/Home1";

function App() {
  return (
    <div>
      <Routes>
        {/* <Home /> */}
        {/* <Route path="/"  element={<Home />}/> */}
        {/* <Route path="/:id"  element={<Home />}/> */}

        <Route path="/"  element={<Home1 />}/>
      </Routes>
    </div>
  );
}

export default App;
