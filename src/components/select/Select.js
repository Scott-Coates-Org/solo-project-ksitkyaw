import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [date, setDate] = React.useState('');

  const handleChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, pl: 5 }}>
      <FormControl sx={{minWidth: 120}}>
        <InputLabel id="demo-simple-select-label">Date</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={date}
          label="Date"
          onChange={handleChange}
        >
          <MenuItem value={10}>Today</MenuItem>
          <MenuItem value={20}>28 June</MenuItem>
          <MenuItem value={30}>29 June</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
