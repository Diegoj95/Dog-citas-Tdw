import { useQuery } from "react-query";
import axios from "axios";

export function useGetRandomDog(perroInteresadoId) {
    return useQuery(["getRandomDog", perroInteresadoId], async () => {
      const { data } = await axios.get("http://localhost:8000/api/perrosCandidatos", { params: { id: perroInteresadoId } });
      if (data.mensaje === "No hay más perros candidatos") {
        return null; // O puedes devolver un objeto específico que indique que no hay más candidatos
      }
      return data.perrosCandidatos; 
    }, {
      enabled: !!perroInteresadoId,
      refetchOnWindowFocus: false
    });
}


// Esta función obtiene los detalles completos del perro basado en su ID
export function useGetDogDetails(id) {
    return useQuery(["getDogDetails", id], async () => {
        const response = await axios.get('http://localhost:8000/api/listarUnPerro', { params: { id } });
        return response.data.perros;
    }, {
        enabled: !!id
    });
}
