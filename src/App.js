import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from './Components/Home'
// import Details from './Components/Details'
function App() {
 
  return (
    <div className="App">
       <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} exact />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
