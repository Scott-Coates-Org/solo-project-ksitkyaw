import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { firebase } from 'firebase/client';
import { useDispatch, useSelector } from 'react-redux';
import { getDataSuccess } from 'redux/team';

export default function Fixture(props) {
    const {width, height, byRound = null} = props;
    const dispatch = useDispatch();
    const { data, isLoaded, hasErrors } = useSelector(state => state.team)
    // console.log("teamdata",  data)

    const idToName = (arr, id) => {
        for (let fixt of arr) {
            if (fixt.team_id == id) {
                return fixt.name;
            }
        }
    }

    const mouseover = (e) => {
        e.target.style.backgroundColor = "lightgrey";
        e.target.style.color = "white";
      }
      const mouseout = (e) => {
        e.target.style.backgroundColor = "";
        e.target.style.color = "";
      }
    // console.log("round",byRound)
    // const id = byRound[0]?.league_id;

    // React.useEffect(() => {
    //     firebase.firestore().collection('teams').where("league_id", "==", id).get()
    //     .then((collections) => {
    //         const team_data = collections.docs.map(team => team.data())
    //         console.log("team_data",team_data)
    //         dispatch(getDataSuccess(team_data))
    //     })
    // }, [byRound])

  return (
    <>
        {byRound && byRound.map((round) => {
            return (
                <div>
                <ListItem onMouseOver={mouseover} onMouseOut={mouseout} alignItems="center" sx={{width: width? width : null, height: height? height : null, justifyContent: "space-between"}}>
                    <Box sx={{display: "flex", justifyContent: "start", alignItems: "center", width: "30%"}}>
                    <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{mr: 0}} />
                    </ListItemAvatar>
                    <ListItemText
                    secondary={
                        <React.Fragment>
                        <Typography
                            sx={{ display: 'inline', textAlign: 'middle' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {idToName(data, round.localteam_id) }
                        </Typography>
                    
                        </React.Fragment>
                    }
                    />
                    </Box>
                    <ListItemAvatar>
                        <Avatar>Vs</Avatar>
                    </ListItemAvatar>
                    <Box sx={{display: "flex", justifyContent: "end", alignItems: "center", width: "30%"}}>
                    <ListItemText
                    secondary={
                        <React.Fragment>
                        <Typography
                            sx={{ display: 'inline', textAlign: 'middle', pr:1 }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {idToName(data, round.visitorteam_id)}
                        </Typography>
                    
                        </React.Fragment>
                    }
                    />
                    <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    </Box>
                </ListItem>
                <Divider variant="fullWidth" component="hr" />

            </div>

            )
        })}
    </>
    )
}