import React from 'react';
import { Header } from '../components/Header/Header';
import { Main } from '../components/Main/Main';
import { Footer } from '../components/Footer/Footer';

const Home : React.FC = () => {
  return (
    <>
      <Header></Header>
      <Main nome="Opa"></Main>
      <Footer></Footer>
    </>
  );
}

export default Home;