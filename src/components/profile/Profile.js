import React, { useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import { Grid, Box, Typography, Paper, List } from '@mui/material';
import Select from 'components/select/Select';
import Fixture from 'components/fixture/Fixture';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from 'components/user/auth';

export default function Profile() {
    const {user} = useAuth();
    const dispatch = useDispatch();
    const { data, isLoaded, hasErrors } = useSelector((state) => state.userr);
    console.log(data)

    return (
        
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {!isLoaded && 'Widgets loading…'}
        {hasErrors && 'Error Loading'}
        {isLoaded && 
        <React.Fragment key={data[0]?.id}>
        <Grid item md={6}>
            <Avatar sx={{width: 250, height: 250, objectFit: "cover"}} alt="Remy Sharp" src="https://images.pexels.com/photos/7913028/pexels-photo-7913028.jpeg?cs=srgb&dl=pexels-alejandro-peralta-7913028.jpg&fm=jpg" />
        </Grid>
        <Grid item md={6}>
            <Paper sx={{width:"auto", p: 3, mb:5}}>
                UserName:<span style={{paddingLeft: 30}}>{user.displayName}</span>
                <p>{data[0]?.desc}</p>
            </Paper>
        </Grid>
        <Grid item md={6}>
            <Paper sx={{maxWidth:"75%", p: 2, mb: 5}}>
                My Club:
                <ul>
                <li>{data[0]?.favourite.teams}</li>
                </ul>
            </Paper>
        </Grid>
        <Grid item md={6}>
            <Paper sx={{maxWidth:"75%", p:2}}>
                My League:
                <ul>
                <li>{data[0]?.favourite.leagues}</li>
                <li>La liga</li>
                </ul>
            </Paper>
        </Grid>
        
        <Grid item md={6}>
            <Paper sx={{maxWidth:"75%", p:2}}>
                My Players:
                <ul>
                <li>{data[0]?.favourite.players}</li>
                <li>Jack Wilshere</li>
                </ul>
            </Paper>
        </Grid>
        {/*duplicate code below */}
        <Grid item md={12} sx={{mt:2}}>
            <Box sx={{display: "flex"}}>
                <Typography variant="body1" sx={{fontWeight:600, pt: 2}}>My matches</Typography>
                <Select/>
            </Box>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Fixture width="100%" height={100} />
                <Fixture width="100%" height={100}/>
            </List>
        </Grid>
        <Grid item md={12} sx={{mt:2}}>
            <Box sx={{display: "flex"}}>
                <Typography variant="body1" sx={{fontWeight:600, pt: 2}}>Matches suggestion</Typography>
                <Select/>
            </Box>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Fixture width="100%" height={100} />
                <Fixture width="100%" height={100}/>
            </List>
        </Grid>
        </React.Fragment>
        }
    </Grid>
        
  )
}
