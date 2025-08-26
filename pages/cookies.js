import Head from 'next/head';

export default function CookiesPage() {
  return (
    <>
      <Head>
        <title>Cookies Policy | Hoshi Vault</title>
        <meta name="description" content="Learn about the cookies we use to improve your experience on Hoshi Vault." />
      </Head>
      <div className="container" style={{ padding: 'var(--space-5) 0' }}>
        <h1>Cookies Policy</h1>
        <p>We use cookies and similar technologies to improve your browsing experience and analyse traffic. Cookies are small text files stored on your device.</p>
        <h2>Types of Cookies</h2>
        <ul style={{ paddingLeft: 'var(--space-3)', listStyle: 'disc' }}>
          <li><strong>Essential Cookies:</strong> Necessary for basic site functionality.</li>
          <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site.</li>
          <li><strong>Functional Cookies:</strong> Remember your preferences and settings.</li>
        </ul>
        <h2>Managing Cookies</h2>
        <p>You can control cookies through your browser settings. Disabling cookies may affect site functionality.</p>
      </div>
    </>
  );
}