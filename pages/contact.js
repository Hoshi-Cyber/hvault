import Head from 'next/head';

export default function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for contacting us. We will reply shortly.');
  };
  return (
    <>
      <Head>
        <title>Contact Hoshi Vault</title>
        <meta name="description" content="Get in touch to lease, buy, or request a curated domain shortlist." />
      </Head>
      <div className="container" style={{ padding: 'var(--space-5) 0' }}>
        <h1>Contact Us</h1>
        <p>Please fill out the form below and our team will respond promptly.</p>
        <form onSubmit={handleSubmit} style={{ maxWidth: '600px', marginTop: 'var(--space-3)', display: 'grid', gap: 'var(--space-3)' }} noValidate>
          <label>
            <span className="sr-only">Name</span>
            <input type="text" name="name" placeholder="Your Name" required style={{ padding: 'var(--space-2)', border: `1px solid var(--color-border)`, borderRadius: 'var(--radius)' }} />
          </label>
          <label>
            <span className="sr-only">Email</span>
            <input type="email" name="email" placeholder="Email Address" required style={{ padding: 'var(--space-2)', border: `1px solid var(--color-border)`, borderRadius: 'var(--radius)' }} />
          </label>
          <label>
            <span className="sr-only">Message</span>
            <textarea name="message" placeholder="How can we help you?" rows={5} required style={{ padding: 'var(--space-2)', border: `1px solid var(--color-border)`, borderRadius: 'var(--radius)', resize: 'vertical' }} />
          </label>
          <button type="submit" style={{ background: 'var(--color-accent-primary)', color: '#fff', padding: 'var(--space-2)', borderRadius: 'var(--radius)', border: 'none' }}>Send Message</button>
        </form>
      </div>
    </>
  );
}