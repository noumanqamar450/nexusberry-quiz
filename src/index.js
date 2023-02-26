import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header/>
    <Container style={{marginTop:'3rem'}}>
      <App />
    </Container>
  </React.StrictMode>
);


