import Link from 'next/link';
import '@/styles/layout.css'; 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>My Next.js App</title>
      </head>
      <body>
        <header className="navbar">
          <nav>
            <h1 className="nav-title"> Project #2</h1>
            <ul className="nav-links">
              <li><Link href="/collection">Collection</Link></li>
              <li><Link href="/admin">Admin</Link></li>
            </ul>
          </nav>
        </header>

        <main className="main-content">{children}</main>

        <footer className="footer">
          <p>© 2025 Project2·</p>
        </footer>
      </body>
    </html>
  );
}
