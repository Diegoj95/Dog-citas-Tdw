import React from "react"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Perros from "./Components/Perros";
import PerroDetalle from "./Components/PerroDetalle";


export default function Home() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (

    <Box sx={{ width: '100%' }}>
        <Perros></Perros>
    </Box>

  )
}