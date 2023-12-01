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
        const skeletonList = [...new Array(4)].map(() => ({
          loading: true,
        }));
       
        setLoading(true);
        setFlights(
          [...skeletonList,...data]
          
        );
        const paramsObj = Object.fromEntries([...searchParams]);
        delete paramsObj.scheduleDate;
        fetchFlight({...paramsObj,
          toDateTime:data[0]?.scheduleDateTime ? moment(data[0]?.scheduleDateTime).subtract(1,"m").utcOffset("+01:00").format('yyyy-MM-DDTHH:mm:ss') : moment().format('yyyy-MM-DDTHH:mm:ss'), 
          searchDateTimeField:'scheduleDateTime',
          sort:'-scheduleDateTime',
          // page:prevPage+1
        }).then((res) =>{
          console.log("dawda",res?.data?.flights.sort((a,b) => moment(a.scheduleDateTime) - moment(b.scheduleDateTime)))
          const newData2 = [...res?.data?.flights.sort((a,b) => moment(a.scheduleDateTime) - moment(b.scheduleDateTime)), ...data ]
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
    const paramsObj = Object.fromEntries([...filter]);
    fetchFlight({...paramsObj,
      fromDateTime:moment().format('yyyy-MM-DDTHH:mm:ss'), 
      sort:'+scheduleDateTime',
      searchDateTimeField:"scheduleDateTime",
      flightDirection:paramsObj?.flightDirection ?? "D"
     }).then((res) =>{
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
