import Head from 'next/head';
import domains from '../data/domains.json';
import DomainCard from '../components/DomainCard';

export default function LeasingPage() {
  const leaseDomains = domains.filter((d) => d.status === 'lease');
  return (
    <>
      <Head>
        <title>Lease Premium Domains | Hoshi Vault</title>
        <meta name="description" content="Flexible leasing terms on premium domains with escrow protection." />
      </Head>
      <div className="container" style={{ padding: 'var(--space-5) 0' }}>
        <h1>Lease a Domain</h1>
        <p style={{ marginBottom: 'var(--space-3)' }}>Leasing offers immediate access to premium domains without the up-front capital of a purchase. Flexible terms allow you to test your brand, generate cashflow and retain optionality to buy later.</p>
        <ul style={{ paddingLeft: 'var(--space-3)', listStyle: 'disc', marginBottom: 'var(--space-4)' }}>
          <li>Flexible lease terms of 12, 24 or 36 months</li>
          <li>Monthly payments with buyout option</li>
          <li>Escrow protected transactions</li>
          <li>Dedicated account manager</li>
        </ul>
        <h2>Available for Lease</h2>
        {leaseDomains.length === 0 ? (
          <p>No domains available for lease at this time.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
            {leaseDomains.map((d) => <DomainCard key={d.slug} domain={d} />)}
          </div>
        )}
      </div>
    </>
  );
}