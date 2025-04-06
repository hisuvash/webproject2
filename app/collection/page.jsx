// app/collection/page.jsx
import Link from 'next/link';

export default async function CollectionPage() {
  const res = await fetch('http://localhost:4000/items');
  const items = await res.json();

  return (
    <main>
      <h1>Medicine List</h1>
      {items.map((item) => (
        <div key={item.id} style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
          <p><strong>ID:</strong> {item.id}</p>
          <p><strong>Name:</strong> {item.name}</p>
          <Link href={`/collection/${item.id}`}>Details</Link>
        </div>
      ))}
    </main>
  );
}
