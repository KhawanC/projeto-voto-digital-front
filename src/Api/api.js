import axios from "axios";

export const api = axios.create({
    baseURL: 'https://voto-digital.herokuapp.com/voto_seguro'
});