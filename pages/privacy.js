import Head from 'next/head';

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Hoshi Vault</title>
        <meta name="description" content="Understand how Hoshi Vault collects, uses and protects your personal information." />
      </Head>
      <div className="container" style={{ padding: 'var(--space-5) 0' }}>
        <h1>Privacy Policy</h1>
        <p>We respect your privacy and are committed to protecting your personal data. This policy explains how we collect, use and safeguard your information.</p>
        <h2>Information We Collect</h2>
        <p>We collect information you provide directly to us via forms and communications, including your name, email address and message details.</p>
        <h2>Use of Information</h2>
        <p>Your information is used solely to respond to inquiries, provide requested services and improve our offerings. We do not sell your data.</p>
        <h2>Cookies</h2>
        <p>We use minimal cookies for analytics and performance. See our cookies policy for details.</p>
        <h2>Data Security</h2>
        <p>We implement reasonable measures to protect your information from unauthorised access. However, no online system can guarantee absolute security.</p>
      </div>
    </>
  );
}