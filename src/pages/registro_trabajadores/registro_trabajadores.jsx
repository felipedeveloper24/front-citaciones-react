import React, { useState } from "react";
import "./registro.styles.css";
import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useForm} from "react-hook-form";
import { Alert } from "@mui/material";

const Registro = ()=>{
    const BASE_API = "http://localhost:8000/api";
 
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const store = async(data) =>{
        
        let respuesta = confirm("¿Estás seguro/a de todos los datos?")
        
        if(respuesta){
            const response = await axios.post(`${BASE_API}/trabajador`,{
                rut: data.rut,
                nombre:data.nombre,
                apellido:data.apellido,
                correo:data.correo,
                telefono: data.telefono,
                id_estado: 2
            })
            console.log(response.data);
           
            navigate("/admin");
        }
        
        
    };
    

    return(
        <div className="main-container">
            <Header/>
            <Sidebar/>
            <div className="w-75 mt-5">
                <form className="row form p-3 w-75 m-auto border d-flex" method="POST" onSubmit={handleSubmit(store)} >
                    <h1 className="h1">Registro de trabajador</h1>
                    <div className="col-5 mb-3">
                        <label>Rut</label>
                        <input type="text" placeholder="xx.xxx.xxx-x" className="form-control" onChange={(e)=> setRut(e.target.value)} 
                            {...register("rut",{
                                required: true
                            })}
                        />
                        {errors.rut && <Alert className="mt-2" severity="error">Este campo es requerido</Alert> }
                    </div>
                    <div className="col-5 mb-3">
                        <label>Nombre</label>
                        <input type="text" placeholder="Juan"  className="form-control" 
                            {...register("nombre",{
                                required:true
                            })}
                        />
                        {errors.nombre && <Alert className="mt-2" severity="error">Este campo es requerido</Alert> }
                    </div>
                    <div className="col-5 mb-3">
                        <label>Apellido</label>
                        <input type="text" placeholder="Pérez" className="form-control"
                            {...register("apellido",{
                                required: true,
                            })}
                        />
                        {errors.apellido && <Alert className="mt-2" severity="error">Este campo es requerido</Alert> }

                    </div>
                    <div className="col-5 mb-3">
                        <label>Correo</label>
                        <input type="email" placeholder="juanperez@xxxx" className="form-control" 
                            {...register("correo",{
                                required: true,
                            })}
                        />
                        {errors.correo && <Alert className="mt-2" severity="error">Este campo es requerido</Alert>}
                    </div>
                    <div className="col-5 mb-3">
                        <label>Teléfono</label>
                        <input type="number" placeholder="9xxxxxxxx" className="form-control" 
                            {...register("telefono",{
                                required:true
                            })}
                        />
                        {errors.telefono && <Alert className="mt-2" severity="error">Este campo es requerido</Alert>}
                    </div>
                    <div className="col-5">
                        <input className="w-100 btn btn-primary" type="submit" value="Enviar datos" />
                    </div>
                </form>
            </div>
            
        </div>
    )
}


export default Registro;