import { useState, useEffect } from 'react';
import { Modal, message } from 'antd';
import FarmerLayout from '../../layouts/FarmerLayout';
import { getFarmerOrders } from '../../services/orderService';
import OrderTable from '../../components/OrderTable';
import OrderDetail from '../../components/OrderDetail';

const FarmerOrderPage = () => {
  // Farmer Order Page component
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [openingOrder, setOpeningOrder] = useState(null);
  const fetchOrders = async () => {
    setLoading(true);
    try {
    const res = await getFarmerOrders();
    const farmerId = JSON.parse(localStorage.getItem('user_id'));
    let filteredOrders = res.data;
    filteredOrders.forEach(order => {
        order.order_products = order.order_products.filter(product => product.product.owner_id === farmerId);
    });
    filteredOrders.forEach(order => {
        order.totalAmount = order.order_products.reduce((total, product) => total + (product.product.price * product.quantity), 0);
    });
    setOrders(filteredOrders);
    } catch (error) {
    message.error('Failed to fetch orders');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const openOpenModal = (order) => {
      console.log('Opening order:', order);
      setOpeningOrder(order);
      setModalVisible(true);
  }
  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  return (
      <FarmerLayout>
          <OrderTable data={orders} loading={loading} onOpen={openOpenModal}/>

          <Modal
              open={modalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
          >
              <OrderDetail order={openingOrder}/>
          </Modal>
      </FarmerLayout>
  );
};

export default FarmerOrderPage;