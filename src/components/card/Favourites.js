import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';


export default function FavouritesCard() {
  return (
    <Card sx={{mb: 3, maxWidth: 400 }}>
      <CardContent>
        <Typography sx={{mb: 3,display: "flex"}} variant="h6" component="div">
          Choose your favourite league
          <IconButton sx={{ ml: "auto"}} aria-label="share">
            <ArrowForwardIosIcon />
        </IconButton>
        </Typography>
        <Typography sx={{ mb: 3, display: "flex"}} variant="h6" component="div">
          Choose your favourite league
          <IconButton sx={{ ml: 'auto'}} aria-label="share">
            <ArrowForwardIosIcon />
        </IconButton>
        </Typography>
        <Typography variant="h6" component="div">
          Choose your favourite league
          <IconButton sx={{ float: "right"}} aria-label="share">
            <ArrowForwardIosIcon />
          </IconButton>
        </Typography>
        

      </CardContent>
      <CardActions>
        <Button size="small">See profile</Button>
      </CardActions>
    </Card>
  );
}