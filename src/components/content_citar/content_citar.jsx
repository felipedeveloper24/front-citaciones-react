import React, { useEffect, useState } from "react";
import "./content_citar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Card, FormControl, Grid, InputLabel, MenuItem, Select, Typography, TextField, Button} from "@mui/material";
import Swal from "sweetalert2";

const Content_citar = ({id})=>{
    const BASE_API = "https://intra-atrasos.cl/api";
    const [trabajador, setTrabajador] = useState({});
    const [turnos, setTurnos] = useState([]);
    const [id_turno, setId] = useState(null);
    const [fecha, setFecha] = useState("");
    const defaultOpcion = ""
    const [fecha_actuall,setFecha_actual] = useState("");

    const {handleSubmit,formState:{errors},data,register} = useForm();
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

    const citar = async (data)=>{
        console.log(data);
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
        let names_turno = turnos.filter((item)=> item.id==data.turno );
        
        const data_general = {
            id_trabajador: trabajador.id,
            rut: trabajador.rut,
            nombre:trabajador.nombre,
            apellido:trabajador.apellido,
            correo:trabajador.correo,
            telefono: trabajador.telefono,
            id_estado: 1,
            turno: names_turno[0].turno,
            id_turno: data.turno,
            fecha: formato(data.fecha),
            fecha_citacion: data.fecha,
        }
   
       

        Swal.fire({
            title: '¿Estás seguro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Citar',
            cancelButtonText:"Cancelar"
          }).then(async(result)  =>  {
            if (result.isConfirmed) {
            const response = await axios.post(`${BASE_API}/mensaje`,data_general);
              if(response.data[1]){
                    Swal.fire({
                        title:"Citado",
                        text:"El trabajador ha sido citado correctamente",
                        icon:"success",
                        confirmButtonText:"Aceptar"
                    })
                    setTimeout(()=>{
                        navigate("/citaciones");
                        window.location.reload();
                    },2000)
              }else{
                Swal.fire({
                    title:"Error",
                    text:"Ha ocurrido un error al citar trabajador",
                    icon:"error",
                    confirmButtonText:"Aceptar"
                })
              }
               
            }
          });

   
        /*
            //Enviamos toda la data al backend de laravel
          
            console.log(response.data);
            //console.log(response.data[0].messages[0].id);
            navigate("/citaciones");
            */
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
        
        <Grid sx={{width:"80%",margin:"0px auto"}}>
            <Typography sx={{
                    fontSize:{
                        xs: '1.2rem', sm: '2rem' 
                    },textAlign:"center",marginTop:"10px",marginBottom:"15px"
                }} > Trabajador seleccionado: {trabajador.nombre} {trabajador.apellido}</Typography>
            <Card sx={{width:"85%",margin:"0px auto",minHeight:"300px",
                        padding:"15px"}}>
            <form  style={{margin:"0px auto",marginLeft:"10px",display:"flex",marginTop:"10px",alignItems:"center",flexWrap:"wrap"}} onSubmit ={handleSubmit(citar)} >
                <Grid container spacing={2} sx={{display:"flex",justifyContent:"center"}}>
                    <Grid item xs={11} xl={10} lg={10} md={10} sm={10} sx={{marginBottom:"10px"}}>
                         <FormControl  fullWidth>
                             <InputLabel id="demo-simple-select-label">Turnos</InputLabel>
                             <Select  labelId="demo-simple-select-label" {...register("turno")}  defaultValue={defaultOpcion}>
                             <MenuItem value={defaultOpcion}>Selecciona una opción</MenuItem>
                                {turnos.map((turno,index)=>{
                                    return(
                                        <MenuItem key={index} value={turno.id}>{turno.nombre_turno} {turno.inicio_turno} - {turno.fin_turno}  </MenuItem>
                                    )
                                })
                             }
                             </Select>
                         </FormControl>
                     </Grid>
                     <Grid item xs={11} xl={10} lg={10} md={10} sm={10} sx={{marginBottom:"20px"}}>
                           <TextField  helperText="Seleccione una fecha" type="date" 
                           {...register("fecha")}
                           fullWidth/>
                     </Grid>
                     <Grid sx={{width:"75%",margin:"0px auto",display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <Button type="submit" variant="contained">Citar trabajador</Button>
                     </Grid>
                </Grid>
            </form>
            </Card>
        </Grid>
    )
};

export default Content_citar;