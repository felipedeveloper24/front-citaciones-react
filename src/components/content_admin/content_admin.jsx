import React from "react";
import "./content_admin.styles.css";
import ShowTrabajadores from "../showTrabajadores/showTrabajadores";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
const Content = ()=>{
    return(
            <Grid container sx={{width:"100%",display:"flex"}}>
                <Grid className="box">
                    <h1 className="">Listado de Trabajadores registrados</h1>
                    <Link to="/registro" className="btn btn-primary linkk">Añadir Trabajador</Link>
                </Grid>

            <ShowTrabajadores/>
            </Grid>
    )
};

export default Content;