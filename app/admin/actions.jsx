'use server';

import { revalidatePath } from 'next/cache';

export async function deleteItem(id) {
  // Delete the item
  await fetch(`http://localhost:4000/items/${id}`, {
    method: 'DELETE',
  });

  // Revalidate all relevant paths
  revalidatePath('/admin');
  revalidatePath('/collection');
  revalidatePath(`/collection/${id}`);
}
