import React from 'react'
import { Card, Descriptions, Table, Tag } from 'antd'

const OrderDetail = ({ order , modalVisible}) => {
  const orderProducts = order.order_products.map((item) => ({
    ...item.product,
    quantity: item.quantity,
  }))

  const columns = [
    {
      title: 'Product ID',
      dataIndex: 'id',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Harvest Date',
      dataIndex: 'harvestDate',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
  ]

  return (
  <Card
      title="Order Detail"
      style={{ maxWidth: 600, margin: '0 auto' }}
      bodyStyle={{ maxHeight: 400, overflowY: 'auto' }}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="ID">{order.id}</Descriptions.Item>
        <Descriptions.Item label="Customer ID">{order.customer_id}</Descriptions.Item>
        <Descriptions.Item label="Total Amount">{order.totalAmount}</Descriptions.Item>
        <Descriptions.Item label="Date">{order.date}</Descriptions.Item>
        <Descriptions.Item label="Status">{order.status}</Descriptions.Item>
        <Descriptions.Item label="Payment Method">{order.payment.method}</Descriptions.Item>
        <Descriptions.Item label="Payment Status">{order.payment.status}</Descriptions.Item>
      </Descriptions>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={orderProducts}
        pagination={false}
        style={{ marginTop: 16 }}
      />
    </Card>
  )
}

export default OrderDetail
