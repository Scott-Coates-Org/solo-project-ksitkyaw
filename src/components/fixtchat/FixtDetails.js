import { Avatar, Box, Button, ButtonGroup, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Lineup from './Lineup'
import MatchInfo from './MatchInfo'
import MatchFacts from './MatchInfo'
import Stats from './Stats'
import { firebase } from 'firebase/client'
import { useAuth } from 'components/user/auth'
import { getchatFixture } from 'redux/fixturedata'
import { useDispatch, useSelector } from 'react-redux'
import useSWR from 'swr'
import Result from 'components/fixture/Result'
import { fetchLogo, getLogo } from 'redux/team'

export default function FixtDetails({ id }) {
  const dispatch = useDispatch()
  const [info, setInfo] = useState('MatchInfo')
  const {fixtures, chatFixture} = useSelector(state => state.fixture)
  const {logo, isLoaded} = useSelector(state => state.team)
  const { user } = useAuth()
  // console.log(logo)
  // console.log('id', id)
  // console.log(chatFixture)
  const localId = chatFixture.localteam_id;
  const visitorId = chatFixture.visitorteam_id;
  
  useEffect(() => {
    fetch(`https://soccer.sportmonks.com/api/v2.0/fixtures/${id}?api_token=${process.env.REACT_APP_FOOTBALL_API_KEY}&include=events,lineup,stats,`)
    .then(res => res.json())
    .then(result => {
      // console.log(result.data?.time.status)
      if (result.data?.time.status == 'LIVE') {
        let interval = setInterval(async () => {
          const detail = await fetch(`https://soccer.sportmonks.com/api/v2.0/fixtures/${id}?api_token=${process.env.REACT_APP_FOOTBALL_API_KEY}&include=events,lineup,stats,`)
          const detaildata = await detail.json()
          dispatch(getchatFixture(detaildata))
          // console.log('detaildata', detaildata)
          // console.log(chatFixture)
          if (detaildata.data?.time.status != 'LIVE'){
            clearInterval(interval)
          }
        }, 60000)
        dispatch(fetchLogo({localId: chatFixture.localteam_id, visitorId: chatFixture.visitorteam_id}))
      
      } else {
        dispatch(getchatFixture(result.data))
          
          {localId && visitorId && firebase.firestore().collection('teams').where('team_id', "in", [localId, visitorId]).get()
          .then(collections => {
            const bothteam = collections.docs.map(collection => collection.data())
            dispatch(getLogo(bothteam))
          })}
        
      }
    })
  }, [localId, visitorId])
  console.log(typeof chatFixture.localteam_id, typeof chatFixture.visitorteam_id)
  // console.log(() => logoFetch(chatFixture.localteam_id))

  const handleHomeClick = () => {
    const db= firebase.firestore().collection('fixtures').doc(id);
    db.get()
    .then(collection => {
      const mydoc = collection.data();
      if (mydoc == undefined) {
        db.set({
                id,
                h_supporter: [user.uid],
                a_supporter: [],
                watching: []
              });
      }
      else if (!mydoc.a_supporter.includes(user.uid)) {
        db.update({
          h_supporter: firebase.firestore.FieldValue.arrayUnion(user.uid)
        })
      } else {
        alert('Rival fans not allowed to support')
      }
      
    })
  }
  const handleAwayClick = () => {
    const db= firebase.firestore().collection('fixtures').doc(id);
    db.get()
    .then(collection => {
      const mydoc = collection.data();
      if (mydoc == undefined) {
        db.set({
                id,
                h_supporter: [],
                a_supporter: [user.uid],
                watching: []
              });
      }
      else if (!mydoc.h_supporter.includes(user.uid)) {
        db.update({
          a_supporter: firebase.firestore.FieldValue.arrayUnion(user.uid)
        })
      } else {
        alert('Rival fans not allowed to support')
      }
      
    })
    
  }

  const handleWatch = () => {
    const db= firebase.firestore().collection('fixtures').doc(id);
    db.get()
    .then(collection => {
      const mydoc = collection.data();
      if (mydoc == undefined) {
        db.set({
                id,
                h_supporter: [],
                a_supporter: [],
                watching: [user.uid]
              });
      }
      else {
        db.update({
          watching: firebase.firestore.FieldValue.arrayUnion(user.uid)
        })
      }
    })
  }


  return (
    <>
      {logo != [] &&
        <>
          <Paper sx={{display: "flex", justifyContent: "space-around", alignItems: 'center', width: '100%', p: 3 }}>
            <Box sx={{width: '30%',display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center'}}>
              <Avatar sx={{width: '100%', height: 150, mb: 2}} alt="Remy Sharp" src={logo[0]?.logo} />
              <span style={{fontSize: '1.5rem'}}>{logo[0]?.name}</span>
              <Button sx={{mt:2}} variant="contained" onClick={handleHomeClick}>Support</Button>
            </Box>
            <Box sx={{width: '30%',display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center'}}>
              <span style={{fontSize: '2.5rem', whiteSpace:'nowrap'}} className='mb-5'>Vs</span>
              
              {chatFixture.time?.status == "FT" ? 
              <Result round={chatFixture}/> : 
              <Button variant="outlined" color='secondary' onClick={handleWatch}>Watch</Button>}
              
            </Box>
            <Box sx={{width: '30%',display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center'}}>
              <Avatar sx={{width: '100%', height: 150, mb: 2}} alt="Remy Sharp" src={logo[1]?.logo} />
              <span style={{fontSize: '1.5rem', whiteSpace:'nowrap'}}>{logo[1]?.name}</span>
              <Button sx={{mt:2}} variant="contained" onClick={handleAwayClick}>Support</Button>
            </Box>
          </Paper>
          <ButtonGroup sx={{display: 'block', textAlign: 'center', mx: 'auto'}} variant="text" aria-label="text button group">
            <Button onClick={() => setInfo('MatchInfo')}>Match Info</Button>
            <Button onClick={() => setInfo('LineUp')}>Line up</Button>
            <Button onClick={() => setInfo('Stats')}>Stats</Button>
          </ButtonGroup>
          {info == 'MatchInfo' && <MatchInfo/>}
          {info == 'LineUp' && <Lineup/>}
          {info == 'Stats' && <Stats/>}
        </>
        }
    </>

  )
}
