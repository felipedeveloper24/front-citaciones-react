
import axios from "axios";

const ClienteAxios = axios.create({
    baseURL:"https://intra-atrasos.cl/api"
})

export default ClienteAxios;