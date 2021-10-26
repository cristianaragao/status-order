import React, { Fragment } from 'react';

import { alpha, styled } from '@mui/material/styles';


import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const GreenSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: "#388e3c",
    '&:hover': {
      backgroundColor: alpha("#388e3c", theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: "#388e3c",
  },
}));

export default function Layout({ children }) {

  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setOpen(event.target.checked);
  };

  return (
    <Fragment>
      <Box
        style={{
          backgroundColor: '#EBEBEB',
          minHeight: 60,
          padding: "0 2rem",
          borderRadius: 10,
          display: "flex",
          alignItems: "center"
        }}
      >
        <FormGroup>
          <FormControlLabel control={<GreenSwitch checked={open}
            onChange={handleChange} color="success"/>} label={open ? <span style={{ color: "#388e3c", fontWeight: "bold" }}>ABERTO</span> : <span style={{ color: "red", fontWeight: "bold" }}>FECHADO</span>} />
        </FormGroup>
      </Box>
      <Box
        style={{
          minHeight: '20rem',
          display: "flex"
        }}
      >

        {children}
      </Box>
    </Fragment>
  );
}
