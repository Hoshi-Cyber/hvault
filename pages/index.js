import Head from 'next/head';
import Link from 'next/link';
import GlobalSearch from '../components/GlobalSearch';
import DomainCard from '../components/DomainCard';
import domains from '../data/domains.json';
import categories from '../data/categories.json';

export default function Home() {
  const newArrivals = domains.slice(0, 4);
  const shortCom = domains.filter((d) => d.tld === '.com' && d.length <= 7).slice(0, 4);
  const categorySpotlights = categories.slice(0, 3).map((cat) => {
    const domain = domains.find((d) => d.categories.includes(cat.slug));
    return { category: cat, domain };
  });
  const geoPicks = domains.filter((d) => d.categories.includes('geo')).slice(0, 4);

  return (
    <>
      <Head>
        <title>Premium Domain Names for Brands | Hoshi Vault</title>
        <meta
          name="description"
          content="Explore Hoshi Vault’s curated portfolio of premium domains for lease or sale."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Premium Domain Names for Brands | Hoshi Vault" />
        <meta
          property="og:description"
          content="Discover high-value domains across finance, health, AI and more. Lease or buy securely via escrow."
        />
      </Head>

      <section style={{ padding: 'var(--space-6) 0', background: 'var(--color-neutral)', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ marginBottom: 'var(--space-3)' }}>
            Unlock Premium Domains for Extraordinary Brands
          </h1>
          <p style={{ marginBottom: 'var(--space-4)' }}>
            Hoshi Vault curates the world’s finest digital real estate — short, memorable names ready
            to power your next venture.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <Link
              href="/portfolio"
              className="btn btn-primary"
              style={{
                background: 'var(--color-accent-primary)',
                color: '#fff',
                padding: 'var(--space-2) var(--space-3)',
                borderRadius: 'var(--radius)',
                textDecoration: 'none'
              }}
            >
              Explore Portfolio
            </Link>
            <Link
              href="/leasing"
              className="btn btn-outline"
              style={{
                border: '1px solid var(--color-accent-primary)',
                color: 'var(--color-accent-primary)',
                padding: 'var(--space-2) var(--space-3)',
                borderRadius: 'var(--radius)',
                textDecoration: 'none'
              }}
            >
              Lease a Domain
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: 'var(--space-5) 0' }}>
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-3)' }}>Search the Vault</h2>
          <GlobalSearch />
        </div>
      </section>

      <section style={{ padding: 'var(--space-5) 0', background: 'var(--color-neutral)' }}>
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-3)' }}>New Arrivals</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 'var(--space-3)'
            }}
          >
            {newArrivals.map((domain) => (
              <DomainCard key={domain.slug} domain={domain} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'var(--space-5) 0' }}>
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-3)' }}>Short .com Domains</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 'var(--space-3)'
            }}
          >
            {shortCom.map((domain) => (
              <DomainCard key={domain.slug} domain={domain} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'var(--space-5) 0', background: 'var(--color-neutral)' }}>
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-3)' }}>Category Spotlights</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 'var(--space-3)'
            }}
          >
            {categorySpotlights.map(({ category, domain }) => (
              <div key={category.slug} style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ marginBottom: 'var(--space-2)' }}>{category.name}</h3>
                {domain ? <DomainCard domain={domain} /> : <p>No domains in this category yet.</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'var(--space-5) 0' }}>
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-3)' }}>Geo Picks</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 'var(--space-3)'
            }}
          >
            {geoPicks.map((domain) => (
              <DomainCard key={domain.slug} domain={domain} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'var(--space-5) 0', background: 'var(--color-neutral)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: 'var(--space-3)' }}>60+ Premium Names Ready for Deployment</h2>
          <p style={{ marginBottom: 'var(--space-3)' }}>
            Selected Deployments: Healthcare, Fintech, AI, Geo markets and more.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Shortlist request submitted');
            }}
            style={{
              display: 'grid',
              gap: 'var(--space-3)',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            <h3>Request a Domain Shortlist</h3>
            <label>
              <span className="sr-only">Name</span>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                style={{
                  padding: 'var(--space-2)',
                  border: `1px solid var(--color-border)`,
                  borderRadius: 'var(--radius)'
                }}
              />
            </label>
            <label>
              <span className="sr-only">Email</span>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                style={{
                  padding: 'var(--space-2)',
                  border: `1px solid var(--color-border)`,
                  borderRadius: 'var(--radius)'
                }}
              />
            </label>
            <label>
              <span className="sr-only">Preferred category</span>
              <select
                name="category"
                style={{
                  padding: 'var(--space-2)',
                  border: `1px solid var(--color-border)`,
                  borderRadius: 'var(--radius)'
                }}
              >
                <option value="">Preferred Category</option>
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              style={{
                background: 'var(--color-accent-primary)',
                color: '#fff',
                padding: 'var(--space-2)',
                borderRadius: 'var(--radius)',
                border: 'none'
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </section>

      <section style={{ padding: 'var(--space-5) 0' }}>
        <div className="container">
          <h2>About Hoshi Vault</h2>
          <p>
            Hoshi Vault is a private domain asset company specialising in the acquisition,
            management and strategic deployment of premium digital real estate. Our mission is to
            maximise asset value through recurring cashflow, selective high-margin exits and
            long-term equity growth. Whether leasing or buying, clients trust Hoshi Vault for its
            authority, discretion and premium inventory. All transactions are conducted via
            independent escrow for safety and trust.
          </p>
        </div>
      </section>
    </>
  );
}
