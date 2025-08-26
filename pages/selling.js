import Head from 'next/head';
import domains from '../data/domains.json';
import DomainCard from '../components/DomainCard';

export default function SellingPage() {
  const availableForSale = domains.filter((d) => d.status === 'buy' || d.status === 'make-offer');
  return (
    <>
      <Head>
        <title>Buy Premium Domains | Hoshi Vault</title>
        <meta name="description" content="Purchase premium digital real estate securely with escrow." />
      </Head>
      <div className="container" style={{ padding: 'var(--space-5) 0' }}>
        <h1>Buy a Domain</h1>
        <p style={{ marginBottom: 'var(--space-3)' }}>Secure your stake in the digital economy with our high-value domain inventory. Each name has been vetted for memorability, market potential and brand alignment.</p>
        <ul style={{ paddingLeft: 'var(--space-3)', listStyle: 'disc', marginBottom: 'var(--space-4)' }}>
          <li>One-time purchase with full ownership transfer</li>
          <li>Escrow protected transactions for peace of mind</li>
          <li>Post-purchase support for transfer and DNS configuration</li>
        </ul>
        <h2>Available for Purchase</h2>
        {availableForSale.length === 0 ? (
          <p>No domains available for purchase at this time.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
            {availableForSale.map((d) => <DomainCard key={d.slug} domain={d} />)}
          </div>
        )}
      </div>
    </>
  );
}