import React, { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { CircularProgress, Grid, Tooltip } from "@mui/material";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from "@mui/material/Table";
import Paper from '@mui/material/Paper';
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
            <TableContainer component={Paper}>
            <Table stickyHeader sx={{ minWidth: 650,maxHeight:300 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell >Nombre</TableCell>
                    <TableCell >Apellido</TableCell>
                    <TableCell>Correo</TableCell>
                    <TableCell>Teléfono</TableCell>
                    <TableCell>Acciones</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {
                      data.map((trabajador,idx)=>{
                         return(
                            <TableRow key={idx}>
                                <TableCell>{trabajador.id}</TableCell>
                                <TableCell>{trabajador.nombre}</TableCell>
                                <TableCell>{trabajador.apellido}</TableCell>
                                <TableCell>{trabajador.correo}</TableCell>
                                <TableCell>{trabajador.telefono}</TableCell>
                                <TableCell>
                                    <Tooltip title="Modificar trabajador" >
                                        <EditIcon className="iconn" onClick={()=> navigate(`/modificar/${trabajador.id}`) } />
                                    </Tooltip>
                                    <Tooltip title="Eliminar trabajador">
                                        <DeleteIcon className="iconn" onClick={()=> deleteTrabajador(trabajador.id) } />
                                    </Tooltip>
                                </TableCell>
                           </TableRow>
                         )
                      })
                    }
                </TableBody>
            </Table>
            </TableContainer>
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