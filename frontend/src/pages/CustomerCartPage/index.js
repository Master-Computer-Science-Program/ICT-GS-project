import { useContext } from 'react';
import { message, Button } from 'antd';
import { CartContext } from '../../contexts/CartContext';
import CustomerLayout from '../../layouts/CustomerLayout';
import ProductTable from '../../components/ProductTable';

const CustomerCartPage = () => {
    const { cart, removeFromCart, clearCart } = useContext(CartContext);

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

    return (
        <CustomerLayout>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ProductTable
                        data={cart}
                        loading={false}
                        actionRenderer={actionRenderer}
                        showQuantity
                    />

                    <div style={{ marginTop: 20, fontWeight: 'bold', fontSize: 16 }}>
                        Total Price: ${totalPrice.toFixed(2)}
                    </div>

                    <Button
                        type="default"
                        onClick={() => {
                            clearCart();
                            message.success('Cart cleared');
                        }}
                        style={{ marginTop: 10 }}
                    >
                        Clear Cart
                    </Button>
                </>
            )}
        </CustomerLayout>
    );
};

export default CustomerCartPage;
