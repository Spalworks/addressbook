import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Logo from "../assets/images/logo.png";
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

export default function DenseAppBar() {
  return (
    <Box sx={{ flexGrow: 1, margin:'-0.5rem -0.5rem 2rem -0.5rem' }}>
      <AppBar position="static" sx={{padding:'0.2rem'}}>
        <Toolbar variant="dense">
          <img src={Logo} alt=""></img>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ dispaly: "flex", flexDirection: "column", marginLeft: "1rem", padding:"0.3rem"}}>
            <div>ADDRESS</div>
            <div>BOOK</div>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
