import Head from 'next/head';
import { useRouter } from 'next/router';
import categories from '../../data/categories.json';
import domains from '../../data/domains.json';
import DomainCard from '../../components/DomainCard';

export default function CategoryDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const category = categories.find((c) => c.slug === slug);
  if (!category) {
    return (
      <div className="container" style={{ padding: 'var(--space-5) 0' }}>
        <h1>Category Not Found</h1>
        <p>The requested category does not exist.</p>
      </div>
    );
  }
  const filtered = domains.filter((d) => d.categories.includes(category.slug));
  return (
    <>
      <Head>
        <title>Premium Domains in {category.name} | Hoshi Vault</title>
        <meta name="description" content={`Curated ${category.name} domains for businesses and investors.`} />
      </Head>
      <div className="container" style={{ padding: 'var(--space-5) 0' }}>
        <h1>{category.name}</h1>
        <p style={{ marginBottom: 'var(--space-3)' }}>{category.pov}</p>
        {filtered.length === 0 ? (
          <p>No domains available in this category.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-3)' }}>
            {filtered.map((d) => <DomainCard key={d.slug} domain={d} />)}
          </div>
        )}
      </div>
    </>
  );
}