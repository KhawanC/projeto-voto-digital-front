import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { api } from '../../Api/api';
import './style.css'

export const ModalEnvio = (props) => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [isVotou, setVotou] = useState(false);

    const enviarVoto = async() => {
        setLoading(true)
        setTimeout(async function() {
            try {
                console.log(props.dados.matricula)
                console.log(props.dados.votacao)
                const res = await api.put(`aluno/voto`, {
                    matricula: props.dados.matricula,
                    chapa: props.dados.votacao,
                })
                navigate('/obrigado-por-votar')
                setLoading(false)
            } catch (error) {
                console.log(error.response)
                if(error.response.data.detalhes[0] === 'Esse aluno já votou, por favor, chame a coordenação') {
                    setVotou(true)
                }
                setLoading(false)
            }
        }, 3500)
    }
    
    return(
        <div id={isVotou ? 'containerModalViolacao' : 'containerModal'}>
            <div id='containerMenorModal'>
                {isLoading ? 
                <>
                    <div id='boxLoadingPaginaModalEnvio'>
                        <div className="lds-ripple"><div></div><div></div></div>
                        <p id='textoStyleModal2'>Carregando...</p>
                    </div>
                </> :
                <>
                    {isVotou ?
                    <>
                        <div id='boxMensagemConfirmaModalEnvio'> 
                            <p id='aviso1StyleModalEnvio'>Consultamos o sistema e parece que você já votou!</p>
                            <p id='aviso2StyleModalEnvio'>Chame alguem da coordenação para resolver</p>
                        </div>
                    </> :
                    <>
                        <div id='boxMensagemConfirmaModalEnvio'>
                            <p id='tituloStyleModalEnvio'>Tem certeza que deseja votar em:</p>
                            <p id='nomeChapaStyleModalEnvio'>{props.dados?.votacao}</p>
                        </div>
                    </>}
                    <div id='boxBotoesPaginaModalEnvio'>
                        <button className='botaoPaginaModalEnvio' onClick={() => props.handleClick()}>Voltar</button>
                        <button className='botaoPaginaModalEnvio' onClick={() => enviarVoto()} disabled={isVotou ? true : false}>Enviar</button>
                    </div>
                </>}
            </div>
        </div>
    );
};