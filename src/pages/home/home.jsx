import React from "react";
import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";
import logo from "../../assets/intra.jpg";
import { Grid } from "@mui/material";
const Home = ()=>{
    return(
        <Grid container sx={{width:"100%",display:"flex",flexDirection:"column",height:"100vh"}}>
            <Header/>
            <Grid sx={{width:"75%",display:"flex",justifyContent:"center",margin:"0px auto",marginTop:"100px",alignItems:"center"}}>
                <img src={logo} style={{width:"80%"}} />
            </Grid>
        
        </Grid>
        
    );
};

export default Home;