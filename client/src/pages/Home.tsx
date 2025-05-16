import React from 'react';
import { Header } from '../components/Header/Header';
import { Main } from '../components/Main/Main';
import { Footer } from '../components/Footer/Footer';
import { TextoRastreamentoDeFrutos } from '../components/conteudos/Textos/TextoRastreamentoDeFrutos';
import { FormRatreamento } from '../components/conteudos/Formularios/FormRatreamento';
('../components/conteudos/Formularios/FormRatreamento');

const Home: React.FC = () => {
  return (
    <>
      <Header></Header>
      <Main>
        <TextoRastreamentoDeFrutos></TextoRastreamentoDeFrutos>
        <FormRatreamento></FormRatreamento>
      </Main>
      <Footer></Footer>
    </>
  );
};

export default Home;