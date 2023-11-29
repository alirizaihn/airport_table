import React, { useRef, useState } from "react";
import useFlightData from "hooks/useFlightData";
import FlightList from "components/list/FlightList";
import { Tabs, Input,Button } from "antd";
import debounce from 'lodash.debounce'
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
  
  const { flights, loading, getFlight,searchParams, setSearchParams,onLoadMore } = useFlightData({
    scheduleDate: "2023-12-09",
  });
  const [query, setQuery] = useState(searchParams.get("route"));
  const onChange = (key ,value) => {
    setSearchParams((p) => {
      if (value) {
        p.set(key, value);
      } else {
        p.delete(key)
      }
      return p;
    })
  }
  
const debouncedFilter = useRef (
    debounce((key, nextValue) => {
        onChange(key, nextValue )
    }, 700),
  ).current

  return (
    <div>
       <Button
        type="primary"
        onClick={() => {
          // onChangeFilter('scheduleDate', "2023-12-10")
          // getFlight({ scheduleDate: "2023-12-10" });
        }}
      >
        Button
      </Button>
      <Input
        value={query}
        placeholder="IATA CODE"
        maxLength={3}
        onChange={(e) =>{
          debouncedFilter('route',e.target.value);
          setQuery(e.target.value);}
        }
      />
      <Tabs
        defaultActiveKey="1"
        items={list}
        onChange={(key) =>
          onChange("flightDirection", key)
        }
      />
      <FlightList data={flights} loading={loading}  />
      <Button
        type="primary"
        onClick={() => {
          onLoadMore();
        }}
      >
        Button
      </Button>
    </div>
  );
};

export default Dashboard;
