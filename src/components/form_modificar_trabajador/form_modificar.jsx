import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { useForm,Controller } from "react-hook-form";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
const Form_modificar = ({id})=>{
    const [propiedad,setPropiedad] = useState("");
    const BASE_API = "https://intra-atrasos.cl/api";
    const {register,handleSubmit,control} = useForm();
    const [rut,setRut] = useState({rut: ""});
    const [nombre,setNombre] = useState({nombre:"" });
    const [apellido,setApellido] = useState({apellido:""});
    const [correo, setCorreo] = useState({correo:""});
    const [telefono,setTelefono] = useState({telefono:""});
    const navigate = useNavigate();

    const {data,status,refetch} = useQuery("trabajdor", async()=>{
        const response = await axios.get(`${BASE_API}/trabajador/${id}`);
        return response.data;
    })


    const update = async(data)=>{
        console.log(data);
        Swal.fire({
            title: '¿Estás seguro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, actualiza',
            cancelButtonText:"Cancelar"
          }).then(async(result)  =>  {
            if (result.isConfirmed) {
              // La función de callback se ejecutará si el usuario hace clic en "Aceptar"
              const info = {
                rut:data.rut,
                nombre:data.nombre,
                apellido:data.apellido,
                correo:data.correo,
                telefono:data.telefono,
                id_estado: 2,
              
            }
            const response2 = await axios.put(`${BASE_API}/trabajador/${id}`,info);
              if(response2.status===200){
             
                    Swal.fire({
                        title:"Actualizado",
                        text:"El trabajador ha sido actualizado correctamente",
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

    if(status ==="success"){
  
    return (
        <Card sx={{width:"90%",margin:"0px auto",padding:"20px"}}>
            <Typography sx={{ fontSize:{
                        xs: '1rem', sm: '2rem' 
                    }}} >Trabajador seleccionado: {data.nombre} {data.apellido}</Typography>
            <form onSubmit={handleSubmit(update)}  >
                <Grid container spacing={2} sx={{marginTop:"10px"}}>
                    <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                        <Controller name="rut" control={control}  
                        
                            render={({field})=>(
                                <TextField {...field} label="Rut" value={data.rut} {...register("rut",{required:true})} fullWidth/>
                            )}
                        >
                        </Controller>
                    </Grid>
                    <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                        <Controller name="nombre" control={control} 
                            render={({field})=>(
                                <TextField {...field} value={data.nombre} label="Nombre" {...register("nombre",{required:true})} fullWidth/>
                            )}
                        >
                        </Controller>
                    </Grid>
                    <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                        <Controller name="apellido" control={control} 
                            render={({field})=>(
                                <TextField {...field} value={data.apellido}  label="Apellido" {...register("apellido",{required:true})} fullWidth/>
                            )}
                        >
                        </Controller>
                    </Grid>
                    <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                        <Controller name="correo" control={control}  
                            render={({field})=>(
                                <TextField  {...field} label="Correo" value={data.correo} {...register("correo",{required:true})} fullWidth/>
                            )}
                        >
                        </Controller>
                    </Grid>
                    <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                        <Controller name="telefono" control={control}  
                                render={({field})=>(
                                    <TextField {...field} value={data.telefono} label="Teléfono" {...register("Teléfono",{required:true})} fullWidth/>
                                )}
                            >
                            </Controller>
                    </Grid>
                    <Grid sx={{width:"70%",margin:"0px auto",marginTop:"15px",display:"flex",justifyContent:"center"}}>
                            <Button sx={{width:"70%"}} type="submit" variant="contained">Enviar Datos</Button>
                        </Grid>
                    
                </Grid>
            </form>
        </Card>
    )
    }

};

export default Form_modificar;