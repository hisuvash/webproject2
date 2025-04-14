'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/styles/create-page.css';

export default function CreatePage() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    dosage: '',
    email: ''
  });

  const [errors, setErrors] = useState([]);
  const router = useRouter();

  const validate = () => {
    const errs = [];

    if (form.name.trim().length < 3 || form.name.trim().length > 14) {
      errs.push("Name must be between 3 and 14 characters.");
    }

    if (!form.company.trim()) {
      errs.push("Company is required.");
    }

    const dosage = Number(form.dosage);
    if (isNaN(dosage) || dosage <= 20) {
      errs.push("Dosage must be a number greater than 20.");
    }

    if (!form.email.includes('@') || !form.email.includes('.')) {
      errs.push("Email must be valid.");
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    await fetch('http://localhost:4000/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    router.push('/admin');
  };

  return (
    <div className="create-form-container">
      <h2>Create New Item</h2>

      {errors.length > 0 && (
        <ul className="create-form-errors">
          {errors.map((err, i) => <li key={i}>{err}</li>)}
        </ul>
      )}

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
