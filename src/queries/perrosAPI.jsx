import axios from 'axios';

export async function obtenerFotoDePerro() {
  try {
    const response = await axios.get('https://dog.ceo/api/breeds/image/random');
    if (response.status !== 200) {
      throw new Error('No se pudo obtener la foto del perro.');
    }
    return response.data.message; // Devuelve la URL de la foto del perro
  } catch (error) {
    console.error('Error al obtener la foto del perro:', error);
    throw error;
  }
}
