import Head from 'next/head';
import { useRouter } from 'next/router';
import domains from '../../data/domains.json';
import categories from '../../data/categories.json';
import DomainCard from '../../components/DomainCard';
import LeaseCalculator from '../../components/LeaseCalculator';
import { useDrawer } from '../../context/DrawerContext';

/**
 * Domain detail page renders a specific domain with its pricing options,
 * lease calculator and related domains. It also injects structured
 * data (Product and Offer/AggregateOffer schema) for SEO. If the
 * domain does not exist, a simple 404 message is displayed.
 */
export default function DomainDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const domain = domains.find((d) => d.slug === slug);
  const { open } = useDrawer();

  if (!domain) {
    return (
      <div className="container" style={{ padding: 'var(--space-5) 0' }}>
        <h1>Domain Not Found</h1>
        <p>The requested domain could not be found in our inventory.</p>
      </div>
    );
  }

  // Determine price display
  const priceDisplay = domain.price_type === 'fixed'
    ? `$${domain.price_value}`
    : Array.isArray(domain.price_value)
    ? `$${domain.price_value[0]}–$${domain.price_value[1]}`
    : 'Price on Application';

  // Related domains: pick up to 4 from same categories
  const related = domains.filter((d) => d.slug !== domain.slug && d.categories.some((c) => domain.categories.includes(c))).slice(0, 4);

  // Construct schema
  const offers = domain.price_type === 'fixed' ? {
    '@type': 'Offer',
    price: domain.price_value,
    priceCurrency: 'USD',
    availability: 'http://schema.org/InStock'
  } : domain.price_type === 'range' ? {
    '@type': 'AggregateOffer',
    lowPrice: domain.price_value[0],
    highPrice: domain.price_value[1],
    priceCurrency: 'USD'
  } : null;
  const productSchema = {
    '@context': 'http://schema.org',
    '@type': 'Product',
    name: domain.name,
    description: domain.thesis,
    brand: {
      '@type': 'Brand',
      name: 'Hoshi Vault'
    },
    offers: offers,
    sku: domain.slug,
    url: `https://hoshivault.com/domain/${domain.slug}`
  };

  return (
    <>
      <Head>
        <title>{`${domain.name} for Lease or Sale | Hoshi Vault`}</title>
        <meta name="description" content={`Secure ${domain.name} – premium domain available for lease or purchase. Escrow protected.`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      </Head>
      <div className="container" style={{ padding: 'var(--space-5) 0' }}>
        <nav aria-label="Breadcrumb" style={{ marginBottom: 'var(--space-3)' }}>
          <ol style={{ listStyle: 'none', display: 'flex', gap: '8px' }}>
            <li><a href="/">Home</a></li>
            <li><a href="/portfolio">Portfolio</a></li>
            <li aria-current="page">{domain.name}</li>
          </ol>
        </nav>
        <h1 style={{ marginBottom: 'var(--space-2)' }}>{domain.name}</h1>
        <p style={{ marginBottom: 'var(--space-3)', fontSize: 'var(--font-size-h3)', color: 'var(--color-accent-secondary)' }}>{domain.thesis}</p>
        <p>Status: <strong>{domain.status}</strong> | Price: <strong>{priceDisplay}</strong></p>
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginTop: 'var(--space-3)', alignItems: 'flex-start' }}>
          {/* Pricing & CTA */}
          <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {domain.price_type === 'fixed' && (
              <button onClick={() => open(domain)} style={{ background: 'var(--color-accent-primary)', color: '#fff', padding: 'var(--space-2)', borderRadius: 'var(--radius)', border: 'none' }}>Buy Now for {priceDisplay}</button>
            )}
            {domain.price_type === 'range' && (
              <button onClick={() => open(domain)} style={{ background: 'var(--color-accent-primary)', color: '#fff', padding: 'var(--space-2)', borderRadius: 'var(--radius)', border: 'none' }}>Make an Offer</button>
            )}
            {domain.price_type === 'POA' && (
              <button onClick={() => open(domain)} style={{ background: 'var(--color-accent-primary)', color: '#fff', padding: 'var(--space-2)', borderRadius: 'var(--radius)', border: 'none' }}>Contact for Pricing</button>
            )}
            {/* Lease Calculator */}
            {domain.price_type !== 'POA' && domain.status === 'lease' && (
              <LeaseCalculator price={domain.price_type === 'fixed' ? domain.price_value : Array.isArray(domain.price_value) ? domain.price_value[0] : null} terms={domain.lease_terms} />
            )}
          </div>
          {/* Proof Points */}
          <div style={{ flex: '1 1 300px' }}>
            <h3>Why {domain.name}?</h3>
            <ul style={{ paddingLeft: 'var(--space-3)', listStyle: 'disc' }}>
              <li>Brevity: only {domain.length} characters</li>
              <li>Category fit: {domain.categories.map((c) => categories.find((cat) => cat.slug === c)?.name).filter(Boolean).join(', ')}</li>
              <li>Memorability: easy to spell and recall</li>
              <li>TLD: {domain.tld}</li>
            </ul>
          </div>
        </div>
        {/* Notes and Legal */}
        <section style={{ marginTop: 'var(--space-4)' }}>
          <h3>Transfer & Escrow</h3>
          <p>All transactions complete via independent escrow to ensure security for both buyer and seller. Domain transfer is initiated only after funds are secured in escrow and typically completes within 24–48 hours.</p>
        </section>
        {/* Related domains */}
        {related.length > 0 && (
          <section style={{ marginTop: 'var(--space-4)' }}>
            <h3>Related Domains</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
              {related.map((d) => <DomainCard key={d.slug} domain={d} />)}
            </div>
          </section>
        )}
      </div>
    </>
  );
}