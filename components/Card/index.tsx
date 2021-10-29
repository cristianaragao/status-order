import * as React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Stack from "@mui/material/Stack";

interface CardUI {
  item: any;
  changeStatus?: React.EventHandler<any>;
}

const BasicCard: React.FC<CardUI> = ({ item, changeStatus }) => {

  const style: any = {}

  if(item.description.length > 50) item.description = item.description.substring(0, 50) + "..."

  return (
    <Card sx={{ width: "100%", marginBottom: "0.7rem" }}>
      <CardContent>
        <Stack
          justifyContent="space-between"
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Box style={{ textAlign: "left" }}>
            <Typography variant="h6">Pedido Nº {item.id}</Typography>
          </Box>
          <Box style={{ textAlign: "left", ...style }}>
            <Typography style={{...style}} variant="subtitle1">{item.description}</Typography>
          </Box>
          <Box style={{ textAlign: "left" }}>
            <Typography variant="h6">
              {item.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "space-between" }}>
        <Button size="small">Detalhes...</Button>
        <div>
          {item.status === 0 && (
            <Button
              style={{ marginRight: "1rem" }}
              size="small"
              color="error"
              variant="contained"
              onClick={() => changeStatus(3)}
            >
              Cancelar
            </Button>
          )}
          {item.status < 2 && (
            <Button
              style={{ marginRight: "0.7rem" }}
              size="small"
              variant="contained"
              onClick={() => changeStatus(item.status + 1)}
            >
              {item.status === 0 && "Preparar"}
              {item.status === 1 && "Entregar"}
            </Button>
          )}
          {item.status === 2 && (
            <span
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: "green",
                border: "1px solid green",
                padding: "3px 5px",
                borderRadius: "3px",
                marginRight: "0.7rem",
              }}
            >
              ENTREGUE
            </span>
          )}
          {item.status === 3 && (
            <span
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: "red",
                border: "1px solid red",
                padding: "3px 5px",
                borderRadius: "3px",
                marginRight: "0.7rem",
              }}
            >
              CANCELADO
            </span>
          )}
        </div>
      </CardActions>
    </Card>
  );
};

export default BasicCard;
