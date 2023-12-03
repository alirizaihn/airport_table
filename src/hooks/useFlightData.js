import { useEffect, useState } from "react";
import { useToast } from "./useToast";
import { fetchAirCraft, fetchAirLine, fetchDestination, fetchFlight } from "services/FlightAPI";
import { useSearchParams } from "react-router-dom";
import moment from "moment";

const flightStatusType = {
SCH: "Flight scheduled",
DEL: "Delayed",
WIL: "Wait in Lounge",
GTO: "Gate Open",
BRD: "Boarding",
GCL: "Gate Closing",
GTD: "Gate closed",
DEP: "Departed",
CNX: "Cancelled",
GCH: "Gate Change",
TOM: "Tomorrow",
SCH: "Flight scheduled",
AIR: "Airborne",
EXP: "Expected landing",
FIR: "Flight in Dutch airspace",
LND: "Landed",
FIB: "FIBAG",
ARR: "Arrived Flight has been completely handeled",
DIV: "Diverted",
CNX: "Cancelled",
TOM: "Tomorrow",
}

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
    setPage(p=> p + 1);
    setLoading(true);
    setFlights(
      data.concat(
        [...new Array(4)].map(() => ({
          loading: true,
        })),
      ),
    );
    const paramsObj = Object.fromEntries([...searchParams]);
    fetchFlight({...paramsObj,
       page:page+1,
       sort:'+scheduleDateTime',
       fromDateTime:moment().format('yyyy-MM-DDTHH:mm:ss'), 
      searchDateTimeField:"scheduleDateTime",
      flightDirection:paramsObj?.flightDirection ?? "D"
       }).then(async (res) => {
        const response = await mergeAirLines(res?.data.flights || [])
      const newData = data.concat(response);
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
          fromDateTime:undefined,
          toDateTime:data[0]?.scheduleDateTime ? moment(data[0]?.scheduleDateTime).subtract(1,"m").utcOffset("+01:00").format('yyyy-MM-DDTHH:mm:ss') : moment().format('yyyy-MM-DDTHH:mm:ss'), 
          searchDateTimeField:'scheduleDateTime',
          sort:'-scheduleDateTime',
          // page:prevPage+1
        }).then(async (res) =>{
          const response = await mergeAirLines(res?.data?.flights || [])
          const newData2 = [...response.sort((a,b) => moment(a.scheduleDateTime) - moment(b.scheduleDateTime)), ...data ]
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
    setPage(0)
    setLoading(true)
    const paramsObj = Object.fromEntries([...filter]);
    if(moment().diff(paramsObj?.scheduleDate, "d") === 0) {
      delete paramsObj?.scheduleDate;
    }
    fetchFlight({...paramsObj,
      fromDateTime:paramsObj?.scheduleDate ? undefined : moment().format('yyyy-MM-DDTHH:mm:ss'), 
      sort:'+scheduleDateTime',
      searchDateTimeField:paramsObj?.scheduleDate ? undefined : "scheduleDateTime",
      flightDirection:paramsObj?.flightDirection ?? "D"
     }).then(async (res) =>{
      const response = await mergeAirLines(res?.data.flights || [])
      setData(response)
      setFlights(response)
      setLoading(false) 
    })
    .catch(error =>  {
      console.log(error)
      toastError(error?.message)
      setLoading(false) 
       })
  }

  return ({flights, loading, getFlight,searchParams, setSearchParams, onLoadMore, onLoadPrevMore});
};

const mergeAirLines = async (items) =>  {
 return  Promise.all(items.map( async (flight) => {
 const withAirlines = await fetchAirLine(flight?.prefixICAO || flight?.prefixIATA);
 const withAirCraft = await fetchAirCraft({...flight.aircraftType})
 const withDestination = await fetchDestination(flight.route?.destinations[0])
 const flightStatus = flight.publicFlightState.flightStates.map(status => flightStatusType?.[status]).join(",")
 return {...flight, airlinePublicName:withAirlines.data?.publicName || '-', airCraftName:withAirCraft.data.aircraftTypes?.[0]?.shortDescription || '-' , destinationName: withDestination.data?.publicName?.english || '-' ,
flightStatus:flightStatus}}
  )) 
  
}

export default useFlightData;
