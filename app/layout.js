// app/layout.jsx

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>My Next.js App</title>
      </head>
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif', background: '#f9f9f9' }}>
        <header style={{ padding: '1rem', background: '#333', color: '#fff' }}>
          <h1>My Project #2 </h1>
        </header>
        <main style={{ padding: '2rem' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
