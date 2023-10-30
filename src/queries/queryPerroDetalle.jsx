import { useQuery } from "react-query";
import axios from "axios";

export function useQueryPerroDetalle(params) {
  let habilitado = params.valor !== "";
  return useQuery(["queryPerroDetalle", params], queryPerroDetalle, {
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    keepPreviousData: false,
    enabled: habilitado,
  });
}

export const queryPerroDetalle = async (params) => {
  const [queryName, paramsFilter] = params.queryKey;
  let urlBase = "https://dog.ceo/api/breeds/image/random/";
  const { data } = await axios.get(urlBase + paramsFilter.valor);
  return data;
};
