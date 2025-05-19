import { useEffect, useState } from 'react';
import { Table, Button, Modal, message, Tag } from 'antd';
import CustomerLayout from '../../layouts/CustomerLayout';
import {
  getCustomerOrders,
  makePayment,
  confirmReceipt
} from '../../services/orderService';

const CustomerOrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getCustomerOrders();
        setOrders(response.data);
      } catch (error) {
        console.error(error);
        message.error('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handlePay = async (orderId) => {
    try {
      await makePayment(orderId);
      message.success('Payment successful');
      window.location.reload();
    } catch (error) {
      console.error(error);
      message.error('Payment failed');
    }
  };

  const handleReceive = async (orderId) => {
    try {
      await confirmReceipt(orderId);
      message.success('Order marked as received');
      window.location.reload();
    } catch (error) {
      console.error(error);
      message.error('Failed to confirm receipt');
    }
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date'
    },
    {
    title: 'Order Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      let color = 'default';
      if (status === 'received') color = 'green';
      else if (status === 'shipped') color = 'blue';
      else if (status === 'pending') color = 'orange';
      return <Tag color={color}>{status.toUpperCase()}</Tag>;
    }
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (value) => `$${value.toFixed(2)}`
    },
    {
      title: 'Payment Status',
      dataIndex: ['payment', 'status'],
      key: 'paymentStatus',
      render: (status) => (
        <Tag color={status === 'paid' ? 'green' : 'orange'}>{status}</Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setSelectedOrder(record);
              setDetailModalVisible(true);
            }}
          >
            Detail
          </Button>

          {record.payment.status === 'pending' && (
            <Button type="link" onClick={() => handlePay(record.id)}>
              Pay
            </Button>
          )}

          {record.payment.status === 'paid' && record.status !== 'received' && (
            <Button type="link" onClick={() => handleReceive(record.id)}>
              Confirm Receive
            </Button>
          )}
        </>
      )
    }
  ];

  return (
    <CustomerLayout>
      <Table
        dataSource={orders}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        onOk={() => setDetailModalVisible(false)}
        title={`Order Details - #${selectedOrder?.id}`}
        width={700}
      >
        {selectedOrder ? (
          <div>
            <p><strong>Date:</strong> {selectedOrder.date}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Total Amount:</strong> ${selectedOrder.totalAmount.toFixed(2)}</p>
            <p><strong>Payment:</strong> {selectedOrder.payment.method} - {selectedOrder.payment.status}</p>
            <hr />
            <h4>Products:</h4>
            <ul>
              {selectedOrder.order_products.map((op, idx) => (
                <li key={idx}>
                  <strong>{op.product.type}</strong> — Quantity: {op.quantity}, Unit Price: ${op.product.price.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Modal>
    </CustomerLayout>
  );
};

export default CustomerOrderHistoryPage;
