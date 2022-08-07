import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css'

export const Modal = (props) => {
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    const dispertarBanco = async () => {
        try {
            setLoading(true);
            setTimeout(function() {
                setLoading(false)
                navigate('/voto', {
                    state: props.time
                })
            }, 2000)
        } catch (error) {
            alert('Ocorreu um erro, chame alguem da direção!');
            window.location.reload();
        }
    }

    return(
        <div id='containerModal'>
            <div id='containerMenorModal'>
                <div id='boxTextoModal'>
                    {isLoading ?
                    <>
                        <div className="lds-ripple"><div></div><div></div></div>
                        <p id='textoStyleModal2'>Carregando...</p>
                    </> : 
                    <>
                        <p id='textoStyleModal'>Tem certeza que deseja votar no time {props.time} ?</p>
                    </>}
                </div>
                <div id='boxBotaoModal'>
                    {isLoading ?
                    <>
                    </> :
                    <>
                        <button id='botaoStyleModal' onClick={() => props.handleClick()}>Cancelar</button>
                        <button id='botaoStyleModal' onClick={() => dispertarBanco()}>Confirmar</button>
                    </>}
                </div>
            </div>
        </div>
    );
};