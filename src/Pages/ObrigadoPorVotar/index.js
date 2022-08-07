import React, { useEffect, useState } from 'react'
import './style.css'
import { CgCheckO } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';

export const ObrigadoPorVotar = (props) => {
    const navigate = useNavigate();
    const [contador, setContador] = useState(15);

    function diminuirContador() {
        setTimeout(function() {
            setContador(e => e - 1);
            diminuirContador();
        }, 1000)
    }

    useEffect(() => {
        diminuirContador()
        setTimeout(function() {
            navigate('/')
        }, 15000)
    }, [])

    return(
        <div id='containerPaginaObrigadoPorVotar'>
            <div id='boxMenorPaginaObrigadoPorVotar'>
                <div id='boxIconeCheckPaginaObrigadoPorVotar'>
                    <CgCheckO 
                        size={90}
                        style={{marginBottom: '55'}}/>
                    <p id='textoStylePaginaObrigadoPorVotar'>Obrigado por votar!</p>
                </div>
                <div id='boxContadorPaginaObirgadoPorVotar'>
                    <p id='contadorStylePaginaObrigadoPorVotar'>{contador}</p>
                    <p id='subTextoStylePaginaObrigadoPorVotar'>Chame o próximo da fila...</p>
                </div>
            </div>
        </div>
    );
};