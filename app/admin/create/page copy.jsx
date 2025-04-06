'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreatePage() {
  const [form, setForm] = useState({
    id: '',
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
      body: JSON.stringify(form)
    });
    router.push('/admin');
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(form).map((field) => (
        <div key={field}>
          <label>{field}:</label>
          <input
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}
