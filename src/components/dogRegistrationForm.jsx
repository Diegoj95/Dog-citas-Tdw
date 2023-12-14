// components/DogRegistrationForm.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Modal, IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

const DogRegistrationForm = ({ open, handleClose, onRegisterSuccess }) => {
    const [dogData, setDogData] = React.useState({
      nombre: '',
      descripcion: '',
      url_foto: ''
    });

    const fetchRandomDog = async () => {
        const response = await axios.get("https://dog.ceo/api/breeds/image/random");
        return response.data.message;
        };

        useEffect(() => {
        fetchRandomDog().then(url => {
            setDogData(prevData => ({ ...prevData, url_foto: url }));
        });
        }, []);

    const handleRefreshImage = () => {
        fetchRandomDog().then(url => {
            setDogData(prevData => ({ ...prevData, url_foto: url }));
        });
    };

    const handleChange = (e) => {
        setDogData({ ...dogData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    try {
        const response = await axios.post('http://localhost:8000/api/registrarPerro', dogData);
        console.log(response.data);

        if (response.data && onRegisterSuccess) {
          onRegisterSuccess();
        }
        
        } catch (error) {
        console.error('Error al registrar el perro:', error);
        }
    };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return (

    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style} component="form" onSubmit={handleSubmit}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="nombre"
        label="Nombre del Perro"
        name="nombre"
        autoFocus
        value={dogData.nombre}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="descripcion"
        label="Descripción"
        name="descripcion"
        value={dogData.descripcion}
        onChange={handleChange}
      />
      {/* <TextField
        margin="normal"
        required
        fullWidth
        id="url_foto"
        label="URL de la Foto"
        name="url_foto"
        value={dogData.url_foto}
        onChange={handleChange}
      /> */}

        <img src={dogData.url_foto} alt="Dog" style={{ width: '100%', height: 'auto' }} />

        <IconButton onClick={handleRefreshImage}>
            <RefreshIcon />
        </IconButton>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Registrar Perro
      </Button>
    </Box>
    </Modal>
  );
};

export default DogRegistrationForm;
