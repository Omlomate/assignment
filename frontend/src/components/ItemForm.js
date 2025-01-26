import React, { useState, useEffect } from 'react';
import '../assets/itemForm.css';


function ItemForm({ item, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        dateOfBirth: item.dateOfBirth.split('T')[0], // Convert to 'YYYY-MM-DD'
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure _id is included for the edit operation
    const formDataWithId = { ...formData, _id: item ? item._id : undefined };
    onSubmit(formDataWithId); // Pass the form data to onSubmit function
  };

  return (
    <div className="item-form">
      <h2>{item ? 'Edit Item' : 'Add New Item'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">{item ? 'Save Changes' : 'Add Item'}</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default ItemForm;
