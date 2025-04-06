import Link from 'next/link';
import '@/styles/collection-detail.css'; 

export async function generateStaticParams() {
  const res = await fetch('http://localhost:4000/items');
  const items = await res.json();
  return items.slice(0, 10).map(item => ({ id: item.id.toString() }));
}

export default async function ItemPage({ params }) {
  const res = await fetch(`http://localhost:4000/items/${params.id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return (
      <div className="detail-wrapper">
        <div className="detail-card">
          <p className="error-message">No item found with ID {params.id}.</p>
          <Link href="/collection" className="back-link">← Back to Collection</Link>
        </div>
      </div>
    );
  }

  const item = await res.json();

  return (
    <div className="detail-wrapper">
      <div className="detail-card">
        <Link href="/collection" className="back-link">← Back to Collection</Link>
        <h2>Item Details</h2>
        <table className="detail-table">
          <tbody>
            {Object.entries(item).map(([key, value]) => (
              <tr key={key}>
                <th>{key}</th>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
