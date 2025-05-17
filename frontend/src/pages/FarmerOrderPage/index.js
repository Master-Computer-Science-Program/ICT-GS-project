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
    console.log('Orders:', res.data);
    // const farmerId = JSON.parse(localStorage.getItem('user_id'));
    // const filteredProducts = res.data.filter(product => product.owner_id === farmerId);
    // setProducts(filteredProducts);
    setOrders(res.data);
    } catch (error) {
    message.error('Failed to load orders');
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