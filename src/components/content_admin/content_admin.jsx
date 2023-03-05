import React from "react";
import "./content_admin.styles.css";
import ShowTrabajadores from "../showTrabajadores/showTrabajadores";
import { Link, useNavigate } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
const Content = ()=>{
    const navigate = useNavigate();
    return(
            <Grid container sx={{width:"90%",margin:"0px auto",display:"flex",marginBottom:"10px"}}>
                <Grid className="box">
                    <Typography sx={{fontSize:{
                        xs: '1.3rem', sm: '2rem' 
                    },marginRight:"10px",marginBottom:"7px"}} >Listado de trabajadores</Typography>
                    <Button onClick={()=> navigate("/registro")} variant="contained">
                        Añadir Trabajador
                    </Button>
                </Grid>

            <ShowTrabajadores/>
            </Grid>
    )
};

export default Content;