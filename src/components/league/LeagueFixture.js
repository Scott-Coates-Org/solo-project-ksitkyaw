import React, { useEffect, useState } from 'react'
import { Card } from '@mui/material'
import Fixture from 'components/fixture/Fixture'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { getDataSuccess } from 'redux/team';
import { firebase } from 'firebase/client';

export default function LeagueFixture({season_id}) {
    console.log(season_id)
    const [round, setRound] = useState(6);
    const [roundOfFixtures, setRoundOfFixtures] = useState([]);
    const dispatch = useDispatch();
    // const {fixtures, isLoaded, hasErrors} =useSelector((state) => state.fixture);
    const handleChange = (event) => {
        setRound(event.target.value);
    };
    
    // console.log("rof",roundOfFixtures)

    // todo - split fetch to another useEffect hook so that it won't make api call every time round change
    useEffect(() => {
        console.log(season_id)
        const fetchData = async () => {
            const data = await fetch(`https://cors-anywhere.herokuapp.com/https://soccer.sportmonks.com/api/v2.0/seasons/${season_id}?api_token=${process.env.REACT_APP_FOOTBALL_API_KEY}&include=fixtures`)
            const result = await data.json();
            console.log(result);
            dispatch(getDataSuccess(result.data.fixtures.data));
            const fixtures = result.data.fixtures.data;
            const roundOfFixtures = fixtures?.slice(round-6, round);
            setRoundOfFixtures(roundOfFixtures);
            const id = fixtures[0].league_id;
            firebase.firestore().collection('teams').where("league_id", "==", id).get()
            .then((collections) => {
                const team_data = collections.docs.map(team => team.data())
                // console.log("team_data",team_data)
                dispatch(getDataSuccess(team_data))
            })
        }
        fetchData()
        .catch(console.error)
    }, [round, season_id])

    return (
        <Card sx={{width: "60%", display: "flex", flexDirection: "column"}}>
            <Box sx={{ minWidth: 120, mt:2 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Round</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={round}
                    label="Round"
                    onChange={handleChange}
                    >
                    {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22].map((value) => {
                        return (
                            <MenuItem key={value} value={value * 6}>Round{value}</MenuItem>
                        )
                    })}
                    
                    {/* <MenuItem value={12}>Round2</MenuItem>
                    <MenuItem value={18}>Round3</MenuItem> */}
                    </Select>
                </FormControl>
            </Box>
            <Fixture byRound={roundOfFixtures}/>
        </Card>
    )
}
