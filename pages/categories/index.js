import Head from 'next/head';
import Link from 'next/link';
import categories from '../../data/categories.json';

export default function CategoriesIndex() {
  return (
    <>
      <Head>
        <title>Domain Categories | Hoshi Vault</title>
        <meta name="description" content="Browse domain categories including finance, health, AI, geo and more." />
      </Head>
      <div className="container" style={{ padding: 'var(--space-5) 0' }}>
        <h1>Categories</h1>
        <p>Select a category to view curated premium domains.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
          {categories.map((cat) => (
            <Link href={`/categories/${cat.slug}`} key={cat.slug}>
              <a style={{ border: `1px solid var(--color-border)`, borderRadius: 'var(--radius)', padding: 'var(--space-3)', background: 'var(--color-neutral)', display: 'block', textDecoration: 'none' }}>
                <h3 style={{ marginBottom: 'var(--space-2)' }}>{cat.name}</h3>
                <p>{cat.pov}</p>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}