import { Box, Button } from '@mui/material'
import React from 'react'
import { Wizard } from 'react-use-wizard'
import ChooseLeague from './ChooseLeague'
import ChoosePlayer from './ChoosePlayer'
import ChooseTeam from './ChooseTeam'
import Footer from './Footer'

const Header = () => <h3>Choose your favourites</h3>


export default function Choose() {
  return (
    <Box sx={{
        width: "50%",
        height: "50%",
        margin: "auto auto"
    }}>
        <Wizard header={<Header/>} footer={<Footer/>}>
            <ChooseLeague/>
            <ChooseTeam/>
            <ChoosePlayer/>

        </Wizard>
    </Box>
  )
}
