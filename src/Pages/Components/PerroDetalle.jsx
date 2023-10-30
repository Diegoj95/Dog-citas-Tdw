import React from "react";
import { Alert, Button, Card, CardActions, CardContent, CardMedia } from "@mui/material";
import { useQueryPerroDetalle } from "../../queries/queryPerroDetalle";
import { Link, useParams } from "react-router-dom";
import Perros from "./Perros";
import { useQuery } from "react-query";


export default function PerroDetalle() {

  const paramsUrl = useParams();
  const { data: perro, isLoading: cargandoPerros, isSuccess, isError } = useQueryPerroDetalle(paramsUrl);

  return (
    <>
      <Card>
        <CardMedia sx={{maxWidth: 200}} component="img" image={perro?.message} alt="Perro" />

        <CardContent>
          <h2>Perro</h2>
          <p>{perro?.status}</p>
        </CardContent>
        <CardActions>
           <Link to={'/'}><Button>
            Volver
          </Button>
           </Link>
        </CardActions>
      </Card>
    </>
  );
}
