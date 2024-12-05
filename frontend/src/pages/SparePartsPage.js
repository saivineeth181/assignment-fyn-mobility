// SparePartsPage.js
import React, { useState, useEffect } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { fetchData, createData, updateData, deleteData } from '../service/apiService';

const SparePartsPage = () => {
  const [spareParts, setSpareParts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', price: '', description: '' });
  const [isEdit, setIsEdit] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchSpareParts = async () => {
    try {
      const data = await fetchData('spareparts');
      setSpareParts(data);
    } catch (error) {
      console.error('Error fetching spare parts:', error);
    }
  };

  useEffect(() => {
    fetchSpareParts();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      if (isEdit) {
        await updateData('spareparts', editingId, formData);
      } else {
        await createData('spareparts', formData);
      }
      setShowModal(false);
      setFormData({ name: '', price: '', description: '' });
      setIsEdit(false);
      fetchSpareParts();
    } catch (error) {
      console.error('Error saving spare part:', error);
    }
  };

  const handleEdit = (sparePart) => {
    setFormData(sparePart);
    setEditingId(sparePart.id);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this spare part?')) {
      try {
        await deleteData('spareparts', id);
        fetchSpareParts();
      } catch (error) {
        console.error('Error deleting spare part:', error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Spare Parts</h2>
      <Button variant="primary" onClick={() => setShowModal(true)} className="mb-3">
        Add New Spare Part
      </Button>

      {/* Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {spareParts.map((sparePart) => (
            <tr key={sparePart.id}>
              <td>{sparePart.id}</td>
              <td>{sparePart.name}</td>
              <td>{sparePart.price}</td>
              <td>{sparePart.description}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(sparePart)} className="me-2">
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(sparePart.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? 'Edit Spare Part' : 'Add New Spare Part'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SparePartsPage;
