import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import Stack from "@mui/material/Stack";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const value = 30;

export default function BasicCard({ item }) {
  return (
    <Card sx={{ minWidth: 300, width: "80vw", marginBottom: "0.7rem" }}>
      <CardContent>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Box style={{ textAlign: "left" }}>
            <Typography>Pedido Nº {item}</Typography>
          </Box>
          <Box style={{ textAlign: "left" }}>
            <Typography variant="body2">McFritas Média + McFlurry</Typography>
          </Box>
          <Box style={{ textAlign: "left" }}>
            <Typography variant="subtitle2">
              {value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "space-between" }}>
        <Button size="small">Detalhes...</Button>
        <Button size="small" variant="contained">
          Fazer
        </Button>
      </CardActions>
    </Card>
  );
}
