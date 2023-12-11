import { useEffect, useState } from 'react';
import './App.css';
import { Box, Button, Grid, Paper, Typography, Avatar, ListItem, Container, CircularProgress } from '@mui/material';
import ProfileMore from './components/perroCard.jsx';
import DogRegistrationForm from './components/dogRegistrationForm';
import ProfileSelection from './components/profileSelection';
import axios from 'axios';
import { useGetRandomDog, useGetDogDetails } from "./queries/queryPerroDetalle";

//Logo
import logo from './img/logo.png'

function App() {

  // Estado para almacenar el perro seleccionado
  const [selectedDog, setSelectedDog] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [dogDetails, setDogDetails] = useState(null);
  const [rejectedDogs, setRejectedDogs] = useState([]);
  const [acceptedDogs, setAcceptedDogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Usando el hook personalizado para obtener un perro aleatorio
  const { data: randomDog, isLoading: isLoadingRandomDog, refetch: refetchRandomDog } = useGetRandomDog();

  useEffect(() => {
    console.log("Perros aceptados:", acceptedDogs);
    console.log("Random Dog:", randomDog); // Agregar esta línea para depurar
    if (randomDog?.id) {
      axios.get(`http://localhost:8000/api/listarUnPerro`, { params: { id: randomDog.id } })
        .then(response => {
          setDogDetails(response.data.perros);
          console.log("Dog Details set to:", response.data.perros);
        })
        .catch(error => {
          console.error("Error al obtener detalles del perro", error);
        });
    }
  }, [randomDog]);

    if (isLoadingRandomDog) {
    return <CircularProgress />;
  }

  // Función para manejar la selección del perfil
  const handleSelectProfile = (dog) => {
    setSelectedDog(dog);
  };


  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };




  const spinner = (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <CircularProgress />
    </Box>
  );

  const fetchAcceptedDogs = async (perroInteresadoId) => {
    try {
      const response = await axios.get('http://localhost:8000/api/listarPerrosAceptados', { params: { id: perroInteresadoId } });
      console.log("Respuesta listarPerrosAceptados:", response.data);
  
      let ids = [];
      if (response.data.perrosAceptados && response.data.perrosAceptados.length > 0) {
        ids = response.data.perrosAceptados.map(perro => perro.perro_candidato_id);
      }  
      const detalles = await obtenerDetallesPerros(ids);
      return detalles;
    } catch (error) {
      console.error("Error al obtener perros aceptados:", error);
      return [];
    }
  };
  
  const fetchRejectedDogs = async (perroInteresadoId) => {
    try {
      const response = await axios.get('http://localhost:8000/api/listarPerrosRechazados', { params: { id: perroInteresadoId } });
      console.log("Respuesta listarPerrosRechazados:", response.data);
  
      let ids = [];
      if (response.data.perrosRechazados && response.data.perrosRechazados.length > 0) {
        ids = response.data.perrosRechazados.map(perro => perro.perro_candidato_id);
      }
        
      const detalles = await obtenerDetallesPerros(ids);
      return detalles;
    } catch (error) {
      console.error("Error al obtener perros rechazados:", error);
      return [];
    }
  };
  

  const obtenerDetallesPerros = async (ids) => {

    if (!ids || ids.length === 0) {
      return [];
    }

    const promesas = ids.map(id => 
      axios.get(`http://localhost:8000/api/listarUnPerro`, { params: { id } })
        .then(response => response.data.perros)
        .catch(error => console.error("Error al obtener detalles del perro", error))
    );
  
    const detallesPerros = await Promise.all(promesas);
    return detallesPerros;
  };
  

  const handleReject = async () => {
    try {
      console.log("Enviando solicitud de rechazo con:", selectedDog.id, dogDetails.id, 'R');
      
      const response = await axios.post('http://localhost:8000/api/registrarInteraccion', {
        perro_interesado_id: selectedDog.id.toString(),
        perro_candidato_id: dogDetails.id.toString(),
        preferencia: 'R'
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log("Respuesta de rechazo:", response);
  
      // Actualizar la lista de perros rechazados
      const newRejectedDogs = await fetchRejectedDogs(selectedDog.id);
      setRejectedDogs(newRejectedDogs);
      refetchRandomDog();
    } catch (error) {
      console.error("Error en handleReject:", error);
    }
  };
  
  const handleAccept = async () => {
    try {
      console.log("Enviando solicitud de aceptación con:", selectedDog.id, dogDetails.id, 'A');
  
      const response = await axios.post('http://localhost:8000/api/registrarInteraccion', {
        perro_interesado_id: selectedDog.id.toString(),
        perro_candidato_id: dogDetails.id.toString(),
        preferencia: 'A'
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log("Respuesta de aceptación:", response);
  
      // Actualizar la lista de perros aceptados
      const newAcceptedDogs = await fetchAcceptedDogs(selectedDog.id);
      setAcceptedDogs(newAcceptedDogs);
      refetchRandomDog();
    } catch (error) {
      console.error("Error en handleAccept:", error);
    }
  };
  

  // Si no hay un perro seleccionado, mostrar la selección de perfil
  if (!selectedDog) {
    return <ProfileSelection onSelectProfile={handleSelectProfile} />;
  }

  if (!randomDog) {
    return <CircularProgress />;
  }

  if (!selectedDog || isLoadingRandomDog || !randomDog) {
    return <CircularProgress />;
  }

  const content = dogDetails ? (
    <Box>
      <Box className="caja">
        <img src={dogDetails.url_foto} alt="dog" style={{ width: '200px', height: '200px' }} />
      </Box>
      <Typography className='nameDog'>
        Nombre: {dogDetails.nombre}
      </Typography>
      <Typography className='lotum'>
        Descripcion: {dogDetails.descripcion}
    </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button className='button-X' variant="contained" onClick={handleReject} sx={{ mr: 2 }} />
        <button className='button-Match' variant="contained" onClick={handleAccept} />
      </Box>
    </Box>
  ) : (
    <Typography variant="h6" sx={{ mt: 2, textAlign: 'center' }}>No hay más candidatos disponibles</Typography>
  );


  return (
    <Container className="background">
      {/* Contenedor principal para alinear el logo, mensaje de bienvenida y botón */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem 0' }}>
        {/* Contenedor para el logo */}
        <Box sx={{ flex: '0 0 auto' }}>
          <img className="logo" src={logo} alt="Logo" />
        </Box>

        {/* Mensaje de bienvenida */}
        <Box sx={{ flex: '1 1 auto', textAlign: 'center' }}>
          <Typography variant="h4" sx={{ color: 'black' }}>
            Bienvenido {selectedDog.nombre}!
          </Typography>
        </Box>

        {/* Botón de registro */}
        <Box sx={{ flex: '0 0 auto' }}>
          <Button variant="contained" onClick={handleOpenModal}>
            Registrar Perro
          </Button>


          {isModalOpen && (
            <DogRegistrationForm
              open={isModalOpen}
              handleClose={handleCloseModal}
            />
          )}
        </Box>
      </Box>

      <Box className="contenido">
      {/* Columna perfiles */}
      <Box className="columna profile">
        {content}
      </Box>

        {/* Columna Aceptados */}
        <Box className="columna aceptados">
          <Box className="liked_top">
            <img src="src/img/aceptado.png" alt="liked" />
          </Box>
          <ListItem className='lista'>
            <Box className='contenidos-aceptados'>
              {acceptedDogs.map((dogDetails) => (
                <Box className="aD" key={dogDetails?.url_foto} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
                  <Avatar
                    src={dogDetails?.url_foto}
                    sx={{ width: 130, height: 130 }}
                    alt="Imagen Avatar"
                    style={{ marginRight: "10px" }}
                  />
                  <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    {dogDetails?.nombre}
                  </Typography>
                  <ProfileMore data={dogDetails}></ProfileMore>
                </Box>
              ))}
            </Box>
          </ListItem>
        </Box>

        {/* Columna Rechazados */}
        <Box className="columna rechazados">
          <Box className="X-liked_top">
            <img src="src/img/rechazado.png" alt="X-liked"/>
          </Box>
          <ListItem className='lista'>

            <Box className='contenidos-rechazados'>
              {rejectedDogs.map((dogDetails) => (
                <Box className="rD" key={dogDetails?.url_foto} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
                  <Avatar
                    src={dogDetails?.url_foto}
                    sx={{ width: 130, height: 130 }}
                    alt="Imagen Avatar"
                    style={{ marginRight: "10px" }}
                  />
                  <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    {dogDetails?.nombre}
                  </Typography>
                  <ProfileMore data={dogDetails}></ProfileMore>
                </Box>
              ))}
            </Box>

          </ListItem>
        </Box>

      </Box>

    </Container>
  );
}


export default App