import React from 'react'
import { Box, Paper, Toolbar } from '@mui/material'
import Navbar from 'components/navbar/Navbar'
import FixtDetails from 'components/fixtchat/FixtDetails'
import { useParams } from 'react-router-dom'

export default function FixtChat() {
  const { id } = useParams();

  return (
    <Box sx={{ display: 'flex' }}>
        <Navbar/>
        <Box component="div" sx={{width: "100%", p: 3 }}>
            <Toolbar />
            <Box sx={{float: "right",px: 5, width: "50%"}} component="section">
              <FixtDetails id={id}/>
            </Box>
            <Box component="div" sx={{ width: "50%" }}>
              <Paper>Hello</Paper>
            </Box>
        </Box>
    </Box>
  )
}
