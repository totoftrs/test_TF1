import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Carousel from "react-elastic-carousel";
import Item from "./Item";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #000;
  background-color: #000;

  h1 {
    color: #fff;
    padding: 40px 0;
  }
  img {
    width: 100%;
  }
  .carousel-wrapper {
    width: 60%;
  }
  .carousel-item {
    display: flex;
    align-items: center;
    flex-direction: column;
    color: #fff;
    z-index: 99;
  }
  .title {
    max-width: 200px;
    width: 100%;
  }
  .txt {
    text-overflow: ellipsis;
    font-size: 1rem;
    line-height: 50px;
    overflow: hidden;
    white-space: nowrap;
    font-family: sans-serif;
    text-align: center;
  }
  .txt__more {
    font-size: 1rem;
    font-family: sans-serif;
    text-align: center;
  }
  .rec-pagination {
    display: none !important;
  }

  .picto {
    position: absolute;
    padding: 8px;
    width: 16px;
    height: 16px;
    border-radius: 8px;
    bottom: 5px;
    right: 5px;
    background-color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
`;
const API_URL = " https://tf1-interview.hasura.app/v1/graphql";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 250, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
  { width: 1400, itemsToShow: 5 },
  { width: 1600, itemsToShow: 6 },
];

function Home() {
  const [data, setData] = useState([]);

  // Afficher plus de description au clic sur un élement.
  const handleClick = (id) => {
    const texts = document.getElementsByClassName("txt");
    const currentText = texts[id];
    console.log(currentText)
    if(!currentText.classList.contains('txt__more')) {
      currentText.classList.add("txt__more");
      currentText.classList.remove("txt");
    }
    if(parseInt(currentText.getAttribute('data-id')) === id && currentText.classList.contains('txt__more')) {
      currentText.classList.remove("txt__more");
      currentText.classList.add("txt");
    }

   
  };

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
    <Container>
      <h1>Multimedia</h1>
      <div className="carousel-wrapper">
        <Carousel breakPoints={breakPoints}>
          {data.map((item, index) => {
            if (item.alt === " ") {
              return null;
            }

            return (
              <div
                className="carousel-item"
                key={item.id}
                onClick={()=>handleClick(index)}
              >
                <Item>
                  <img src={item.url} alt={item.alt} />
                  <img src="./Vector.png" alt="more__infos" className="picto" />
                </Item>
                <div className="title">
                  <div className={"txt"} data-id={index}>{item.programs[0].name}</div>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </Container>
  );
}

export default Home;
