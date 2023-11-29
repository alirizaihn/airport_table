import React, { useEffect, useState } from "react";
import { Button } from "antd";
import useFlightData from "hooks/useFlightData";
import FlightList from "components/list/FlightList";
import { Tabs,Input } from "antd";
import { useSearchParams } from "react-router-dom";

const list = [
  {
    key: "D",
    label: "Departures",
    children: "Content of Tab Pane 1",
  },
  {
    key: "A",
    label: "Arrivals",
    children: "Content of Tab Pane 2",
  },
];
const Dashboard = () => {
  const queryParameters = new URLSearchParams(window.location.search)
  let [searchParams, setSearchParams] = useSearchParams();
  const { flights, loading, getFlight } = useFlightData({
    scheduleDate: "2023-12-09",
  });
  const [filter, setFilter] = useState({
    scheduleDate: null,
    flightDirection: null,
    route: null

  });

  const resetFilter = () => {
    setFilter({ scheduleDate: null,
    flightDirection: null,
    route: null,})
  }

  const onChangeFilter = (key, value) => {
    setFilter((p) => ({ ...p, [key]: value }));
  };
  const onChangeIATACode = (code) => {
    if(code.length > 2) {
      // onChangeFilter('route', code)
    }
  }
  useEffect(() => {
   getFlight(searchParams)
  }, [searchParams])
  
  return (
    <div>
      <Input placeholder="IATA CODE" maxLength={3} onChange={(e) => onChangeIATACode(e.target.value)}/>
      <Tabs
        defaultActiveKey="1"
        items={list}
        onChange={(key) => {
          console.log("lkasdawda",searchParams)
          setSearchParams({...searchParams})
        }}
      />
      <FlightList data={flights} loading={loading} />
      <Button
        type="primary"
        onClick={() => {
          onChangeFilter('scheduleDate', "2023-12-10")
          // getFlight({ scheduleDate: "2023-12-10" });
        }}
      >
        Button
      </Button>
    </div>
  );
};

export default Dashboard;
