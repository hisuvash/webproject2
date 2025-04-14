'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { deleteItem } from './actions';
import '@/styles/admin-page.css';

export default function AdminPage() {
  const [items, setItems] = useState([]);
  const [sortCompany, setSortCompany] = useState(null); // do not sort company at first

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

  const toggleCompanySort = () => {
    setSortCompany(prev =>
      prev === 'asc' ? 'desc' : 'asc'
    );
  };

  const sortedItems = () => {
    if (sortCompany === null) return items;

    return [...items].sort((a, b) => {
      return sortCompany === 'asc'
        ? a.company.localeCompare(b.company)
        : b.company.localeCompare(a.company);
    });
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
            <th>
              Company
              <button onClick={toggleCompanySort} className="sort-button">
                {sortCompany === 'asc' && '▲'}
                {sortCompany === 'desc' && '▼'}
                {sortCompany === null && '↕'}
              </button>
            </th>
            <th>Dosage</th>
            <th>Email</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems().map((item) => (
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
