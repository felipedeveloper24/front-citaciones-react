import React, { useState } from "react";
import "./registro.styles.css";
import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useForm} from "react-hook-form";
import { Alert, Box, Button, Card, Grid, TextField, Typography } from "@mui/material";

const Registro = ()=>{
    const BASE_API = "https://intra-atrasos.cl/api";
 
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async(data) =>{
        Swal.fire({
            title: '¿Estás seguro de los datos?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            cancelButtonText:"Cancelar"
          }).then(async(result)  =>  {
            if (result.isConfirmed) {
              // La función de callback se ejecutará si el usuario hace clic en "Aceptar"
              const response = await axios.post(`${BASE_API}/trabajador`,{
                rut: data.rut,
                nombre:data.nombre,
                apellido:data.apellido,
                correo:data.correo,
                telefono: data.telefono,
                id_estado: 2
            })
             console.log(response);
              if(response.status===201){
             
                    Swal.fire({
                        title:"Registrado",
                        text:"El trabajador ha sido registrado correctamente",
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
                    text:"Ha ocurrido un error al registrar trabajador",
                    icon:"error",
                    confirmButtonText:"Aceptar"
                })
              }
               
            }
          });
        
    };

    return(
        <Grid sx={{
            width:"100%",
            display:"flex",
            flexDirection:"column",
        }}>
            <Header/>
            <Grid sx={{
                width:"80%",
                display:"flex",
                flexDirection:"column",
                margin:"0px auto",
                justifyContent:"center",
                alignItems:"center",
                marginTop:"15px"
            }}>
                <Typography sx={{
                    fontSize:{
                        xs: '1rem', sm: '2rem' 
                    }
                }} >Registro de trabajador</Typography>
                <Card sx={{
                        width:"100%",
                        minHeight:"400px",
                        padding:"15px"
                    }}>
                <form onSubmit={handleSubmit(onSubmit)} style={{width:"100%",margin:"0px auto",marginLeft:"10px",display:"flex",marginTop:"10px",alignItems:"center",flexWrap:"wrap"}} method="POST" >
                    <Grid container spacing={2}>
                        <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                            <TextField label="Rut" {...register("rut",{
                                required:"true"
                            })} fullWidth/>
                             {errors.rut && <Alert className="mt-2" severity="error">Este campo es requerido</Alert> }
                        </Grid>
                        <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                            <TextField  label="Nombre" fullWidth {...register("nombre",{
                                required:true
                            })} />
                            {errors.nombre && <Alert className="mt-2" severity="error">Este campo es requerido</Alert> }
                        </Grid>
                        <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                            <TextField  label="Apellido" fullWidth {...register("apellido",{
                                required:true
                            })} />
                            {errors.apellido && <Alert className="mt-2" severity="error">Este campo es requerido</Alert> }
                        </Grid>
                        <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                            <TextField  type="email" label="Correo"
                                 {...register("correo",{
                                    required: true,
                                })}
                            fullWidth/>
                             {errors.correo && <Alert className="mt-2" severity="error">Este campo es requerido</Alert>}
                        </Grid>
                        <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                            <TextField  label="Teléfono"  {...register("telefono",{
                                required:true
                            })} fullWidth/>
                            {errors.telefono && <Alert className="mt-2" severity="error">Este campo es requerido</Alert>}
                        </Grid>
                        
                        <Grid sx={{width:"70%",margin:"0px auto",marginTop:"15px",display:"flex",justifyContent:"center"}}>
                            <Button sx={{width:"70%"}} type="submit" variant="contained">Enviar Datos</Button>
                        </Grid>
                    </Grid>
                </form>
                </Card>
            </Grid>
            
       
        </Grid>
    )
}


export default Registro;