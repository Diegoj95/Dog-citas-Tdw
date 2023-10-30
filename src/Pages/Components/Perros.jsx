import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQueryPerroDetalle } from "../../queries/queryPerroDetalle";
import { nombresPerros, descripcionesPerros } from './DatosPerros';
import { useQuery } from "react-query";

export default function Perros() {
  const [candidato, setCandidato] = useState([]);
  const [params, setParams]= useState({limit: 100 , page: 1})

  const { data: perro, isLoading: cargandoPerros, isSuccess, isError } = useQueryPerroDetalle(params);


  useEffect(() => {
    isError && console.log("error");
  }, [isError]);

  useEffect(()=>{
    isSuccess&&setPokemones(pokemon)
  },[isSuccess]);


  return (
    <>
      <Grid container spacing={1}>
        {/* Candidato */}
        <Grid item xs={4}>
          <h2>Candidato</h2>

        </Grid>

      </Grid>
    </>
  );
}
