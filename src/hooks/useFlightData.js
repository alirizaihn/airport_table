import { useEffect, useState } from "react";
import { useToast } from "./useToast";
import { fetchFlight } from "services/FlightAPI";
import { useSearchParams } from "react-router-dom";
import moment from "moment";
const useFlightData = () => {
  let [searchParams, setSearchParams] = useSearchParams ();
  const [flights, setFlights ] = useState([]);
  const [data, setData] = useState([])
  const { toastError } = useToast();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0)
const [prevPage, setPrevPage] = useState(0);
  useEffect(() => {
    getFlight(searchParams);
  }, [searchParams]);

  const onLoadMore = () => {
    setPage(p=> p + 3);
    setLoading(true);
    setFlights(
      data.concat(
        [...new Array(4)].map(() => ({
          loading: true,
        })),
      ),
    );
    fetchFlight({...Object.fromEntries([...searchParams]), page:page+3,sort:'+scheduleTime' }).then((res) => {
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
      const onLoadPrevMore = () => {
        setPrevPage(p=> p + 1);
        const skeletonList = [...new Array(4)].map(() => ({
          loading: true,
        }));
       
        setLoading(true);
        setFlights(
          [...skeletonList,...data]
          
        );
        fetchFlight({...Object.fromEntries([...searchParams]),
          fromDateTime: moment().subtract(prevPage * 10,'m').format('yyyy-MM-DDTHH:mm:ss'), 
          searchDateTimeField:'scheduleDateTime',
          toDateTime:moment(data[0].scheduleDateTime).format('yyyy-MM-DDTHH:mm:ss')
        }).then((res) =>{
          const newData2 = [...res?.data?.flights, ...data ]
          const newData = newData2.filter((obj, index) => {
            return index === newData2.findIndex(o => obj.id === o.id)}) ;
          setData(newData ?? [])
          setFlights(newData ??  [])
          setLoading(false) 
         })
        .catch(error =>  {
          toastError(error?.message)
          setLoading(false) 
           })
          };
    
  const getFlight = (filter) => {
    
    fetchFlight({...Object.fromEntries([...filter]),scheduleTime:moment().format('HH:mm'),scheduleDate:moment().format('yyyy-MM-DD'), sort:'+scheduleTime' }).then((res) =>{
      setData(res?.data?.flights ?? [])
      setFlights(res?.data?.flights ?? [])
      setLoading(false) 
    })
    .catch(error =>  {
      toastError(error?.message)
      setLoading(false) 
       })
  }

  return ({flights, loading, getFlight,searchParams, setSearchParams, onLoadMore, onLoadPrevMore});
};

export default useFlightData;
