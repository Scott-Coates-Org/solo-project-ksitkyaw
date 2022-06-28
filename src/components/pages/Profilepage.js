import React from 'react'
import { Box, Toolbar, Typography} from '@mui/material'
import Navbar from 'components/navbar/Navbar'
import FavouritesCard from 'components/card/Favourites'
import { Button, ButtonGroup } from '@mui/material'
import Profile from 'components/profile/Profile'
import TopFixtures from 'components/card/TopFixtures'


export default function Profilepage() {
  return (
    <Box sx={{ display: 'flex' }}>
        <Navbar/>
        <Box component="div" sx={{width: "100%", p: 3 }}>
            <Toolbar />
            <Box sx={{float: "right",px: 5, width: "70%", display: "flex", alignItems: "center", flexDirection: "column"}} component="section">
            <Profile/>
            </Box>
            
            <Box component="div" sx={{ width: "30%" }}>
              <FavouritesCard/>
              <TopFixtures/>
            </Box>
            

        </Box>
    </Box>
  )
}
