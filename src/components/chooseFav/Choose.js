import { Box, Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Wizard } from 'react-use-wizard'
import { fetchAllTeams } from 'redux/team'
import ChooseLeague from './ChooseLeague'
import ChoosePlayer from './ChoosePlayer'
import ChooseTeam from './ChooseTeam'
import Footer from './Footer'

const Header = () => <h3>Choose your favourites</h3>


export default function Choose() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchAllTeams());
  // }, [dispatch])

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
