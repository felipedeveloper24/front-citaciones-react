import React, { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { CircularProgress, Grid } from "@mui/material";
import Swal from "sweetalert2";
const ShowTrabajadores = ()=>{
    const url = "https://intra-atrasos.cl/api/trabajadores";

    const {status,data,error} = useQuery("getTrabajadores", async()=>{
        const response = await axios.get(url);
        console.log(response.data);
        return response.data;
    })

    const BASE_API = "https://intra-atrasos.cl/api/trabajador";

    const navigate = useNavigate();
    
    const deleteTrabajador =  (id)=>{
       // let respuesta = confirm("¿Desea eliminar este usuario?");
       // console.log(respuesta);
       Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, bórralo!',
      }).then(async(result)  =>  {
        if (result.isConfirmed) {
          // La función de callback se ejecutará si el usuario hace clic en "Aceptar"

          const response = await axios.delete(`${BASE_API}/${id}`);
          if(response.status===200){
         
                Swal.fire({
                    title:"Eliminado",
                    text:"El trabajador ha sido eliminado correctamente",
                    icon:"success",
                    confirmButtonText:"Aceptar"
                })
                setTimeout(()=>{
                    navigate("/admin");
                    window.location.reload();
                },2000)
          }else{
            Swal.fire({
                title:"Error",
                text:"Ha ocurrido un error al eliminar el trabajador",
                icon:"error",
                confirmButtonText:"Aceptar"
            })
          }
           
        }
      });
        
       
    }

    if(status==="success"){
        return (
            <table className="table table-hover text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Rut</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((trabajador,index)=>{
                            return(
                                <tr key={index}>
                                <td>{trabajador.id}</td>
                                <td>{trabajador.rut}</td>
                                <td>{trabajador.nombre}</td>
                                <td>{trabajador.apellido}</td>
                                <td>{trabajador.correo}</td>
                                <td>{trabajador.telefono}</td>
                                <td>
                                    <EditIcon className="iconn" onClick={()=> navigate(`/modificar/${trabajador.id}`) } />
                                    <DeleteIcon className="iconn" onClick={()=> deleteTrabajador(trabajador.id) } />
                                </td>
                            </tr>
                            )
                           
                        })
                    }
                  
                </tbody>
            </table>
        );
    }
    if(status ==="error"){
        return (
            <div>
                Error al cargar la información
            </div>
        )
    }
    if(status==="loading"){
        return (
            <Grid sx={{
                width:"80%",
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center"
            }}>
                Cargando datos.....
                <CircularProgress/>

            </Grid>
        )
    }
    
    
    
};

export default ShowTrabajadores;