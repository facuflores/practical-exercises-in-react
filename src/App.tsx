import React from 'react';
import logo from './logo.svg';
import './App.css';


import AppPracticaUno from './to-move/components/AppPracticaUno';
import { AppProvider } from './to-move/contexts/AppProvider';
import TodoLayoutComponent from './to-do-list/components/TodoLayout.component';

// style components
import styled from "styled-components";
import MainComponent from './to-move/ejercicios/contextos';
import PersonalMainComponent from './to-move/test-react-redux/personal.component';

const PrettyDiv = styled.div`
  background-color: pink;
  border: 2px solid pink;
  border-radius: 5px;
  color: black;
  padding: 10px;
  box-shadow: 5px 5px 5px 0px lightgray;
`;

const PrettyP = styled.p`
  color: white;
`;

const CustomButton = () => {
  return (
    <div>
      <p>
        ad repudiandae cumque id qui. Ad nesciunt quos repellendus harum? Culpa soluta nesciunt laudantium?
      </p>
    </div>
  );
}

function App() {

  // Variables
  const mensaje = "Mensaje de clase padre!";

  return (
    <AppProvider>
      <div className="App">
        
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
        {/* </header> */}
       
        {/* <TodoLayoutComponent /> */}

        {/* <MainComponent /> */}

        {/* <PersonalMainComponent /> */}


        
        

      </div>
    </AppProvider>
  );
}

export default App;
