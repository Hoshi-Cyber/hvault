import Head from 'next/head';
import DomainCard from '../../components/DomainCard';
import domains from '../../data/domains.json';

export default function PremiumView() {
  const filtered = domains.filter((d) => {
    if (d.price_type === 'fixed') return d.price_value >= 7000;
    if (Array.isArray(d.price_value)) return d.price_value[0] >= 7000;
    return false;
  });
  return (
    <>
      <Head>
        <title>Premium Domains | Hoshi Vault</title>
        <meta name="description" content="Browse our highest-value premium domains available for strategic acquisitions." />
        <link rel="canonical" href="/portfolio/premium" />
      </Head>
      <div className="container" style={{ padding: 'var(--space-4) 0' }}>
        <h1>Premium Domains</h1>
        {filtered.length === 0 ? (
          <p>No premium domains available.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
            {filtered.map((domain) => <DomainCard key={domain.slug} domain={domain} />)}
          </div>
        )}
      </div>
    </>
  );
}