import axios from "axios";
import React from "react";
import "./content.styles.css";
import { Button, CircularProgress,Tooltip,Grid, Typography, Alert} from "@mui/material";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from "@mui/material/Table";
import Paper from '@mui/material/Paper';
import { History, Work } from "@mui/icons-material";
import ClienteAxios from "../../helpers/clienteAxios";

const ContentCitaciones = ()=>{

    const {data,status} = useQuery("trabajadores",async()=>{
        //const response = await axios.get(`${BASE_API}/trabajadores`);
        const response = await ClienteAxios.get("/trabajadores");
        console.log(response.data);
        return response.data;
    })
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
    if(status==="success" && data.length > 0){
        return (
            <Grid sx={{width:"90%",margin:"0px auto",marginTop:"15px"}}>
                <Typography variant="h5"sx={{textAlign:"center",padding:"15px"}}>Listado de trabajadores a citar</Typography>
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                                        <Tooltip title="Citar trabajador">
                                            <Link  to={`/citar/${trabajador.id}`}><Work/></Link>  
                                        </Tooltip>
                                        <Tooltip title="Historial de citaciones">
                                            <Link to={`/historial/${trabajador.id}`} ><History/></Link>
                                        </Tooltip>
                                    </TableCell>
                            </TableRow>
                            )
                        })
                        }
                    </TableBody>
                </Table>
                </TableContainer>
            </Grid>
        );
    }
    if(status==="success" && data.length == 0){
        return (
            <Grid sx={{width:"90%",margin:"0px auto",marginTop:"15px"}}>
                <Typography variant="h5"sx={{textAlign:"center",padding:"15px"}}>Listado de trabajadores a citar</Typography>
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                    
                </Table>
                
                <Alert severity="error" sx={{margin:"0px auto",marginTop:"10px",marginBottom:"10px",width:"60%"}}>No hay trabajadores registrados</Alert>
                </TableContainer>
            </Grid>
        );
    }

};

export default ContentCitaciones;