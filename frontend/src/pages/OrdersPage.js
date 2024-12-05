import React, { useState, useEffect } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { fetchData } from '../service/apiService';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [orderItems, setOrderItems] = useState([]);

  const fetchOrders = async () => {
    try {
      const data = await fetchData('orders');
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleViewItems = async (items) => {
    try {
      setOrderItems(items);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching order items:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Orders</h2>

      {/* Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Transaction Number</th>
            <th>Customer</th>
            <th>No. of Items</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer.name}</td>
              <td>{order.items.length}</td>
              <td>{order.status}</td>
              <td>
                <Button variant="info" size="sm" onClick={() => handleViewItems(order.items)}>
                  View Items
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Order Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {orderItems.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.spare_part.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.total_price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No items found for this order.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrdersPage;
