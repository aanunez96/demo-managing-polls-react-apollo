import React from 'react';
import { Button } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import logo from './logo.svg';
import './App.css';
import client from "./apollo-client";

const question = gql`
  query{
    question(questionId: "hola"){
      text
    }
  }
`

console.log(client)

function App() {
  const { data } = useQuery(question);
  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Button variant="contained" color="primary">
            Hello World
          </Button>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <p>
            From the server: { data && data.question && data.question.text }
          </p>
        </header>
      </div>
  );
}

export default App;
