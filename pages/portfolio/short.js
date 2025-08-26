import Head from 'next/head';
import DomainCard from '../../components/DomainCard';
import domains from '../../data/domains.json';

export default function ShortView() {
  const filtered = domains.filter((d) => d.length <= 6);
  return (
    <>
      <Head>
        <title>Short .com Domains | Hoshi Vault</title>
        <meta name="description" content="Discover ultra-short domain names for maximum impact." />
        <link rel="canonical" href="/portfolio/short" />
      </Head>
      <div className="container" style={{ padding: 'var(--space-4) 0' }}>
        <h1>Short Domains</h1>
        {filtered.length === 0 ? (
          <p>No short domains available.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
            {filtered.map((domain) => <DomainCard key={domain.slug} domain={domain} />)}
          </div>
        )}
      </div>
    </>
  );
}