import React, { useEffect, useState } from 'react'
import { Modal } from '../../Components/Modal';
import './style.css'

export const Home = () => {
    const [isHoverDireito, setHoverDireito] = useState();
    const [isHoverEsquerdo, setHoverEsquerdo] = useState();
    const [timeSelecionado, setTimeSelecionado] = useState(0);
    const [isModal, setModal] = useState(false);

    const fecharModal = () => {
        setTimeSelecionado(0);
        setModal(false);
    }

    useEffect(() => {
    }, [isHoverDireito, isHoverEsquerdo])

    const verificarLadoEsquerdo = () => {
        if(isHoverEsquerdo === undefined || isHoverEsquerdo === null || isHoverEsquerdo === '') {
            return 'boxTimeEsquerdoPaginaHome'
        } else if(isHoverEsquerdo === true) {
            return 'boxTimeEsquerdoGrandePaginaHome'
        } else {
            return 'boxTimeEsquerdoPequenoPaginaHome'
        }
    }

    const verificarLadoDireito = () => {
        if(isHoverEsquerdo === undefined || isHoverEsquerdo === null || isHoverEsquerdo === '') {
            return 'boxTimeDireitoPaginaHome'
        } else if(isHoverDireito === true) {
            return 'boxtimeDireitoGrandePaginaHome'
        } else {
            return 'boxTimeDireitoPequenoPaginaHome'
        }
    }

    const votoEsquerdo = () => {
        setTimeSelecionado(1);
        setModal(true);
    }

    const votoDireito = () => {
        setTimeSelecionado(2);
        setModal(true);
    }

    return(
        <>
            <div id='containerPaginaHome'>
                <div id='boxHeaderPaginaHome'>
                    <div id='boxImagemHeaderPaginaHome'>
                        <p id='textoStylePaginaHome'>Brasão da escola</p>
                    </div>
                    <div id='boxTituloHeaderPaginaHome'>
                        <p id='textoStylePaginaHome'>Nome da escola</p>
                    </div>
                </div>
                <div id='boxTimesPaginaHome'>
                    <div id={verificarLadoEsquerdo()} onMouseEnter={() => {setHoverEsquerdo(true); setHoverDireito(false)}}>
                        <div className='boxParteCimaTimePaginaHome'>
                            <p className='nomeTimeStylePaginaHome'>Logo do time 2</p>
                        </div>
                        <div className='boxParteBaixoPaginaHome'>
                            <button className='botaoVotarPaginaHome botaoEsquerdo' onClick={() => votoEsquerdo()}>Votar</button>
                            <p className='nomeTimeStylePaginaHome'>Nome do time 1</p>
                        </div>
                    </div>
                    <div id={verificarLadoDireito()} onMouseEnter={() => {setHoverDireito(true); setHoverEsquerdo(false)}}>
                        <div className='boxParteCimaTimePaginaHome'>
                            <p className='nomeTimeStylePaginaHome'>Logo do time 2</p>
                        </div>
                        <div className='boxParteBaixoPaginaHome'>
                            <button className='botaoVotarPaginaHome botaoDireito' onClick={() => votoDireito()}>Votar</button>
                            <p className='nomeTimeStylePaginaHome'>Nome do time 2</p>
                        </div>
                    </div>
                </div>
            </div>
            {isModal ? 
            <>
                <Modal handleClick={() => fecharModal()} time={timeSelecionado}/>
            </> :
            <>
            </>}
        </>
    );
};