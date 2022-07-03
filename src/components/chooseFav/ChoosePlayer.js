import React from 'react'
import { TextField } from '@mui/material'

export default function ChoosePlayer() {
  return (
    <div className="d-flex flex-column justify-content-center align-item-center w-60">
        <h5 className="my-3">Enter your favourite Player</h5>
        <TextField sx={{mb: 3}} id="outlined-basic" label="Outlined" variant="outlined" />
    </div>
  )
}
