import EditForm from '@/components/EditForm';

export default async function EditPage({ params }) {
  const res = await fetch(`http://localhost:4000/items/${params.id}`);
  
  if (!res.ok) {
    return <p>Item with ID {params.id} not found.</p>;
  }

  const item = await res.json();
  return <EditForm item={item} />;
}
