import React from 'react';
import { Routes, Route, useLocation} from 'react-router-dom';
import { Confirmacao } from '../Pages/Confirmacao';
import { Home } from '../Pages/Home';
import { ObrigadoPorVotar } from '../Pages/ObrigadoPorVotar';

export const Router = () => {
    const location = useLocation();
    return(
        <Routes location={location} key={location.pathname}>
            <Route path='/' element={<Home/>}/>
            <Route path='/voto' element={<Confirmacao/>}/>
            <Route path='/obrigado-por-votar' element={<ObrigadoPorVotar/>}/>
        </Routes>
    );
};