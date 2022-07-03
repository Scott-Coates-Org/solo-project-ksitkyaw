import { Box, Paper } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

export default function ChooseLeague() {

  const { data, isLoaded, hasErrors } = useSelector((state) => state.league)
  console.log(data)

  return (
    <Box sx={{display: "flex", flexDirection: "column", justifyContent: 'center'}}>
        {data.map((league) => {
          return (
          <Paper key={league.id} elevation={3} sx={{px: 5, py: 3, mb: 2, cursor: "pointer"}} onClick={() => console.log("clicked")}>{league.name}</Paper>
        )})}
        
    </Box>
  )
}
