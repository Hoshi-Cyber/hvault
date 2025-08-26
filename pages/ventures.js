import Head from 'next/head';

export default function VenturesPage() {
  return (
    <>
      <Head>
        <title>Domain‑Backed Ventures | Hoshi Vault</title>
        <meta name="description" content="Explore opportunities to incubate ventures on premium domains (coming soon)." />
      </Head>
      <div className="container" style={{ padding: 'var(--space-5) 0' }}>
        <h1>Domain‑Backed Ventures</h1>
        <p>We’re building a portfolio of microbrands and niche businesses powered by premium domains. Check back soon for updates.</p>
      </div>
    </>
  );
}