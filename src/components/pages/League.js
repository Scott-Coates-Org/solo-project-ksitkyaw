import React from 'react'
import { Box, Toolbar, Typography} from '@mui/material'
import Navbar from 'components/navbar/Navbar'
import FavouritesCard from 'components/card/Favourites'
import LeaguesCard from 'components/card/TopLeagues'
import Standing from 'components/league/Standing'
import { Button, ButtonGroup } from '@mui/material'
import Profile from 'components/profile/Profile'
import TopFixtures from 'components/card/TopFixtures'


export default function League() {
  return (
    <Box sx={{ display: 'flex' }}>
        <Navbar/>
        <Box component="div" sx={{width: "100%", p: 3 }}>
            <Toolbar />
            
            <Box sx={{float: "right",px: 5, width: "70%", display: "flex", alignItems: "center", flexDirection: "column"}} component="section">
                <Typography variant='h1' sx={{ my: 7, fontWeight: 700, color: "lightgray" }}>Premier League</Typography>
                <ButtonGroup sx={{ mb: 5 }} variant="outlined" aria-label="outlined button group">
                    <Button>Standings</Button>
                    <Button>Fixtures</Button>
                </ButtonGroup>
                {/* <Profile/> */}
                <Standing/>
            </Box>
            <Box component="div" sx={{ width: "30%" }}>
              <FavouritesCard/>
              {/* <TopFixtures/> */}
              <LeaguesCard/>
            </Box>
            

        </Box>
    </Box>
  )
}
