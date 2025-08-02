export default function Home() {
  return (
    <main style={{ fontFamily: 'system-ui', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Jaipi Proxy</h1>
      <form action="/api/proxy" method="GET">
        <input 
          type="url" 
          name="url" 
          placeholder="https://example.com" 
          required
          style={{ padding: '10px', width: '70%' }}
        />
        <button type="submit" style={{ padding: '10px' }}>Proxy It</button>
      </form>
    </main>
  );
}
