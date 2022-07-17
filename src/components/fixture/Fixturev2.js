import React from 'react'
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
import styled from 'styled-components';

export default function Fixturev2(props) {
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
        <div>
                <ListItem onMouseOver={mouseover} onMouseOut={mouseout} alignItems="center" sx={{width: width? width : null, height: height? height : null, justifyContent: "space-between"}}>
                    <Box sx={{display: "flex", mr: 0, justifyContent: "start", alignItems: "center", width: "30%"}}>
                    <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    {/* <ListItemText
                    secondary={
                        <React.Fragment>
                        <Typography
                            sx={{ display: 'inline', textAlign: 'middle' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            Anonymous
                        </Typography>
                    
                        </React.Fragment>
                    }
                    /> */}
                    <p className="mb-0">Anonymous</p>
                    </Box>
                    <ListItemAvatar>
                        <Avatar>Vs</Avatar>
                    </ListItemAvatar>
                    
                    <Box sx={{display: "flex", justifyContent: "end", alignItems: "center", width: "30%"}}>
                        {/* <ListItemText
                        secondary={
                            <React.Fragment>
                            <Typography
                                sx={{ display: 'inline', textAlign: 'middle', pr:1 }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Anonymous
                            </Typography>
                        
                            </React.Fragment>
                        }
                        /> */}
                        <p className="pr-1 mb-0">Anonymous</p>
                        <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                    </Box>
                </ListItem>
                <Divider variant="fullWidth" component="hr" />

            </div>

    )
}
    
