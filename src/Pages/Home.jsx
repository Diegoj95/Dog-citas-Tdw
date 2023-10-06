import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography, Card, CardContent, CardActions, Divider } from '@mui/material';
import { obtenerFotoDePerro } from '../queries/perrosAPI';
import { nombresPerros, descripcionesPerros } from './Components/datosPerros';

const cardStyle = {
  maxWidth: 345,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: '300px',
};

function Home() {
  const [candidato, setCandidato] = useState('');
  const [aceptados, setAceptados] = useState([]);
  const [rechazados, setRechazados] = useState([]);

  const obtenerNuevaFoto = async () => {
    try {
      const foto = await obtenerFotoDePerro();
      setCandidato(foto);
    } catch (error) {
      // Manejar errores
    }
  };

  const aceptarPerro = () => {
    // Crea un nuevo perro aceptado con datos aleatorios y la foto actual del candidato
    const nombreAleatorio = nombresPerros[Math.floor(Math.random() * nombresPerros.length)];
    const descripcionAleatoria = descripcionesPerros[Math.floor(Math.random() * descripcionesPerros.length)];
    const nuevoPerroAceptado = {
      url: candidato,
      nombre: nombreAleatorio,
      descripcion: descripcionAleatoria,
    };

    // Actualiza la lista de perros aceptados
    setAceptados([...aceptados, nuevoPerroAceptado]);

    // Obtiene una nueva foto para el candidato
    obtenerNuevaFoto();
  };

  const rechazarPerro = () => {
    // Crea un nuevo perro rechazado con datos aleatorios y la foto actual del candidato
    const nombreAleatorio = nombresPerros[Math.floor(Math.random() * nombresPerros.length)];
    const descripcionAleatoria = descripcionesPerros[Math.floor(Math.random() * descripcionesPerros.length)];
    const nuevoPerroRechazado = {
      url: candidato,
      nombre: nombreAleatorio,
      descripcion: descripcionAleatoria,
    };

    // Actualiza la lista de perros rechazados
    setRechazados([...rechazados, nuevoPerroRechazado]);

    // Obtiene una nueva foto para el candidato
    obtenerNuevaFoto();
  };

  useEffect(() => {
    obtenerNuevaFoto();
  }, []);

  const renderPerros = (perros, titulo) => (
    <Grid item xs={12} sm={4}>
      <Typography variant="h6">{titulo}</Typography>
      {perros.map((perro, index) => (
        perro.url && (
          <Card key={index} style={cardStyle}>
            <img src={perro.url} alt={`${titulo.toLowerCase()} ${index}`} style={{ height: '140px', objectFit: 'cover' }} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {perro.nombre}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {perro.descripcion}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Quitar</Button>
            </CardActions>
          </Card>
        )
      ))}
    </Grid>
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <Card style={cardStyle}>
          <img src={candidato} alt="Candidato" style={{ height: '140px', objectFit: 'cover' }} />
          <CardContent>
            <Typography variant="h6">{nombresPerros[Math.floor(Math.random() * nombresPerros.length)]}</Typography>
            <Typography variant="body2">{descripcionesPerros[Math.floor(Math.random() * descripcionesPerros.length)]}</Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary" onClick={aceptarPerro}>
              Aceptar
            </Button>
            <Button variant="contained" color="secondary" onClick={rechazarPerro}>
              Rechazar
            </Button>
          </CardActions>
        </Card>
      </Grid>
      {renderPerros(aceptados, 'Perros Aceptados')}
      {renderPerros(rechazados, 'Perros Rechazados')}
    </Grid>
  );
}

export default Home;