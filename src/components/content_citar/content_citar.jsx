import React, { useEffect, useState } from "react";
import "./content_citar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Content_citar = ({id})=>{
    const BASE_API = "https://intra-atrasos.cl/api";
    const [trabajador, setTrabajador] = useState({});
    const [turnos, setTurnos] = useState([]);
    const [id_turno, setId] = useState(null);
    const [fecha, setFecha] = useState("")
    const [fecha_actuall,setFecha_actual] = useState("");
    const navigate = useNavigate();

    const formato = (texto)=>{
        return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
    }
    useEffect(()=>{
        getDataTrabajador();
        getTurnos();
        
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear();
        let fecha_actual = `${year}-${day}-${month}`
        fecha_actual = fecha_actual.trim();
    
        setFecha_actual(fecha_actual);
    },[]);

    const citar = async(e,id,rut,nombre,apellido, correo, telefono)=>{
        e.preventDefault();
        const turnos = [
            {
                id:1,
                turno:"Mañana"
            },
            {
                id:2,
                turno:"Tarde"
            },
            {
                id:3,
                turno:"Noche"
            }
        ]
            let names_turno = turnos.filter((item)=> item.id==id_turno );

            const data_general = {
                id_trabajador: id,
                rut: rut,
                nombre:nombre,
                apellido:apellido,
                correo:correo,
                telefono: telefono,
                id_estado: 1,
                turno: names_turno[0].turno,
                id_turno: id_turno,
                fecha: formato(fecha),
                fecha_citacion: fecha,
            }
            //Enviamos toda la data al backend de laravel
            const response = await axios.post(`${BASE_API}/mensaje`,data_general);
            console.log(response.data);
            //console.log(response.data[0].messages[0].id);
            navigate("/citaciones");
    }
    //Petición para obtener la data de un trabajador en específico
    const getDataTrabajador = async()=>{
        const response = await axios.get(`${BASE_API}/trabajador/${id}`);
        setTrabajador(response.data)
    };

    //Petición para obtener todos los turnos

    const getTurnos = async ()=>{
        const response2 = await axios.get("https://intra-atrasos.cl/api/turnos");
        setTurnos(response2.data)
    }
    return(
        <div>
            <h2>Trabajador seleccionado: {trabajador.nombre} {trabajador.apellido} </h2>
            <form className="w-75 m-auto" onSubmit={(e)=> citar(e,trabajador.id,trabajador.rut, trabajador.nombre, trabajador.apellido, trabajador.correo, trabajador.telefono) } >
                <div className="col-12 mb-3">
                    <label>Turno</label>
                    <select onChange={(e)=> setId(e.target.value) } required className="form-control">
                        <option value="">Por favor seleccione un turno</option>
                        {
                            turnos.map((turno,index)=>{
                                return(
                                    <option key={index} value={turno.id}>{turno.nombre_turno} {turno.inicio_turno} - {turno.fin_turno}  </option>
                                )
                            })
                        } 
                    </select>
                </div>
                <div className="col-12">
                    <label>Fecha de citación</label>
                    <input required type="date" min={fecha_actuall} onChange={(e) => setFecha(e.target.value)}  className="form-control" />
                </div>
                <div className="col-10 d-flex justify-content-center mt-3">
                        <button 
                        className="btn btn-primary" 
                        type="submit"
                        >Citar Trabajador</button>
                </div>
            </form>
        </div>
    )
};

export default Content_citar;