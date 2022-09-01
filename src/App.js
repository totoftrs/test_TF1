import React, {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from './Components/Home'
import Video from './Components/Video'

const API_URL = " https://tf1-interview.hasura.app/v1/graphql";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
            query getData {
              image(limit: 10) {
                alt
                id
                url
                programs {
                    name
                  }
              }
            }`,
      }),
    })
      .then((rawData) => rawData.json())
      .then((jsonData) => setData(jsonData.data.image));
  }, []);
 
  return (
    <div className="App">
       <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home data={data}/>} exact />
            <Route path="/video/:id" element={<Video data={data}/>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
