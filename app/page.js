// app/page.jsx

import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h2>Welcome</h2>
      <p>Please use the Navigation at the right top.</p>
      <ul>
        <li><Link href="/collection">Go to Collection</Link></li>
        <li><Link href="/admin">Go to Admin</Link></li>
      </ul>
    </div>
  );
}
