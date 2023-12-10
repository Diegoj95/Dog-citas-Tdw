import React, { useEffect } from "react";
import {
  Grid,
  LinearProgress,
  List,
  ListItem,
} from "@mui/material";
import { useQueryPerroDetalle } from "../../queries/queryPerroDetalle";

export default function Perros() {
  const { data: perroDetalle, isLoading: cargandoPerroDetalle, isSuccess: exitoPerroDetalle, isError: errorPerroDetalle } = useQueryPerroDetalle();

  
  useEffect(() => {
    if (errorPerroDetalle) {
      console.log("Error al obtener la imagen del perro.");
    }
  }, [errorPerroDetalle]);

  return (
    <>
      {cargandoPerroDetalle ? (
        <LinearProgress />
      ) : (
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <List>
              {exitoPerroDetalle && (
                <ListItem>
                  <img src={perroDetalle} alt="Perro" />
                </ListItem>
              )}
            </List>
          </Grid>
        </Grid>
      )}
    </>
  );
}
