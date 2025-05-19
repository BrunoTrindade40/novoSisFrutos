import React from 'react';
import { Header } from '../components/Header/Header';
import { Main } from '../components/Main/Main';
import { Footer } from '../components/Footer/Footer';
import { TextoRastreamentoDeFrutos } from '../components/conteudos/Textos/TextoRastreamentoDeFrutos';
import { FormRastreamento } from '../components/conteudos/Formularios/FormRastreamento';

const Home: React.FC = () => {
  return (
    <>
      <Header></Header>
      <Main>
        <TextoRastreamentoDeFrutos></TextoRastreamentoDeFrutos>
        <FormRastreamento></FormRastreamento>
      </Main>
      <Footer></Footer>
    </>
  );
};

export default Home;