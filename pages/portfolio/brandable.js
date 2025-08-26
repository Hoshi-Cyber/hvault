import Head from 'next/head';
import DomainCard from '../../components/DomainCard';
import domains from '../../data/domains.json';

export default function BrandableView() {
  const filtered = domains.filter((d) => !d.categories.includes('geo') && !d.categories.includes('short'));
  return (
    <>
      <Head>
        <title>Brandable Domains | Hoshi Vault</title>
        <meta name="description" content="Discover brandable domain names that evoke imagination and trust." />
        <link rel="canonical" href="/portfolio/brandable" />
      </Head>
      <div className="container" style={{ padding: 'var(--space-4) 0' }}>
        <h1>Brandable Domains</h1>
        {filtered.length === 0 ? (
          <p>No brandable domains available.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
            {filtered.map((domain) => <DomainCard key={domain.slug} domain={domain} />)}
          </div>
        )}
      </div>
    </>
  );
}