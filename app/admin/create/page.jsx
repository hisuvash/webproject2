'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/styles/create-page.css'; // ✅ External CSS

export default function CreatePage() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    dosage: '',
    email: ''
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch('http://localhost:4000/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form) // ✅ no `id`
    });

    router.push('/admin');
  };

  return (
    <div className="create-form-container">
      <h2>Create New Item</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(form).map(([field, value]) => (
          <div key={field} className="create-form-group">
            <label>{field}</label>
            <input
              value={value}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            />
          </div>
        ))}
        <button type="submit" className="create-form-button">Submit</button>
      </form>
    </div>
  );
}
