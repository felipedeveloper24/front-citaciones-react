import React, { useEffect, useState } from "react";
import "./content_citar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Content_citar = ({id})=>{
    const BASE_API = "http://localhost:8000/api";

    const [trabajador, setTrabajador] = useState({});
    const [turnos, setTurnos] = useState([]);
    const [id_turno, setId] = useState(null);
    const [fecha, setFecha] = useState("")
    const [fecha_actuall,setFecha_actual] = useState("");
    const [nombre_turno, setNombreTurno] = useState("");
    const navigate = useNavigate();
    const Token = "EAAMcDWqtzsMBAC6dr8F9M3ZCsl2gePjxKUXGSjTZC2oYH9ZBuIxsecEJ0AZB9QUn8HZCufQ1n2yjnW7ZCX7Qvw3w7ZC4B448HHDrSsCGDMARavrKOWTfMewbymsketBaiR6ohJB41jwQzze3alxWFqAlVveJxZAZBz3DEsueWrADNrev45O7Ju44B";
    const API_WTSP = `https://graph.facebook.com/v14.0/103545679233064/messages`;
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
        let confirmar = confirm("¿Estás seguro de los datos?");

        if(confirmar){
            //getNameTurno(id);
            const data = {
                rut: rut,
                nombre:nombre,
                apellido:apellido,
                correo:correo,
                telefono: telefono,
                id_estado: 1
            }
           
            //DEJAMOS ACTIVA LA AUTORIZACION POR TOKEN
            const config = {
                headers:{
                "Authorization": `Bearer ${Token}`
                }
            }
            
            getNameTurno(id_turno);
            //DATA PARA CONECTARSE A API DE WTSP
            const body = {
                messaging_product: "whatsapp",
                to: "56"+telefono,
                type: "template",
                template: {
                    name: "citacion_nombre_turno",
                    language: {
                        code: "es_AR"
                    },
                    components:[
                        {
                            type: "body",
                            parameters:[
                                {
                                    type: "text",
                                    text: `${nombre} ${apellido}`
                                }
                                ,
                                {
                                    type: "text",
                                    text: `${nombre_turno}`
                                },
                                {
                                    type: "text",
                                    text: `${formato(fecha)}`
                                }
                                
                                
                            ]
                        }
                ]
                }
            }
            //Se envía petición a la api de wtsp
            const response = await axios.post(API_WTSP,body,config)
            
            console.log(response);
            //Se actualiza el estado del trabajador
            
            await axios.put(`${BASE_API}/trabajador/${id}`,data);
            
            const data2 = {
                id_trabajador: id,
                fecha_citacion: fecha,
                id_turno: id_turno
            }

            //Hace una petición para registrar la citación del trabajador
             await axios.post(`${BASE_API}/citacion`, data2)

            navigate("/citaciones");
        }

    }

    //Petición para obtener la data de un trabajador en específico
    const getDataTrabajador = async()=>{
        const response = await axios.get(`${BASE_API}/trabajador/${id}`);
   
        setTrabajador(response.data)
    };

    //Petición para obtener todos los turnos

    const getTurnos = async ()=>{
        const response2 = await axios.get("http://localhost:8000/api/turnos");
        setTurnos(response2.data)
    }

    const getNameTurno = async (id) =>{
         const response = await axios.get(`http://localhost:8000/api/turno/${id}`);
          const turno = response.data.nombre_turno
          setNombreTurno(turno);
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