import React, {useEffect} from 'react'
import { Box, Toolbar, Typography} from '@mui/material'
import Navbar from 'components/navbar/Navbar'
import FavouritesCard from 'components/card/Favourites'
import { Button, ButtonGroup } from '@mui/material'
import Profile from 'components/profile/Profile'
import TopFixtures from 'components/card/TopFixtures'
import { useDispatch, useSelector } from 'react-redux'
// import { fetchAllUser } from 'redux/user'
import { fetchAllUserr } from 'redux/myuser'
import { fetchAllTeams } from 'redux/team'


export default function Profilepage() {
  const dispatch = useDispatch();
  const { data, isLoaded, hasErrors } = useSelector(state => state.userr);
  

  useEffect(() => {
    dispatch(fetchAllUserr());
}, [dispatch])

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
