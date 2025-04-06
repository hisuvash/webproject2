// app/page.jsx

import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h2>Welcome 👋</h2>
      <p>This is the homepage of your Project #2 app.</p>
      <ul>
        <li><Link href="/collection">Go to Collection</Link></li>
        <li><Link href="/admin">Go to Admin</Link></li>
      </ul>
    </div>
  );
}
