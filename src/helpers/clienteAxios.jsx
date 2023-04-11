
import axios from "axios";

const ClienteAxios = axios.create({
    baseURL:"https://nombrada.intra.cl/api"
})

export default ClienteAxios;