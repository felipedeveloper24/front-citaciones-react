import { Alert, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from "@mui/material/Table";
import Paper from '@mui/material/Paper';
const ShowCitaciones = ({id})=>{
    const BASE_API="https://intra-atrasos.cl/api";
    const [citaciones,setCitaciones] = useState([]);
    const [trabajador,setTrabajador] = useState({});
    const [loading,setLoading] = useState(false);
 
    useEffect(()=>{
       getData();
       getDataTrabajador();
    },[]);  
    
    const getData = async ()=>{
        const response = await axios.get(`${BASE_API}/mensajes/${id}`);    
        setCitaciones(response.data);
        console.log(response.data.length);
        setLoading(true);
    }
    const getDataTrabajador = async()=>{
        const response  = await axios.get(`${BASE_API}/trabajador/${id}`);
        setTrabajador(response.data);
    };
    const formato = (texto)=>{
            return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
    }

    if(loading && citaciones.length>0){
        return(
            <Grid container sx={{width:"90%",margin:"0px auto",marginTop:"10px",display:"flex"}}>
                <Grid sx={{width:"75%",margin:"0px auto",marginTop:"15px"}}>
                    <Typography sx={{textAlign:"center",fontSize:{
                            xs: '1rem', sm: '1.8rem' 
                        }}} >Historial de citaciones, Trabajador: {trabajador.nombre} {trabajador.apellido} </Typography>
                </Grid>
                <TableContainer component={Paper} sx={{marginTop:"10px"}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Fecha citación</TableCell>
                            <TableCell >Turno</TableCell>
                            <TableCell>Respuesta</TableCell>
                            <TableCell >Hora envío mensaje</TableCell>
                            <TableCell>Hora respuesta</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{
                    citaciones.map((citacion,index)=>{
                        return(
                            <TableRow key={index}>
                                <TableCell>{formato(citacion.fecha_citacion)}</TableCell>
                                <TableCell>{citacion.turno}</TableCell>
                                <TableCell>{citacion.respuesta}</TableCell>
                                <TableCell>{citacion.created_at}</TableCell>
                                {
                                    citacion.respuesta ==="Sin respuesta" ? <TableCell>-------</TableCell> : <TableCell>{citacion.updated_at}</TableCell>
                                }
                            </TableRow>
                        )
                    })
                }
                    </TableBody>
                </Table>
                </TableContainer>

            </Grid>
            
        )
    }else if(loading && citaciones.length == 0){
  
    return(
            <Grid container sx={{width:"90%",margin:"0px auto",marginTop:"10px",display:"flex"}}>
                <Grid sx={{width:"75%",margin:"0px auto",marginTop:"15px"}}>
                    <Typography sx={{textAlign:"center",fontSize:{
                            xs: '1rem', sm: '1.8rem' 
                        }}} >Historial de citaciones, Trabajador: {trabajador.nombre} {trabajador.apellido} </Typography>
                </Grid>
                <TableContainer component={Paper} sx={{marginTop:"10px"}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Fecha citación</TableCell>
                            <TableCell >Turno</TableCell>
                            <TableCell>Respuesta</TableCell>
                            <TableCell >Hora envío mensaje</TableCell>
                            <TableCell>Hora respuesta</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
                <Alert severity="error" sx={{margin:"0px auto",width:"60%",marginTop:"10px",marginBottom:"10px"}}>No hay citaciones registradas de este trabajador</Alert>
                </TableContainer>
                
            </Grid>
            
        )
    }

}

export default ShowCitaciones