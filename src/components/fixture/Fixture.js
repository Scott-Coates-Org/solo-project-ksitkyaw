import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

export default function Fixture(props) {
    const {width, height} = props;
    const mouseover = (e) => {
        e.target.style.backgroundColor = "lightgrey";
        e.target.style.color = "white";
      }
      const mouseout = (e) => {
        e.target.style.backgroundColor = ""; 
        e.target.style.color = "";
      }

  return (
    <>
        <ListItem onMouseOver={mouseover} onMouseOut={mouseout} alignItems="center" sx={{width: width? width : null, height: height? height : null, justifyContent: "space-between"}}>
            <Box sx={{display: "flex", justifyContent: "start", alignItems: "center"}}>
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
                    Ali Connors
                </Typography>
            
                </React.Fragment>
            }
            />
            </Box>
            <ListItemAvatar>
            <Avatar>Vs</Avatar>
            </ListItemAvatar>
            <Box sx={{display: "flex", justifyContent: "end", alignItems: "center"}}>
            <ListItemText
            secondary={
                <React.Fragment>
                <Typography
                    sx={{ display: 'inline', textAlign: 'middle', pr:1 }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                >
                    Ali Connors
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

    </>
    )
}