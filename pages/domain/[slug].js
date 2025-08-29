import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import domains from '../../data/domains.json';
import categories from '../../data/categories.json';
import DomainCard from '../../components/DomainCard';
import LeaseCalculator from '../../components/LeaseCalculator';
import { useDrawer } from '../../context/DrawerContext';

/**
 * Domain detail page renders a specific domain with its pricing options,
 * lease calculator and related domains. Injects Product/Offer schema for SEO.
 */
export default function DomainDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const domain = domains.find((d) => d.slug === slug);
  const { open } = useDrawer();

  if (!domain) {
    return (
      <main className="container" style={{ padding: 'var(--space-5) 0' }}>
        <h1>Domain Not Found</h1>
        <p>The requested domain could not be found in our inventory.</p>
        <p>
          <Link href="/portfolio">Return to portfolio</Link>
        </p>
      </main>
    );
  }

  // Determine price display
  const priceDisplay =
    domain.price_type === 'fixed'
      ? `$${domain.price_value}`
      : Array.isArray(domain.price_value)
      ? `$${domain.price_value[0]}–$${domain.price_value[1]}`
      : 'Price on Application';

  // Related domains: up to 4 from same categories
  const related = domains
    .filter(
      (d) =>
        d.slug !== domain.slug &&
        d.categories.some((c) => domain.categories.includes(c))
    )
    .slice(0, 4);

  // Structured data
  const offers =
    domain.price_type === 'fixed'
      ? {
          '@type': 'Offer',
          price: domain.price_value,
          priceCurrency: 'USD',
          availability: 'http://schema.org/InStock'
        }
      : domain.price_type === 'range'
      ? {
          '@type': 'AggregateOffer',
          lowPrice: domain.price_value[0],
          highPrice: domain.price_value[1],
          priceCurrency: 'USD'
        }
      : null;

  const productSchema = {
    '@context': 'http://schema.org',
    '@type': 'Product',
    name: domain.name,
    description: domain.thesis,
    brand: { '@type': 'Brand', name: 'Hoshi Vault' },
    offers,
    sku: domain.slug,
    url: `https://hoshivault.com/domain/${domain.slug}`
  };

  return (
    <>
      <Head>
        <title>{`${domain.name} for Lease or Sale | Hoshi Vault`}</title>
        <meta
          name="description"
          content={`Secure ${domain.name} – premium domain available for lease or purchase. Escrow protected.`}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      </Head>

      <main className="container" style={{ padding: 'var(--space-5) 0' }}>
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: 'var(--space-3)' }}>
          <ol
            style={{
              listStyle: 'none',
              display: 'flex',
              gap: '8px',
              padding: 0,
              margin: 0
            }}
          >
            <li>
              <Link href="/">Home</Link>
              <span aria-hidden="true"> › </span>
            </li>
            <li>
              <Link href="/portfolio">Portfolio</Link>
              <span aria-hidden="true"> › </span>
            </li>
            <li aria-current="page">{domain.name}</li>
          </ol>
        </nav>

        <header>
          <h1 style={{ marginBottom: 'var(--space-2)' }}>{domain.name}</h1>
          <p
            style={{
              marginBottom: 'var(--space-3)',
              fontSize: 'var(--font-size-h3)',
              color: 'var(--color-accent-secondary)'
            }}
          >
            {domain.thesis}
          </p>
          <p>
            <span>
              Status: <strong>{domain.status}</strong>
            </span>{' '}
            |{' '}
            <span>
              Price: <strong>{priceDisplay}</strong>
            </span>
          </p>
        </header>

        <div
          style={{
            display: 'flex',
            gap: 'var(--space-3)',
            flexWrap: 'wrap',
            marginTop: 'var(--space-3)',
            alignItems: 'flex-start'
          }}
        >
          {/* Pricing & CTA */}
          <section
            aria-labelledby="pricing-cta"
            style={{
              flex: '1 1 300px',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2)'
            }}
          >
            <h2 id="pricing-cta" className="sr-only">
              Purchase or Inquiry
            </h2>

            {domain.price_type === 'fixed' && (
              <button
                onClick={() => open(domain)}
                aria-label={`Buy or inquire about ${domain.name} for ${priceDisplay}`}
                style={{
                  background: 'var(--color-accent-primary)',
                  color: '#fff',
                  padding: 'var(--space-2)',
                  borderRadius: 'var(--radius)',
                  border: 'none',
                  fontWeight: 600
                }}
              >
                Buy Now for {priceDisplay}
              </button>
            )}

            {domain.price_type === 'range' && (
              <button
                onClick={() => open(domain)}
                aria-label={`Make an offer for ${domain.name}`}
                style={{
                  background: 'var(--color-accent-primary)',
                  color: '#fff',
                  padding: 'var(--space-2)',
                  borderRadius: 'var(--radius)',
                  border: 'none',
                  fontWeight: 600
                }}
              >
                Make an Offer
              </button>
            )}

            {domain.price_type === 'POA' && (
              <button
                onClick={() => open(domain)}
                aria-label={`Contact Hoshi Vault for pricing on ${domain.name}`}
                style={{
                  background: 'var(--color-accent-primary)',
                  color: '#fff',
                  padding: 'var(--space-2)',
                  borderRadius: 'var(--radius)',
                  border: 'none',
                  fontWeight: 600
                }}
              >
                Contact for Pricing
              </button>
            )}

            {/* Lease Calculator */}
            {domain.price_type !== 'POA' && domain.status === 'lease' && (
              <LeaseCalculator
                price={
                  domain.price_type === 'fixed'
                    ? domain.price_value
                    : Array.isArray(domain.price_value)
                    ? domain.price_value[0]
                    : null
                }
                terms={domain.lease_terms}
              />
            )}
          </section>

          {/* Proof Points */}
          <section aria-labelledby="why-domain" style={{ flex: '1 1 300px' }}>
            <h2 id="why-domain">Why {domain.name}?</h2>
            <ul style={{ paddingLeft: 'var(--space-3)', listStyle: 'disc' }}>
              <li>Brevity: only {domain.length} characters</li>
              <li>
                Category fit:{' '}
                {domain.categories
                  .map((c) => categories.find((cat) => cat.slug === c)?.name)
                  .filter(Boolean)
                  .join(', ')}
              </li>
              <li>Memorability: easy to spell and recall</li>
              <li>TLD: {domain.tld}</li>
            </ul>
          </section>
        </div>

        {/* Notes and Legal */}
        <section aria-labelledby="transfer-escrow" style={{ marginTop: 'var(--space-4)' }}>
          <h2 id="transfer-escrow">Transfer & Escrow</h2>
          <p>
            All transactions complete via independent escrow to ensure security for both buyer and seller.
            Domain transfer is initiated only after funds are secured in escrow and typically completes within
            24–48 hours.
          </p>
        </section>

        {/* Related domains */}
        {related.length > 0 && (
          <section aria-labelledby="related-domains" style={{ marginTop: 'var(--space-4)' }}>
            <h2 id="related-domains">Related Domains</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: 'var(--space-3)',
                marginTop: 'var(--space-3)'
              }}
            >
              {related.map((d) => (
                <DomainCard key={d.slug} domain={d} />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
