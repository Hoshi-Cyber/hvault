import Head from 'next/head';
import categories from '../data/categories.json';

export default function RequestShortlistPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for requesting a shortlist! We will respond shortly.');
  };
  return (
    <>
      <Head>
        <title>Request a Domain Shortlist | Hoshi Vault</title>
        <meta name="description" content="Tell us about your brand and let our experts curate a shortlist of premium domains for you." />
      </Head>
      <div className="container" style={{ padding: 'var(--space-5) 0' }}>
        <h1>Request a Domain Shortlist</h1>
        <p>Provide a few details about your project and we will curate a custom shortlist of names tailored to your needs.</p>
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
            <span className="sr-only">Preferred category</span>
            <select name="category" style={{ padding: 'var(--space-2)', border: `1px solid var(--color-border)`, borderRadius: 'var(--radius)' }}>
              <option value="">Preferred Category</option>
              {categories.map((cat) => (<option key={cat.slug} value={cat.slug}>{cat.name}</option>))}
            </select>
          </label>
          <label>
            <span className="sr-only">Budget</span>
            <input type="number" name="budget" placeholder="Budget (USD)" style={{ padding: 'var(--space-2)', border: `1px solid var(--color-border)`, borderRadius: 'var(--radius)' }} />
          </label>
          <label>
            <span className="sr-only">Notes</span>
            <textarea name="notes" placeholder="Describe your project or requirements" rows={4} style={{ padding: 'var(--space-2)', border: `1px solid var(--color-border)`, borderRadius: 'var(--radius)', resize: 'vertical' }} />
          </label>
          <button type="submit" style={{ background: 'var(--color-accent-primary)', color: '#fff', padding: 'var(--space-2)', borderRadius: 'var(--radius)', border: 'none' }}>Request Shortlist</button>
        </form>
      </div>
    </>
  );
}