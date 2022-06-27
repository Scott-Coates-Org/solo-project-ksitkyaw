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


const rows = ["Premier League", "La Liga", "Bundesliga", "Seria A", "Ligue1"];

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
  return (
    <Card sx={{ mb: 3, minWidth: 275 }}>
      <CardContent>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Top Leagues</StyledTableCell>
      
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            return (
              <StyledTableRow>
                <StyledTableCell>
                  {row}
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