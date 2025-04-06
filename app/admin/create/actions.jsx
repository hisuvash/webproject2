'use server';

import { revalidatePath } from 'next/cache';

export async function createItem(form) {
  await fetch('http://localhost:4000/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });

  revalidatePath('/admin');
  revalidatePath('/collection');
}
