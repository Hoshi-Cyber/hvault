import Head from 'next/head';
import Link from 'next/link';
import GlobalSearch from '../components/GlobalSearch';
import DomainCard from '../components/DomainCard';
import domains from '../data/domains.json';
import categories from '../data/categories.json';
import styles from '../styles/Home.module.css';

export default function Home() {
  // Derive curated rows
  const newArrivals = domains.slice(0, 4);
  const shortCom = domains.filter((d) => d.tld === '.com' && d.length <= 7).slice(0, 4);

  // Category spotlights: pick first domain in each category
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

      {/* Hero */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <h1 className={styles.heroTitle}>Unlock Premium Domains for Extraordinary Brands</h1>
          <p className={styles.heroLead}>
            Hoshi Vault curates the world’s finest digital real estate — short, memorable names
            ready to power your next venture.
          </p>

          <div className={styles.ctaRow} role="group" aria-label="Primary actions">
            <Link href="/portfolio" className={`${styles.cta} ${styles.ctaPrimary}`}>
              Explore Portfolio
            </Link>
            <Link href="/leasing" className={`${styles.cta} ${styles.ctaGhost}`}>
              Lease a Domain
            </Link>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.h2}>Search the Vault</h2>
          <GlobalSearch />
        </div>
      </section>

      {/* New Arrivals */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <h2 className={styles.h2}>New Arrivals</h2>
          <div className="grid-cards">
            {newArrivals.map((domain) => (
              <DomainCard key={domain.slug} domain={domain} />
            ))}
          </div>
        </div>
      </section>

      {/* Short .com */}
      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.h2}>Short .com Domains</h2>
          <div className="grid-cards">
            {shortCom.map((domain) => (
              <DomainCard key={domain.slug} domain={domain} />
            ))}
          </div>
        </div>
      </section>

      {/* Category Spotlights */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <h2 className={styles.h2}>Category Spotlights</h2>
          <div className="grid-cards">
            {categorySpotlights.map(({ category, domain }) => (
              <div key={category.slug}>
                <h3 className={styles.h3}>{category.name}</h3>
                {domain ? <DomainCard domain={domain} /> : <p>No domains in this category yet.</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Geo Picks */}
      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.h2}>Geo Picks</h2>
          <div className="grid-cards">
            {geoPicks.map((domain) => (
              <DomainCard key={domain.slug} domain={domain} />
            ))}
          </div>
        </div>
      </section>

      {/* Shortlist form */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className={styles.h2}>60+ Premium Names Ready for Deployment</h2>
          <p className={styles.leadTight}>
            Selected Deployments: Healthcare, Fintech, AI, Geo markets and more.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Shortlist request submitted');
            }}
            className={styles.form}
            noValidate
          >
            <h3 className={styles.h3}>Request a Domain Shortlist</h3>

            <label>
              <span className="sr-only">Name</span>
              <input type="text" name="name" placeholder="Your Name" required className={styles.input} />
            </label>

            <label>
              <span className="sr-only">Email</span>
              <input type="email" name="email" placeholder="Email Address" required className={styles.input} />
            </label>

            <label>
              <span className="sr-only">Preferred category</span>
              <select name="category" className={styles.input}>
                <option value="">Preferred Category</option>
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </label>

            <button type="submit" className={`${styles.cta} ${styles.ctaPrimary}`}>
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* About */}
      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.h2}>About Hoshi Vault</h2>
          <p>
            Hoshi Vault is a private domain asset company specialising in the acquisition, management
            and strategic deployment of premium digital real estate. Our mission is to maximise
            asset value through recurring cashflow, selective high-margin exits and long-term equity
            growth. Whether leasing or buying, clients trust Hoshi Vault for its authority, discretion
            and premium inventory. All transactions are conducted via independent escrow for safety
            and trust.
          </p>
        </div>
      </section>
    </>
  );
}
