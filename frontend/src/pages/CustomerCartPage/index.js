import { useContext, useState } from 'react';
import { message, Button, Modal, Radio } from 'antd';
import { CartContext } from '../../contexts/CartContext';
import CustomerLayout from '../../layouts/CustomerLayout';
import ProductTable from '../../components/ProductTable';
import { createOrder } from '../../services/orderService';

const CustomerCartPage = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [loading, setLoading] = useState(false);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const actionRenderer = (product) => (
    <Button
      type='default'
      onClick={() => {
        removeFromCart(product.id);
        message.success(`${product.title} removed from cart`);
      }}
    >
      Remove
    </Button>
  );

  const submitOrder = async () => {
    const data = {
      date: new Date().toISOString().split('T')[0],
      order_products: cart.map(item => ({
        product_id: item.id,
        quantity: item.quantity
      })),
      payment: {
        method: paymentMethod
      }
    };

    try {
      setLoading(true);
      await createOrder(data);
      message.success('Order placed successfully!');
      localStorage.removeItem('cart');
      clearCart();
      window.location.reload();
    } catch (error) {
      console.error('Order failed:', error);
      message.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
      setIsModalVisible(false);
    }
  };

  return (
    <CustomerLayout>
      {cart.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: 50, fontSize: 18 }}>
          Your cart is empty.
        </p>
      ) : (
        <>
          <ProductTable
            data={cart}
            loading={false}
            actionRenderer={actionRenderer}
            showQuantity
          />

          <div style={{
            marginTop: 20,
            fontWeight: 'bold',
            fontSize: 16,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>Total Price: ${totalPrice.toFixed(2)}</span>

            <div>
              <Button
                type="default"
                onClick={() => {
                  clearCart();
                  message.success('Cart cleared');
                }}
                style={{ marginRight: 10 }}
              >
                Clear Cart
              </Button>

              <Button
                type="primary"
                onClick={() => setIsModalVisible(true)}
              >
                Order Now
              </Button>
            </div>
          </div>

          <Modal
            title="Select Payment Method"
            open={isModalVisible}
            onOk={submitOrder}
            onCancel={() => setIsModalVisible(false)}
            confirmLoading={loading}
            okText="Confirm Order"
            >
            <div style={{ padding: '10px 0' }}>
                <Radio.Group
                onChange={(e) => setPaymentMethod(e.target.value)}
                value={paymentMethod}
                style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                >
                <Radio value="cash">Cash</Radio>
                <Radio value="card">Card</Radio>
                </Radio.Group>
            </div>
          </Modal>

        </>
      )}
    </CustomerLayout>
  );
};

export default CustomerCartPage;
