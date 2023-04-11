import { Anchor } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from "react";
import "./header.styles.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = ()=>{
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const handleToggleMenu = () => {
        setOpen(!open);
      };
    return(
        <Grid container sx={{width:"100%",display:"flex",backgroundColor:"#1e293b",height:"80px",justifyContent:"center", alignItems:"center"}}>
             <Grid sx={{width:"5%",display:"flex",justifyContent:"flex-start"}}>
                <IconButton onClick={handleToggleMenu} sx={{marginLeft:"20px"}}>
                    <MenuIcon style={{color:"white"}} />
                </IconButton>   
             </Grid>
             <Grid sx={{width:"70%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Typography className="titulo" sx={{fontSize:{md:"35px",xl:"30px"},color:"white"}}>Sistema de Nombradas</Typography>
                <Anchor style={{color:"white",marginLeft:"10px"}}  />
            </Grid>
            <Drawer anchor="left" open={open}  width={300} onClose={handleToggleMenu}>
                <List sx={{width:"300px",backgroundColor:"#1f2937",color:"white",height:"100vh" ,display:"flex",flexDirection:"column",alignItems:"center"}} >
                    <ListItem button onClick={handleToggleMenu}>
                    <IconButton  onClick={handleToggleMenu}>
                        <MenuIcon  style={{color:"white"}} />
                    </IconButton>
                    </ListItem>
                    <ListItem button onClick={()=>navigate("/")}>
                        <ListItemText sx={{textAlign:"center"}} primary="Inicio" />
                    </ListItem>
                    <ListItem button onClick={()=>navigate("/admin")}>
                        <ListItemText sx={{textAlign:"center"}} primary="Administración" />
                    </ListItem>
                    <ListItem button onClick={()=>navigate("/citaciones")}>
                        <ListItemText sx={{textAlign:"center"}} primary="Citaciones" />
                    </ListItem>
                </List>
            </Drawer>
        </Grid>
    )
};

export default Header;