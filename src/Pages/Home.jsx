import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography, Card, CardContent, CardActions, Divider, Collapse, IconButton } from '@mui/material';
import { obtenerFotoDePerro } from '../queries/perrosAPI';
import { nombresPerros, descripcionesPerros } from './Components/datosPerros';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

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
  const [expandedA, setExpandedA] = React.useState(false);
  const [expandedR, setExpandedR] = React.useState(false);
  const [botonesDeshabilitados, setBotonesDeshabilitados] = useState(false);
  const numeroRamdomNombre = Math.floor(Math.random() * nombresPerros.length);
  const numeroRamdomDescripcion = Math.floor(Math.random() * descripcionesPerros.length);
  const [openItem, setOpenItem] = useState(null);
  const [openItemR, setOpenItemR] = useState(null);

  useEffect(() => {
    obtenerNuevaFoto();
  }, []);

  const obtenerNuevaFoto = async () => {
    try {
      setBotonesDeshabilitados(true); // Deshabilita los botones nuevamente
      const foto = await obtenerFotoDePerro();
      setCandidato(foto);
    } catch (error) {
      // Manejar errores
    } finally {
      setBotonesDeshabilitados(false); // Habilita los botones nuevamente
    }
  };

  const aceptarPerro = () => {
    // Crea un nuevo perro aceptado con datos aleatorios y la foto actual del candidato
    const nombreAleatorio = nombresPerros[numeroRamdomNombre];
    const descripcionAleatoria = descripcionesPerros[numeroRamdomDescripcion];
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
    const nombreAleatorio = nombresPerros[numeroRamdomNombre];
    const descripcionAleatoria = descripcionesPerros[numeroRamdomDescripcion];
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

  const ExpandMoreA = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const handleExpandClickA = (itemIndex) => {
    console.log(itemIndex);
    if (itemIndex === openItem) {
      // Si se hace clic en el elemento ya abierto, ciérralo.
      setOpenItem(null);
      //setExpandedA(null);
      setExpandedA(!expandedA);
    } else {
      setOpenItem(itemIndex);
    }
  };

  const ExpandMoreR = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const handleExpandClickR = (itemIndex) => {
    if (itemIndex === openItemR) {
      // Si se hace clic en el elemento ya abierto, ciérralo.
      setOpenItemR(null);
      //setExpandedA(null);
      setExpandedR(!expandedR);
    } else {
      setOpenItemR(itemIndex);
    }
  };
  

  const renderPerrosA = (perros, titulo) => (
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
              <CardActions disableSpacing>
                <ExpandMoreA
                  expand={expandedA}
                  onClick={()=>handleExpandClickA(index)}
                  aria-expanded={expandedA}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMoreA>
              </CardActions>
              {openItem === index && (
              <Collapse in={expandedA} timeout="auto"  >
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {perro.descripcion}
                  </Typography>
                </CardContent>
              </Collapse>)}
            </CardContent>
            <CardActions>
              <Button size="small">Quitar</Button>
            </CardActions>
          </Card>
        )
      ))}
    </Grid>
  );

  const renderPerrosR = (perros, titulo) => (
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
              <CardActions disableSpacing>
                <ExpandMoreR
                  expand={expandedR}
                  onClick={()=>handleExpandClickR(index)}
                  aria-expanded={expandedR}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMoreR>
              </CardActions>
              {openItemR === index && (
                <Collapse in={expandedR} timeout="auto" unmountOnExit >
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {perro.descripcion}
                    </Typography>
                  </CardContent>
                </Collapse>)}
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
            <Typography variant="h6">{nombresPerros[numeroRamdomNombre]}</Typography>
            
            {/* <CardActions disableSpacing>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions> */}
            {/* <Collapse in={expanded} timeout="auto" unmountOnExit> */}
              {/* <CardContent> */}
                <Typography variant="body2">{descripcionesPerros[numeroRamdomDescripcion]}</Typography>
              {/* </CardContent> */}
            {/* </Collapse> */}
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary" onClick={aceptarPerro} disabled={botonesDeshabilitados}>
              Aceptar
            </Button>
            <Button variant="contained" color="secondary" onClick={rechazarPerro} disabled={botonesDeshabilitados}>
              Rechazar
            </Button>
          </CardActions>
        </Card>
      </Grid>
      {renderPerrosA(aceptados, 'Perros Aceptados')}
      {renderPerrosR(rechazados, 'Perros Rechazados')}
    </Grid>
  );
}

export default Home;
