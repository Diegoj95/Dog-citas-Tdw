import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardMedia, CardContent, Typography, Grid } from '@mui/material';


const ProfileSelection = ({ onSelectProfile }) => {
  const [dogs, setDogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/listarAllPerros');
        // Asegúrate de acceder a la clave 'perros' para obtener los datos
        setDogs(response.data.perros);
      } catch (err) {
        console.error('Error al cargar los perros:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDogs();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Hubo un error al cargar los perros</p>;
  if (!Array.isArray(dogs)) return <p>La lista de perros no está disponible</p>;

  return (
    <div>
      <h1>Selecciona un Perfil de Perro</h1>
      <Grid container spacing={2}>
        {dogs.map(dog => (
          <Grid item xs={12} sm={6} md={4} key={dog.id}>
            <Card onClick={() => onSelectProfile(dog)} sx={{ cursor: 'pointer' }}>
              <CardMedia
                component="img"
                height="140"
                image={dog.url_foto}
                alt={dog.nombre}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {dog.nombre}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProfileSelection;
