import React from 'react'
import PropTypes from 'prop-types';
import { List, Skeleton } from 'antd';
import ListItem from './ListItem';

const FlightList = ({data, loadMore, loading, flightDirection}) => {
  return (
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      dataSource={data}
      loading={loading}
      style={{paddingLeft: 100, paddingRight: 100, display: 'flex', justifyContent: 'center', alignItems: 'center'}}
      renderItem={(item) => (
        <Skeleton loading={item?.loading} active>
        <ListItem data={item} flightDirection={flightDirection}/>
        </Skeleton>
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