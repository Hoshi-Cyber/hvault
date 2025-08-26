import Head from 'next/head';

export default function EscrowProcess() {
  const steps = [
    'Agreement on price/terms',
    'Escrow account initiation',
    'Buyer funds escrow',
    'Domain transfer initiated',
    'Buyer confirms receipt',
    'Escrow releases funds'
  ];
  return (
    <>
      <Head>
        <title>Escrow Process | Hoshi Vault</title>
        <meta name="description" content="Understand the secure escrow process for domain transactions at Hoshi Vault." />
      </Head>
      <div className="container" style={{ padding: 'var(--space-5) 0' }}>
        <h1>Escrow Process</h1>
        <p>All transactions at Hoshi Vault are conducted via independent escrow to ensure security and trust. Below are the steps involved in every purchase or lease.</p>
        <ol style={{ paddingLeft: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
          {steps.map((step, idx) => (
            <li key={idx} style={{ marginBottom: 'var(--space-2)' }}><strong>Step {idx + 1}:</strong> {step}</li>
          ))}
        </ol>
        <p>For leases longer than 12 months, buyer identity verification (KYC) is required. A banner across the site reminds visitors that all transactions are completed via independent escrow.</p>
      </div>
    </>
  );
}