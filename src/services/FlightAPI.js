import axios from "axios";

const flightInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: "application/json",
    app_id: process.env.REACT_APP_APP_ID,
    app_key: process.env.REACT_APP_APP_KEY,
    ResourceVersion: process.env.REACT_APP_RESOURCE_VERSION,
  },
});

export const fetchFlight = (params) =>
  flightInstance.get("flights", { params });
export const fetchAirLine = (id) => flightInstance.get(`airlines/${id}`);
export const fetchAirCraft = (params) =>
  flightInstance.get(`aircrafttypes`, { params });
export const fetchDestination = (id) =>
  flightInstance.get(`destinations/${id}`);
