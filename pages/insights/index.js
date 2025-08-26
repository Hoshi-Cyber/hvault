import Head from 'next/head';
import Link from 'next/link';
import insights from '../../data/insights.json';

export default function InsightsIndex() {
  return (
    <>
      <Head>
        <title>Domain Investment Insights | Hoshi Vault</title>
        <meta name="description" content="Strategies, trends, and guides on domain investing and branding." />
      </Head>
      <div className="container" style={{ padding: 'var(--space-5) 0' }}>
        <h1>Insights</h1>
        {insights.map((post) => (
          <article key={post.slug} style={{ marginBottom: 'var(--space-4)' }}>
            <h2><Link href={`/insights/${post.slug}`}><a>{post.title}</a></Link></h2>
            <p>{post.summary}</p>
            <Link href={`/insights/${post.slug}`}><a style={{ color: 'var(--color-accent-primary)' }}>Read more →</a></Link>
          </article>
        ))}
      </div>
    </>
  );
}