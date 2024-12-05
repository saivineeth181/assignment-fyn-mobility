import React, { useState, useEffect } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import { fetchData, createData } from '../service/apiService';

const PointOfSalePage = () => {
  const [spareParts, setSpareParts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalCheckoutValue, setTotalCheckoutValue] = useState(0);
  const [customerId, setCustomerId] = useState('');
  const [customers, setCustomers] = useState([]);
  const [orderStatus, setOrderStatus] = useState('Pending');

  const fetchSpareParts = async () => {
    try {
      const data = await fetchData('spareparts');
      setSpareParts(data);
    } catch (error) {
      console.error('Error fetching spare parts:', error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const data = await fetchData('customers');
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  useEffect(() => {
    fetchSpareParts();
    fetchCustomers();
  }, []);

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.total_price, 0);
    setTotalCheckoutValue(total);
  }, [cart]);

  const handleAddToCart = (sparePart) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.spare_part.id === sparePart.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.spare_part.id === sparePart.id
            ? { ...item, quantity: item.quantity + 1, total_price: (item.quantity + 1) * sparePart.price }
            : item
        );
      } else {
        return [
          ...prevCart,
          { spare_part: sparePart, quantity: 1, total_price: sparePart.price },
        ];
      }
    });
  };

  const handleRemoveFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.spare_part.id !== id));
  };

  const handlePlaceOrder = async () => {
    if (!customerId) {
      alert('Please select a customer.');
      return;
    }

    const orderPayload = {
      customer: customerId,
      status: orderStatus,
      total_price: totalCheckoutValue,
      items: cart.map((item) => ({
        spare_part: {
          id: item.spare_part.id,
          name: item.spare_part.name,
          price: item.spare_part.price,
          description: item.spare_part.description,
        },
        quantity: item.quantity,
        total_price: item.total_price,
      })),
    };

    try {
      await createData('orders/create', orderPayload);
      alert('Order placed successfully!');
      setCart([]);
      setCustomerId('');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Point of Sale</h2>

      {/* Select Customer */}
      <div className="mb-4">
        <Form.Group>
          <Form.Label>Select Customer</Form.Label>
          <Form.Select
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          >
            <option value="">Select a customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </div>

      {/* Spare Parts Table */}
      <h5>Available Spare Parts</h5>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {spareParts.map((sparePart) => (
            <tr key={sparePart.id}>
              <td>{sparePart.name}</td>
              <td>{sparePart.price}</td>
              <td>{sparePart.description}</td>
              <td>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleAddToCart(sparePart)}
                >
                  Add to Cart
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Cart */}
      <h5 className="mt-4">Cart</h5>
      {cart.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.spare_part.id}>
                <td>{item.spare_part.name}</td>
                <td>{item.quantity}</td>
                <td>{item.total_price}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveFromCart(item.spare_part.id)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No items in the cart.</p>
      )}

      {/* Total Checkout Value */}
      <div className="mt-3">
        <h4>Total Checkout Value: ₹{totalCheckoutValue.toFixed(2)}</h4>
      </div>

      <Button variant="primary" className="mt-3" onClick={handlePlaceOrder}>
        Place Order
      </Button>
    </div>
  );
};

export default PointOfSalePage;
