import React, { useRef, useState } from "react";
import useFlightData from "hooks/useFlightData";
import FlightList from "components/list/FlightList";
import { Tabs, Input, Button, Select, Row, Col, Flex } from "antd";
import debounce from "lodash.debounce";
import { generateDateOptions } from "utils/Common";
import ListItem from "components/list/ListItem";
const list = [
  {
    key: "D",
    label: "Departures",
  },
  {
    key: "A",
    label: "Arrivals",
  },
];
const Dashboard = () => {
  const {
    flights,
    loading,
    getFlight,
    searchParams,
    setSearchParams,
    onLoadMore,
    onLoadPrevMore,
  } = useFlightData({
    scheduleDate: "2023-12-09",
  });
  const [query, setQuery] = useState(searchParams.get("route"));
  const onChange = (key, value) => {
    setSearchParams((p) => {
      if (value) {
        p.set(key, value);
      } else {
        p.delete(key);
      }
      return p;
    });
  };

  const debouncedFilter = useRef(
    debounce((key, nextValue) => {
      onChange(key, nextValue);
    }, 700)
  ).current;

  return (
    <Col>
      <Row justify="center">
        <Col span={6}>
          <Select
            showSearch
            style={{ width: "300px" }}
            placeholder="Date"
            optionFilterProp="children"
            value={searchParams.get("scheduleDate")}
            onChange={(e) => onChange("scheduleDate", e)}
            options={generateDateOptions()}
          />
        </Col>
        <Col span={12}>
          <Input
            value={query}
            placeholder="IATA CODE"
            maxLength={3}
            onChange={(e) => {
              debouncedFilter("route", e.target.value);
              setQuery(e.target.value);
            }}
          />
        </Col>
      </Row>

      <Row justify="center">
        <Tabs
          items={list}
          activeKey={searchParams.get("flightDirection") ?? "D"}
          onChange={(key) => onChange("flightDirection", key)}
        />
      </Row>
      <Col justify="center">
        <Button
          type="primary"
          onClick={() => {
            onLoadPrevMore();
          }}
        >
          Show earlier flights
        </Button>
        <FlightList
          data={flights}
          loading={loading}
          flightDirection={searchParams.get("flightDirection") || "D"}
        />
        <Button
          type="primary"
          onClick={() => {
            onLoadMore();
          }}
        >
          Show later flights
        </Button>
      </Col>
    </Col>
  );
};

export default Dashboard;
