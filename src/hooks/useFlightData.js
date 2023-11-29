import { useEffect, useState } from "react";
import { useToast } from "./useToast";
import { fetchFlight } from "services/FlightAPI";
import { useSearchParams } from "react-router-dom";

const useFlightData = () => {
  let [searchParams, setSearchParams] = useSearchParams ();
  const [flights, setFlights ] = useState([]);
  const [data, setData] = useState([])
  const { toastError } = useToast();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    getFlight(searchParams);
  }, [searchParams]);

  const onLoadMore = () => {
    setLoading(true);
    setFlights(
      data.concat(
        [...new Array(4)].map(() => ({
          loading: true,
        })),
      ),
    );
    fetchFlight(searchParams).then((res) =>{
      const newData = data.concat(res?.data?.flights ?? []);
      setData(newData ?? [])
      setFlights(newData ?? [])
      setLoading(false) 
     })
    .catch(error =>  {
      toastError(error?.message)
      setLoading(false) 
       })
      };

  const getFlight = (filter) => {
    fetchFlight(filter).then((res) =>{
      setData(res?.data?.flights ?? [])
      setFlights(res?.data?.flights ?? [])
      setLoading(false) 
    })
    .catch(error =>  {
      toastError(error?.message)
      setLoading(false) 
       })
  }

  return ({flights, loading, getFlight,searchParams, setSearchParams, onLoadMore});
};

export default useFlightData;
