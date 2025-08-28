import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import insights from '../../data/insights.json';

export default function InsightDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const post = insights.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="container" style={{ padding: 'var(--space-5) 0' }}>
        <h1>Article Not Found</h1>
      </div>
    );
  }

  // Article schema
  const articleSchema = {
    '@context': 'http://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.publish_date,
    author: { '@type': 'Organization', name: 'Hoshi Vault' },
    publisher: {
      '@type': 'Organization',
      name: 'Hoshi Vault',
      logo: { '@type': 'ImageObject', url: 'https://hoshivault.com/logo.png' }
    },
    description: post.summary,
    url: `https://hoshivault.com/insights/${post.slug}`
  };

  return (
    <>
      <Head>
        <title>{post.title} | Hoshi Vault Insights</title>
        <meta name="description" content={post.summary} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <div className="container" style={{ padding: 'var(--space-5) 0' }}>
        <nav aria-label="Breadcrumb" style={{ marginBottom: 'var(--space-3)' }}>
          <ol style={{ listStyle: 'none', display: 'flex', gap: '8px' }}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/insights">Insights</Link></li>
            <li aria-current="page">{post.title}</li>
          </ol>
        </nav>

        <h1 style={{ marginBottom: 'var(--space-2)' }}>{post.title}</h1>
        <p style={{ color: '#666', fontSize: 'var(--font-size-small)', marginBottom: 'var(--space-3)' }}>
          {new Date(post.publish_date).toLocaleDateString()}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.body }} style={{ lineHeight: '1.6' }} />
      </div>
    </>
  );
}
