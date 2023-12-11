import { useQuery } from "react-query";
import axios from "axios";

// Esta función obtiene un perro aleatorio (solo ID y nombre)
export function useGetRandomDog() {
    return useQuery(["getRandomDog"], async () => {
        const { data } = await axios.get("http://localhost:8000/api/perroRandom");
        return data.perro; 
    }, {
        refetchOnWindowFocus: false
    });
}

// Esta función obtiene los detalles completos del perro basado en su ID
export function useGetDogDetails(id) {
    return useQuery(["getDogDetails", id], async () => {
        const response = await axios.get('http://localhost:8000/api/listarUnPerro', { id });
        return response.data.perros;
    }, {
        enabled: !!id
    });
}
