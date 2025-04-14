import EditForm from '@/components/EditForm';

export default async function EditPage({ params }) {
  console.log(params.id)
  const id = (params.id)
  const res = await fetch(`http://localhost:4000/items/${id}`, {
    cache: 'no-store' 
  });
  
  if (!res.ok) {
    return <p>Item with ID {id} not found.</p>;
  }

  const item = await res.json();
  return <EditForm item={item} />;
}
