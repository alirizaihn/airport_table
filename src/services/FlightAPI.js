import axios from "axios";

const flightInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        Accept: "application/json",
        app_id: process.env.REACT_APP_APP_ID,
        app_key: process.env.REACT_APP_APP_KEY,
        ResourceVersion: process.env.REACT_APP_RESOURCE_VERSION 
        
      }
  })

  export const fetchFlight = (params) => new Promise ((resolve, reject) => {
    flightInstance.get('flights', {params})
    .then(res => resolve(res?.data?.flights ?? []))
    .catch(error => reject(error))
  }) 
