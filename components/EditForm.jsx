'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateItem } from '@/app/admin/edit/actions';
import '@/styles/edit-form.css'; 

export default function EditForm({ item }) {
  const [form, setForm] = useState(item);
  const [errors, setErrors] = useState([]);
  const router = useRouter();

  const validate = () => {
    const errs = [];

    if (form.name.length < 3 || form.name.length > 14)
      errs.push("Name must be between 3 and 14 characters.");

    if (isNaN(Number(form.dosage)) || Number(form.dosage) <= 20 || Number(form.dosage) > 1000)
      errs.push("Dosage must be a number greater than 20 and less than or equal to 1000.");

    if (!form.email.includes('@') || !form.email.includes('.'))
      errs.push("Email must be valid and include '@' and a domain.");

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    await updateItem(form);
    router.push('/admin');
  };

  return (
    <div className="edit-form-container">
      <h2>Edit Item</h2>

      {errors.length > 0 && (
        <ul className="edit-form-errors">
          {errors.map((err, i) => <li key={i}>{err}</li>)}
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        {Object.entries(form).map(([field, value]) => (
          <div className="edit-form-group" key={field}>
            <label>{field}</label>
            <input
              value={value}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            />
          </div>
        ))}

        <button type="submit" className="edit-form-button">Save</button>
      </form>
    </div>
  );
}
