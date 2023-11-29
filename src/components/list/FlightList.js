import React from 'react'
import PropTypes from 'prop-types';
import { Avatard, List, Skeleton } from 'antd';

const FlightList = ({data, loadMore, loading}) => {
  return (
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      initialLoading={loading}
      loadMore={loadMore}
      dataSource={data.map(item => ({...item, loading:true}))}
      renderItem={(item) => (
        <List.Item
          actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
        >
          <Skeleton avatar title={false} loading={false} active>
            <List.Item.Meta
              title={<a href="https://ant.design">{item.flightName}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
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