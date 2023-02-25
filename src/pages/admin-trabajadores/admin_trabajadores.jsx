import React from "react";

import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";
import Content from "../../components/content_admin/content_admin";
import { Grid } from "@mui/material";
const Admin = ()=>{
    return(
        <Grid container sx={{width:"100%",display:"flex",flexDirection:"column"}}>
            <Header/>      
            <Content/>
        </Grid>
    
    )
}

export default Admin;