import { useEffect, useState } from "react";
import { getFlight } from "../services/FlightAPI";
import { useToast } from "./useToast";

const useFlightData = (params) => {
  const [flights, setFlights ] = useState([]);
  const { toastError } = useToast();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    getFlight(params).then((res) =>{
          setFlights(res)
          setLoading(false) 
        })
        .catch(error =>  {
          toastError(error?.message)
          setLoading(false) 
           })
  }, []);

 
  return ({flights, loading});
};

export default useFlightData;
