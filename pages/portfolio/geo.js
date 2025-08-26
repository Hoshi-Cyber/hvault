import Head from 'next/head';
import DomainCard from '../../components/DomainCard';
import domains from '../../data/domains.json';

export default function GeoView() {
  const filtered = domains.filter((d) => d.categories.includes('geo'));
  return (
    <>
      <Head>
        <title>Geo & Category Domains | Hoshi Vault</title>
        <meta name="description" content="Explore premium geo and category domains curated by Hoshi Vault." />
        <link rel="canonical" href="/portfolio/geo" />
      </Head>
      <div className="container" style={{ padding: 'var(--space-4) 0' }}>
        <h1>Geo & Category Domains</h1>
        {filtered.length === 0 ? (
          <p>No geo domains available.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
            {filtered.map((domain) => <DomainCard key={domain.slug} domain={domain} />)}
          </div>
        )}
      </div>
    </>
  );
}