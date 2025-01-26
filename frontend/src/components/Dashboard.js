import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../assets/Dashboard.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ItemForm from './ItemForm'; // Import the ItemForm component

function Dashboard() {
  const [username, setUsername] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // For skeleton loader
  const [editItem, setEditItem] = useState(null); // State to track item being edited
  const [showForm, setShowForm] = useState(false); // To show/hide the form
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if not logged in
    }

    // Fetch the username
    const user = localStorage.getItem('username') || 'Guest';
    setUsername(user);

    // Fetch the items from the backend
    fetchItems();
  }, [navigate]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/items'); // Correct backend API endpoint
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (newItem) => {
    try {
      const response = await axios.post('http://localhost:5000/api/items', newItem); // Correct backend API endpoint
      setItems([...items, response.data]);
      toast.success('Item added successfully');
      setShowForm(false); // Hide form after adding
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error('Failed to add item');
    }
  };

  const handleEditItem = async (updatedItem) => {
    if (!updatedItem._id) {
      toast.error('Item ID is missing');
      return;
    }
  
    try {
      await axios.put(`http://localhost:5000/api/items/${updatedItem._id}`, updatedItem); // Ensure that _id is included in the URL
      setItems(items.map((item) => (item._id === updatedItem._id ? { ...item, ...updatedItem } : item)));
      toast.success('Item updated successfully');
      setShowForm(false); // Hide form after editing
    } catch (error) {
      console.error('Error updating item:', error);
      toast.error('Failed to update item');
    }
  };
  

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`); // Correct backend API endpoint
      setItems(items.filter((item) => item._id !== id));
      toast.success('Item deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete item');
    }
  };

  const handleAddClick = () => {
    setEditItem(null); // Reset the edit item state
    setShowForm(true); // Show the form for adding new item
  };

  const handleCancel = () => {
    setShowForm(false); // Hide the form
  };

  return (
    <div className="dashboard">
      <h1>Hello, {username}</h1>
      {loading ? (
        <div className="loader">Loading...</div> // Add your skeleton loader component or CSS here
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Date of Birth</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>
                  {Math.floor(
                    (new Date() - new Date(item.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000)
                  )}
                </td>
                <td>{new Date(item.dateOfBirth).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => { setEditItem(item); setShowForm(true); }}>Edit</button>
                  <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Show ItemForm for adding or editing items */}
      {showForm && (
        <ItemForm
          item={editItem} // Pass the item to edit or null for new item
          onSubmit={editItem ? handleEditItem : handleAddItem} // Pass appropriate function for submit
          onCancel={handleCancel} // Cancel button handler
        />
      )}

      <button onClick={handleAddClick}>Add New Item</button>
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
