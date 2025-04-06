'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateItem } from '../app/admin/edit/actions';

export default function EditForm({ item }) {
  const [form, setForm] = useState(item);
  const [errors, setErrors] = useState([]);
  const router = useRouter();

  const validate = () => {
    const errs = [];
    if (form.name.length < 3 || form.name.length > 14)
      errs.push("Name must be between 3 and 14 characters.");
    if (Number(form.dosage) <= 20)
      errs.push("Dosage must be greater than 20.");
    if (!form.email.includes('@'))
      errs.push("Email must be valid.");
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (errs.length > 0) {
      setErrors(errs);
      return;
    }

    await updateItem(form);
    router.push('/admin');
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.length > 0 && (
        <ul style={{ color: 'red' }}>
          {errors.map((err, i) => <li key={i}>{err}</li>)}
        </ul>
      )}
      {Object.keys(form).map((field) => (
        <div key={field}>
          <label>{field}</label>
          <input
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          />
        </div>
      ))}
      <button type="submit">Save</button>
    </form>
  );
}
