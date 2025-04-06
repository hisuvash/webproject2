// app/admin/page.jsx
import Link from 'next/link';

export default async function AdminPage() {
  const res = await fetch('http://localhost:4000/items');
  const items = await res.json();

  return (
    <main>
      <h1>Admin Route/ Admin Panel</h1>
      <Link href="/admin/create">Create New</Link>
      <table border="1" cellPadding="8" style={{ marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Company</th>
            <th>Dosage</th>
            <th>Email</th>
            <th>Delete</th>
            <th>EDit</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.company}</td>
              <td>{item.dosage}</td>
              <td>{item.email}</td>
              <td><Link href={`/api/delete/${item.id}`}>D</Link></td>
              <td><Link href={`/admin/edit/${item.id}`}>E</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
