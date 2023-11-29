import { useEffect, useState } from "react";
import { useToast } from "./useToast";
import { fetchFlight } from "services/FlightAPI";


const useFlightData = (params) => {
  const [flights, setFlights ] = useState([]);
  const { toastError } = useToast();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    getFlight(params);
  }, []);

  const getFlight = (filter) => {
    fetchFlight(filter).then((res) =>{
      setFlights(res)
      setLoading(false) 

    })
    .catch(error =>  {
      toastError(error?.message)
      setLoading(false) 
       })
  }

  return ({flights, loading, getFlight});
};

export default useFlightData;
