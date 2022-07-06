import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { useWizard } from 'react-use-wizard';
import { useAuth } from 'components/user/auth';
import firebaseClient from 'firebase/client';

export default function ChoosePlayer() {
  const { handleStep } = useWizard();
  const { user } = useAuth();
  const [player, setPlayer] = useState("");

  const handleChange = (e) => {
    setPlayer(e.target.value)
    console.log(player)
  }

  const handleSubmit = (async (e) => {
    e.preventDefault();
    const doc = await firebaseClient.firestore().collection('users').doc(user.uid);
    return doc.update({
      "favourite.players": player
    })
  })

  return (
    <div className="d-flex flex-column justify-content-center align-item-center w-60">
        <h5 className="my-3">Enter your favourite Player</h5>
        <form onSubmit={handleSubmit}>
          <TextField sx={{mb: 3}} id="outlined-basic" label="Outlined" variant="outlined" value={player} onChange={handleChange}/>
          <Button className="ml-2" variant='contained' size='large' type="submit">Add</Button>
        </form>
    </div>
  )
}
