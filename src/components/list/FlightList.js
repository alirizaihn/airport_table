import React from 'react'
import PropTypes from 'prop-types';
import { Avatard, List, Skeleton } from 'antd';

const FlightList = ({data, loadMore, loading}) => {
  return (
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
        >
          <Skeleton loading={item?.loading} active>
            <List.Item.Meta
              title={<a href="https://ant.design">{item?.flightName}</a>}
              description={item?.scheduleDateTime}
            />
            <div>content</div>
          </Skeleton>
        </List.Item>
      )}
    />
  )
}

FlightList.protoType = {
  data: PropTypes.array
}
FlightList.defaultProps = {
  data: []
}
export default FlightList