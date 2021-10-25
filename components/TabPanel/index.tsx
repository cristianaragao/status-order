import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";

import CircleIcon from '@mui/icons-material/Circle';

import Card from "../Card";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ display: "flex", justifyContent: "center", width: "100%" }}
    >
      {value === index && <Box sx={{ paddingTop: 3, display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center"}}>{children}</Box>}
    </div>
  );
}

function getCountItens(total: number){
  return total > 0 ? <span style={{ marginLeft: "0.5rem", fontSize: 12, padding: 3, color:"#FFF", backgroundColor: "#1976d2", borderRadius: "50%", minWidth: "1rem", flexShrink: 1 }}>{total}</span> : null
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const [todo, setTodo] = React.useState([1,2,3,4,5,6,7,8,9,10,11,12]);
  const [doing, setDoing] = React.useState([1,2,3]);
  const [done, setDone] = React.useState([1,2,3]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs value={value} onChange={handleChange} centered>

            <Tab sx={{ zIndex: 3 }} label={<span>A FAZER {getCountItens(0)}</span>}/>
     
            <Tab sx={{ zIndex: 10 }} label={<span>EM PROGRESSO {getCountItens(12)}</span>} />

            <Tab sx={{ zIndex: 3 }} label={<span>FEITO {getCountItens(done.length)}</span>} />
  
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {todo.length > 0 ? (
          todo.map((item, index) => <Card key={index} item={item} />)
        ) : (
          <Typography>Sem pedidos para fazer.</Typography>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {doing.length > 0 ? (
          doing.map((item, index) => <Card key={index} item={item} />)
        ) : (
          <Typography>Nenhum pedido em progresso.</Typography>
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {done.length > 0 ? (
          done.map((item, index) => <Card key={index} item={item} />)
        ) : (
          <Typography>Nenhum pedido realizado ainda.</Typography>
        )}
      </TabPanel>
    </Box>
  );
}
