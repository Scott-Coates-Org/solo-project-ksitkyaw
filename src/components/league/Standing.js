

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

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
  
function createData(Rank, Club, Win, Draw, Lose, Points) {
    return {Rank, Club, Win, Draw, Lose, Points };
  }
  
const rows = [
    createData(1, "Arsenal", 0, 0, 0, 0),
    createData(1, "Liverpool", 0, 0, 0, 0),
    createData(1, "Man City", 0, 0, 0, 0),
    createData(1, "Man Utd", 0, 0, 0, 0),
    createData(1, "Chelsea", 0, 0, 0, 0),
  ];

export default function Standing() {
  return (
    <Box>
        
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Rank</StyledTableCell>
                <StyledTableCell align="left">Clubs</StyledTableCell>
                <StyledTableCell align="left">Win</StyledTableCell>
                <StyledTableCell align="left">Draw</StyledTableCell>
                <StyledTableCell align="left">Lose</StyledTableCell>
                <StyledTableCell align="left">Points</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.Rank}>
                  <StyledTableCell align="left" component="th" scope="row">
                    {row.Rank}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.Club}</StyledTableCell>
                  <StyledTableCell align="left">{row.Win}</StyledTableCell>
                  <StyledTableCell align="left">{row.Draw}</StyledTableCell>
                  <StyledTableCell align="left">{row.Lose}</StyledTableCell>
                  <StyledTableCell align="left">{row.Points}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </Box>
      
  )
}
