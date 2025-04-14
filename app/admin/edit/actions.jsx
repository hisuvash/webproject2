'use server';

import { revalidatePath } from 'next/cache';


export async function updateItem(form) {
  await fetch(`http://localhost:4000/items/${form.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });

  revalidatePath('/admin');
  revalidatePath('/collection');
  revalidatePath(`/collection/${form.id}`);
}
