import React from 'react'
import styled from 'styled-components';
import { ListItemAvatar, Avatar } from '@mui/material';
import useSWR from 'swr';

const Resultdiv = styled.div`
        width: 100px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: black;
        color: white;
        border-radius: 50%;
    `

export default function Result(props) {
  const { round } = props;
  const { data } = useSWR(round.time.status == 'LIVE' ? `https://soccer.sportmonks.com/api/v2.0/fixtures/ ${round.id}?api_token=${process.env.REACT_APP_FOOTBALL_API_KEY}&include=events,`: null, fetcher)

  const fetcher = (...args) => fetch(...args).then(res => res.json())

  
  console.log(data)

  if (round.time.status == 'NS') {
    return (
      <ListItemAvatar>
        <Avatar>Vs</Avatar>
      </ListItemAvatar>
    )
  } else if (round.time.status == 'FT') {
    return (
    <div>
      <Resultdiv>
          <span>{round.scores.localteam_score}</span>
          <span>-</span>
          <spam>{round.scores.visitorteam_score}</spam>
      </Resultdiv>
    </div>
    )
  }
  return (
    <div>
      <Resultdiv>
        {/*not round.something use data so that it's updated accordingly */}
          <span>{round.scores.localteam_score}</span>
          <span>-</span>
          <spam>{round.scores.visitorteam_score}</spam>
      </Resultdiv>
    </div>
  )
}
