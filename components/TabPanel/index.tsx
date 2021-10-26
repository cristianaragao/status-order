import React, { useRef, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Card from "../Card";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const list = [
  {
    id: 1,
    description: "McFritas Média + McFlurry",
    price: 30,
    status: 0
  },
  {
    id: 2,
    description: "McFritas Média + McFlurry",
    price: 30,
    status: 1
  },
  {
    id: 3,
    description: "McFritas Média + McFlurry",
    price: 30,
    status: 2
  },
  {
    id: 4,
    description: "McFritas Média + McFlurry",
    price: 30,
    status: 0
  },
]

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
      {value === index && <Box sx={{ paddingTop: 3, display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>{children}</Box>}
    </div>
  );
}

function getCountItens(total: number) {

  const padd = total >= 10 ? "3px" : "3px 6px"

  return <span style={{ marginLeft: "0.1rem", fontSize: 12, padding: padd, color: "#FFF", backgroundColor: "#1976d2", borderRadius: "50%" }}>{total}</span>
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const pushTodoRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const [todo, setTodo] = React.useState(list.filter((i) => i.status === 0));
  const [doing, setDoing] = React.useState(list.filter((i) => i.status === 1));
  const [done, setDone] = React.useState(list.filter((i) => i.status === 2));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const setStatus = (index: number, status: number) => {

    if (status === 1) {
      let doingAux = doing;
      let todoAux = todo;
      todoAux[index].status = status;
      doingAux.push(todoAux[index]);
      todoAux.splice(index, 1);
      setTodo(todoAux);
      setDoing(doingAux);
    }

    if (status === 2) {
      let doneAux = done;
      let doingAux = doing;
      doingAux[index].status = status;
      doneAux.push(doingAux[index]);
      doingAux.splice(index, 1)
      setDone(doneAux);
      setDoing(doingAux)
    }

    if(status === 3){
      let doneAux = done;
      doneAux.push(todo[index]);
      let todoAux = todo;
      todoAux[index].status = status;
      todoAux.splice(index, 1);
      setTodo(todoAux);
      setDone(doneAux);
    }

  }

  return (
    <Box sx={{ width: "100%" }} ref={pushTodoRef}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs value={value} onChange={handleChange} centered>

          <Tab sx={{ zIndex: 3 }} label={<span>PREPARAR {getCountItens(todo.length)}</span>} />

          <Tab sx={{ zIndex: 10 }} label={<span>EM PROGRESSO {getCountItens(doing.length)}</span>} />

          <Tab sx={{ zIndex: 3 }} label={<span>FINALIZADOS</span>} />

        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {todo.length > 0 ? (
          todo.map((item, index) => <Card key={index} item={item} changeStatus={(status: number) => setStatus(index, status)}/>)
        ) : (
          <Typography>Sem pedidos a preparar.</Typography>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {doing.length > 0 ? (
          doing.map((item, index) => <Card key={index} item={item}  changeStatus={(status: number) => setStatus(index, status)}/>)
        ) : (
          <Typography>Nenhum pedido em progresso.</Typography>
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {done.length > 0 ? (
          done.map((item, index) => <Card key={index} item={item}/>)
        ) : (
          <Typography>Nenhum pedido realizado ainda.</Typography>
        )}
      </TabPanel>
    </Box>
  );
}
