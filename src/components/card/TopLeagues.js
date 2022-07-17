import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import client from 'firebase/client';
import { useDispatch, useSelector } from 'react-redux';
import { getDataSuccess, setLeague } from 'redux/standingdata';
import { useHistory } from 'react-router-dom';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function LeaguesCard() {
  const history = useHistory()
  const {data, isLoaded, hasErrors} = useSelector((state) => state.league)
  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   async function _fetchAllWidgetsFromDb() {
  //     const snapshot = await client.firestore().collection('leagues').get();
    
  //     const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
  //     return data;
  //   }
  //   _fetchAllWidgetsFromDb().then(data => setLeagues(data))
  // })

  const mouseover = (e) => {
    e.target.style.backgroundColor = "lightgrey";
    e.target.style.color = "white";
  }
  const mouseout = (e) => {
    e.target.style.backgroundColor = ""; 
    e.target.style.color = "";
  }

  const handleClick = (e, id) => {
    //want to push to the league route here
    history.push('/league')
    fetch(`https://soccer.sportmonks.com/api/v2.0/standings/season/${id}?api_token=${process.env.REACT_APP_FOOTBALL_API_KEY}`)
    .then(res => res.json())
    .then(result => {
      // console.log(result?.data[0].standings.data);
      dispatch(getDataSuccess(result?.data[0].standings.data));
      // console.log(data);
      dispatch(setLeague(id));
    })
  }

  return (
    <Card sx={{ mb: 3, minWidth: 275 }}>
      <CardContent>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell onClick={() => console.log("clicked")}>Top Leagues</StyledTableCell>
      
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((league) => {
            return (
              <StyledTableRow key={league.id}>
                <StyledTableCell onClick={(e) => handleClick(e, league.season_id)} onMouseOver={mouseover} onMouseOut={mouseout}>
                  {league.name}
                </StyledTableCell>
              </StyledTableRow>

            )
          })}
          
        </TableBody>
      </Table>
    </TableContainer>
        
      </CardContent>
      <CardActions>
        <Button size="small">See all leagues</Button>
      </CardActions>
    </Card>
  );
}