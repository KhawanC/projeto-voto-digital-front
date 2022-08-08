import React, { useEffect, useState } from 'react'
import './style.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { BsX } from 'react-icons/bs'
import { api } from '../../Api/api';
import { ModalEnvio } from '../../Components/ModalEnvio';

export const Confirmacao = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [nomeInput, setNomeInput] = useState('');
    const [matriuclaInput, setMatriculaInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [dadosAluno, setDadosAlunos] = useState();
    const [isLoading, setLoading] = useState(false);
    const [isEnviar, setEnviar] = useState(false);
    const [isError, setError] = useState(false);
    const [isDadosAchados, setDadosAchados] = useState(false);
    const [isCheck, setCheck] = useState(false);

    const recuperarDados = async() => {
        setLoading(true);
        setError(false);
        setTimeout(async function() {
            try {
                const res = await api.get(`/aluno/nome/${nomeInput.toUpperCase()}`);
                const res2 = await api.get(`/aluno/matricula/${matriuclaInput}`);
                console.log(res.data)
                console.log(res2.data)
                if(res.data.nome !== res2.data.nome || res.data.matricula !== res2.data.matricula) {
                    setDadosAchados(false);
                    setError(true);
                    setErrorMessage('Os dados de nome e matricula não coincidem!');
                    setDadosAlunos({});
                } else {
                    setDadosAlunos({
                        nome: res.data.nome,
                        matricula: res.data.matricula,
                        votacao: location.state === 1 ? 'Time 1' : 'Time 2'
                    })
                    setDadosAchados(true);
                }
                setLoading(false);
            } catch (error) {
                setErrorMessage('Não encontramos suas informações!');
                setDadosAlunos({});
                setDadosAchados(false);
                setError(true);
                setLoading(false);
            }
        }, 1000)
    }

    const handleCheck = () => {
        setCheck(!isCheck);
    }

    const fecharModalConfirmar = () => {
        setEnviar(false);
    }

    useEffect(() => {
        if(location.state === null || location.state === undefined || location.state === '') {
            navigate('/');
        }
        if(location.state === 1){
            setDadosAlunos({
                nome: '',
                cpf: '',
                matricula: '',
                votacao: 'Time 1'
            });
        }
        if(location.state === 2){
            setDadosAlunos({
                nome: '',
                cpf: '',
                matricula: '',
                votacao: 'Time 2'
            });
        }
    }, [])

    return(
        <div id='containerPaginaConfirmacao'>
            <div id='containerFormularioPaginaConfirmacao'>
                <div id='boxTextoPaginaConfirmacao'>
                    <p id='tituloStylePaginaConfirmacao'>Confirme seu voto</p>
                </div>
                <div id='boxFormularioPaginaConfirmacao'>
                    <div id='boxEsquerdaFormularioPaginaConfirmacao'>
                        <div id='boxTituloFormularioPaginaConfirmacao'>
                            <p id='subTituloStyleFormularioPaginaConfirmacao'>Buscar dados:</p>
                        </div>
                        <div id='boxFormularioBotaoPaginaConfirmacao'>
                            <span id='inputTextoStylePaginConfirmacao'>Nome Completo: </span> <input id='inputStylePaginaConfirmacao' value={nomeInput} onChange={e => setNomeInput(t => e.target.value)}/>
                            <span id='inputTextoStylePaginConfirmacao'>Matricula: </span> <input id='inputStylePaginaConfirmacao' value={matriuclaInput} onChange={e => setMatriculaInput(t => e.target.value)}/>
                            {isLoading ?
                            <>
                                <div className="lds-ripple2"><div></div><div></div></div>
                            </> :
                            <>
                                <button id='botaoStylePaginaConfirmacao' onClick={() => recuperarDados()}>Buscar</button>
                            </>}
                        </div>
                    </div>
                    <div id='boxDireitaFormularioPaginaConfirmacao'>
                        <table id='tabelaFormularioPaginaConfirmacao'>
                            <tbody>
                                <tr>
                                    <th>Nome</th>
                                    <th id='valorDadosTabelaFormularioPaginaConfirmacao'>{dadosAluno?.nome}</th>
                                </tr>
                                <tr>
                                    <th>Matricula</th>
                                    <th id='valorDadosTabelaFormularioPaginaConfirmacao'>{dadosAluno?.matricula}</th>
                                </tr>
                                <tr>
                                    <th>Chapa</th>
                                    <th id='valorDadosTabelaFormularioPaginaConfirmacao'>{dadosAluno?.votacao}</th>
                                </tr>
                            </tbody>
                        </table>
                        {isError ? 
                            <div id='errorMensagemPaginaConfirmacao'>
                                <BsX size={16} color={'red'}/><p>{errorMessage}</p>
                            </div> :
                            <>
                            </>}
                        {isDadosAchados ? 
                        <div id='boxCheckboxPaginaConfirmação'>
                            <input type="checkbox" name="vehicle1" checked={isCheck} onChange={handleCheck}></input>
                            <label htmlFor="vehicle1">Confio no uso desse sistema para a validação do meu voto no dia das eleições escolares</label>
                        </div> :
                        <>

                        </>}
                    </div>
                </div>
                <div id='boxBotaoPaginaConfirmacao'>
                    <button id='botaoStyleModal' onClick={() => navigate('/')}>Cancelar</button>
                    <button id='botaoStyleModal' onClick={() => setEnviar(true)} disabled={isCheck === true && isDadosAchados === true ? false : true}>Enviar</button>
                </div>
            </div>
            {isEnviar ?
            <>
                <ModalEnvio dados={dadosAluno} handleClick={() => fecharModalConfirmar()}/>
            </> :
            <>
            </>}
        </div>
    );
};