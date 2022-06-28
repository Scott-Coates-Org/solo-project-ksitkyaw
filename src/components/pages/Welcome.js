import React from 'react'
import FavouritesCard from 'components/card/Favourites';
import LeaguesCard from 'components/card/TopLeagues';
import Navbar from 'components/navbar/Navbar';
import { useHistory, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Welcome() {
  return (
    <Box sx={{ display: 'flex' }}>
        <Navbar/>
        <Box component="div" sx={{width: "100%", p: 3 }}>
            <Toolbar />
            
            <Box sx={{float: "right",px: 5, width: "70%"}} component="section">
              <Typography variant="h2" sx={{ fontWeight: 700, color: 'maroon', my: "100px"}}>
                  WELCOME to the Match Chat
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'grey', my: 5}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet nulla id nisi scelerisque, vitae vulputate ex gravida.
              Fusce eget lectus sit amet massa gravida dignissim sed non risus. Nullam bibendum dui tortor.
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 700, my: 5}}>
                  Don't have an account yet?<Link to="/login">Create a new account</Link><br/>
                  Have an account already?<Link to="/login">Sign in</Link>

              </Typography>
            </Box>
            <Box component="div" sx={{ width: "30%" }}>
              <FavouritesCard/>
              <LeaguesCard/>
            </Box>
            

        </Box>
    </Box>

    
  )
}
