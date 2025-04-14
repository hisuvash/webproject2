'use server';

import { revalidatePath } from 'next/cache';


export async function updateItem(form) {
  const updatedForm = {
    ...form,
    id: Number(form.id),
    dosage: Number(form.dosage),
  };
  await fetch(`http://localhost:4000/items/${updatedForm.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });

  revalidatePath('/admin');
  revalidatePath('/collection');
  revalidatePath(`/collection/${updatedForm.id}`);
}
