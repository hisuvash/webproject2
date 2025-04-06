// app/collection/[id]/page.jsx
import Link from 'next/link';

export async function generateStaticParams() {
  const res = await fetch('http://localhost:4000/items');
  const items = await res.json();
  return items.slice(0, 10).map((item) => ({ id: item.id.toString() }));
}

export default async function ItemPage({ params }) {
  const res = await fetch(`http://localhost:4000/items/${params.id}`);

  if (!res.ok) {
    return <p>No item found with ID {params.id}.</p>;
  }

  const item = await res.json();

  return (
    <main>
      <Link href="/collection">← Back</Link>
      <h1>Item Details</h1>
      <table>
        <tbody>
          {Object.entries(item).map(([key, value]) => (
            <tr key={key}><td>{key}</td><td>{value}</td></tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
