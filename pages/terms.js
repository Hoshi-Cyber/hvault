import Head from 'next/head';

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms of Service | Hoshi Vault</title>
        <meta name="description" content="Read the terms and conditions governing your use of Hoshi Vault’s services." />
      </Head>
      <div className="container" style={{ padding: 'var(--space-5) 0' }}>
        <h1>Terms of Service</h1>
        <p>The following terms and conditions ("Terms") govern your access to and use of the Hoshi Vault website and services. By accessing or using our platform you agree to be bound by these Terms.</p>
        <h2>Use of Service</h2>
        <p>You may use our services only in compliance with applicable laws. You agree not to misuse our services or assist anyone in doing so.</p>
        <h2>Transactions</h2>
        <p>All domain leasing and purchase transactions are conducted via an independent escrow provider. You agree to abide by the escrow provider’s terms and complete KYC requirements as applicable.</p>
        <h2>Intellectual Property</h2>
        <p>All content on this site is the property of Hoshi Vault and may not be reproduced without permission.</p>
        <h2>Limitation of Liability</h2>
        <p>Hoshi Vault shall not be liable for any indirect or consequential damages arising from the use of our services.</p>
        <h2>Changes</h2>
        <p>We reserve the right to modify these Terms at any time. Changes will be posted on this page.</p>
      </div>
    </>
  );
}