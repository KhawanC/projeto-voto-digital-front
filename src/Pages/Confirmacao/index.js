import React, { useEffect, useState } from 'react'
import './style.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../Api/api';

export const Confirmacao = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [nomeInput, setNomeInput] = useState('');
    const [dadosAluno, setDadosAlunos] = useState();
    const [isLoading, setLoading] = useState();
    const [isDadosAchados, setDadosAchados] = useState(false);

    const recuperarDados = async() => {
        try {
            console.log('cliquei');
            const res = await api.get(`/aluno/${nomeInput}`);
            setDadosAlunos({
                nome: res.data.nome,
                cpf: res.data.cpf,
                matricula: res.data.matricula,
                votacao: 'Time 1'
            });
            console.log(res);
        } catch(error) {
            console.log(error);
        }
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

    useEffect(() => {
    }, [dadosAluno])

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
                            <span id='inputTextoStylePaginConfirmacao'>Nome Completo: <input id='inputStylePaginaConfirmacao' value={nomeInput} onChange={e => setNomeInput(t => e.target.value)}/></span>
                            <button id='botaoStyleModal' onClick={() => recuperarDados()}>Buscar</button>
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
                                    <th>CPF</th>
                                    <th id='valorDadosTabelaFormularioPaginaConfirmacao'>{dadosAluno?.cpf}</th>
                                </tr>
                                <tr>
                                    <th>Matricula</th>
                                    <th id='valorDadosTabelaFormularioPaginaConfirmacao'>{dadosAluno?.nome}</th>
                                </tr>
                                <tr>
                                    <th>Votação</th>
                                    <th id='valorDadosTabelaFormularioPaginaConfirmacao'>{dadosAluno?.votacao}</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id='boxBotaoPaginaConfirmacao'>
                    <button id='botaoStyleModal' onClick={() => navigate('/')}>Cancelar</button>
                    <button id='botaoStyleModal'>Confirmar</button>
                </div>
            </div>
        </div>
    );
};