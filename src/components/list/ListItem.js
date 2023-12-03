import { Card, Col, Divider, Row, Tag } from "antd";
import moment from "moment";
import React from "react";

const { Meta } = Card;

const ListItem = ({ data, flightDirection }) => {
  const {
    scheduleDateTime,
    flightName,
    airlinePublicName,
    airCraftName,
    destinationName,
    route,
    gate,
    flightStatus,
    estimatedLandingTime,
    baggageStatus,
  } = data;
  return (
    <Card className="flight-card" title="">
      <Row>
        <Col span={4}>
          <span>
            {scheduleDateTime || estimatedLandingTime
              ? moment(
                  flightDirection === "D"
                    ? scheduleDateTime
                    : estimatedLandingTime
                )
                  .utcOffset("+01:00")
                  .format("HH:mm")
              : "-"}
          </span>
        </Col>
        <Divider style={{ height: 75 }} type="vertical" />
        <Col span={8}>
          <Row>
            <span>{`${destinationName} (${route.destinations[0]})`}</span>
          </Row>
          <Row>
            <span>{airlinePublicName}r</span>
          </Row>
        </Col>
        <Divider style={{ height: 75 }} type="vertical" />
        <Col span={4}>
          {" "}
          <Tag color="magenta" style={{ textWrap: "balance" }}>
            {flightStatus}
          </Tag>
        </Col>
        <Divider style={{ height: 75 }} type="vertical" />
        <Col span={4}>{flightDirection === "D" ? gate : baggageStatus}</Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24}>{`${flightName} / ${airCraftName}`}</Col>
      </Row>
    </Card>
  );
};

export default ListItem;
