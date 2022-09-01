import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.section`
  color: #fff;
  padding-top: 40px;

  .back {
    text-decoration: none;
    color: #fff;
    cursor: pointer;
    display: block;
    margin-bottom: 2.6rem;
    margin-top: 3.9rem;
    color: #979797;
    text-decoration: none;
  }
  h1 {
    font-size: 2.5rem;
  }
  .content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .container-infos {
    display: flex;
    justify-content: space-around;
    width: 800px;
  }
  img {
    width: 300px;
  }
  .title{
    font-size: 1.3rem;
    padding-bottom: 20px;
    text-transform: capitalize;
    font-weight: bold;
  }
  .txt{
    padding: 0 20px;
  }
`;

function Video({ data }) {
  const { id } = useParams();
  const findId = data.find((elem) => elem.id == id);
  return (
    <Container>
      <Link to="/" className="back">
        Retour à l'accueil
      </Link>
      <div className="content">
        <h1>Video</h1>
        <div className="container-infos">
          <img src={findId.url} alt={findId.alt} />
          <div className="container-txt">
            <div className="title">description</div>
            <div className="txt">{findId.programs[0].name}</div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Video;
