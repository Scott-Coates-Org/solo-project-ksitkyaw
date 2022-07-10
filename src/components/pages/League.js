import React, { useEffect, useState } from 'react'
import { Box, Toolbar, Typography} from '@mui/material'
import Navbar from 'components/navbar/Navbar'
import FavouritesCard from 'components/card/Favourites'
import LeaguesCard from 'components/card/TopLeagues'
import Standing from 'components/league/Standing'
import { Button, ButtonGroup } from '@mui/material'
import Profile from 'components/profile/Profile'
import TopFixtures from 'components/card/TopFixtures'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllLeagues } from 'redux/league'
import LeagueFixture from 'components/league/LeagueFixture'
import { getDataSuccess, setLeague } from 'redux/standingdata'


export default function League() {
  const [subpage, setSubpage] = useState('standing');
  const dispatch = useDispatch();
  const { data, isLoaded, hasErrors, } = useSelector((state) => state.league);
  const { league } = useSelector((state) => state.standing)
  console.log(league)

  useEffect(() => {
    fetch(`https://soccer.sportmonks.com/api/v2.0/standings/season/19735?api_token=${process.env.REACT_APP_FOOTBALL_API_KEY}`)
    .then(res => res.json())
    .then(result => {
      console.log(result?.data[0].standings.data);
      dispatch(getDataSuccess(result?.data[0].standings.data));
      console.log(data);
      dispatch(setLeague(19735));
      dispatch(fetchAllLeagues());
    })
    }, [])

  const idToLogo = (arr, id) => {
    for (let fixt of arr) {
        if (fixt.season_id == id) {
            return fixt.logo;
        }
    }
  }
  console.log(idToLogo(data,271))



  return (
    <Box sx={{ display: 'flex' }}>
        <Navbar/>
        <Box component="div" sx={{width: "100%", p: 3 }}>
            <Toolbar />
            {!isLoaded && 'loading…'}
            {hasErrors && 'Error Loading'}
            {isLoaded &&
            <>
              <Box sx={{float: "right",px: 5, width: "70%", display: "flex", alignItems: "center", flexDirection: "column"}} component="section">
                  {/*why the function inside src don't work with arrow func syntax like we do in onClick*/}
                  <img className="my-3" src={idToLogo(data,league)}/> 
                  {/* <Typography variant='h2' sx={{ my: 5, fontWeight: 700, color: "lightgray" }}>Premier League</Typography> */}
                  
                  <ButtonGroup sx={{ mb: 5 }} variant="outlined" aria-label="outlined button group">
                      <Button onClick={() => setSubpage('standing')}>Standings</Button>
                      <Button onClick={() => setSubpage('fixture')}>Fixtures</Button>
                  </ButtonGroup>
                  {subpage == 'standing' ? <Standing/> : <LeagueFixture season_id={league}/>}
                  
              </Box>
              <Box component="div" sx={{ width: "30%" }}>
                <FavouritesCard/>
                {/* <TopFixtures/> */}
                <LeaguesCard/>
              </Box>
            </>
            }

        </Box>
    </Box>
  )
}
