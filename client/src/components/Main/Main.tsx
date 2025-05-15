import React from 'react';

interface MainProps {
  nome: string;
}

export const Main: React.FC<MainProps> = (props) => {
    return (
        <main >
            {props.nome}
        </main>
    );
};