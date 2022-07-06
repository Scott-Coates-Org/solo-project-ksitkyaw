import { Box, Paper } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useWizard } from 'react-use-wizard'
import { useAuth } from 'components/user/auth'
import firebaseClient from 'firebase/client'
import { useState } from 'react'

export default function ChooseLeague() {
  const { handleStep } = useWizard();
  const { user } = useAuth();
  const [league, setLeague] = useState('');

  const { data, isLoaded, hasErrors } = useSelector((state) => state.league)

  handleStep(async () => {
    const doc = await firebaseClient.firestore().collection('users').doc(user.uid);
    return doc.update({
      "favourite.leagues": league
    })
  })

  return (
    <Box sx={{display: "flex", flexDirection: "column", justifyContent: 'center'}}>
        {data.map((league) => {
          return (
          <Paper key={league.id} elevation={3} sx={{px: 5, py: 3, mb: 2, cursor: "pointer"}} onClick={() => setLeague(league.name)}>{league.name}</Paper>
        )})}
        
    </Box>
  )
}
