'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { deleteItem } from './actions';
import '@/styles/admin-page.css'; 

export default function AdminPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/items')
      .then(res => res.json())
      .then(setItems);
  }, []);

  const handleDelete = async (id) => {
    if (confirm(`Are you sure you want to delete item ${id}?`)) {
      await deleteItem(id);
      setItems(items.filter(item => item.id !== id));
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>
      <Link href="/admin/create" className="admin-create-link">Create New</Link>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Company</th>
            <th>Dosage</th>
            <th>Email</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.company}</td>
              <td>{item.dosage}</td>
              <td>{item.email}</td>
              <td>
                <button onClick={() => handleDelete(item.id)}>D</button>
              </td>
              <td>
                <Link href={`/admin/edit/${item.id}`}>E</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
