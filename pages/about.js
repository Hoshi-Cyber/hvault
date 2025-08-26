import Head from 'next/head';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Hoshi Vault</title>
        <meta name="description" content="Learn about Hoshi Vault’s mission, vision and strategic focus." />
      </Head>
      <div className="container" style={{ padding: 'var(--space-5) 0' }}>
        <h1>About Hoshi Vault</h1>
        <p>Hoshi Vault is a private domain asset company specialising in the acquisition, management and strategic deployment of premium digital real estate. Our mandate is to maximise asset value through recurring cashflow, selective high-margin exits and long-term equity growth.</p>
        <h2>Core Focus Areas</h2>
        <ul style={{ paddingLeft: 'var(--space-3)', listStyle: 'disc' }}>
          <li><strong>Domain Leasing</strong> – Structured short- and long-term leases of high-value domains with recurring income and buyout potential.</li>
          <li><strong>Domain Selling</strong> – Selective premium domain sales to corporates, startups and investors, focused on high-ticket exits.</li>
          <li><strong>Domain‑Backed Ventures</strong> – Incubating microbrands and niche businesses on strong domains to create bundled business + domain assets.</li>
          <li><strong>Domain‑Powered Landing Pages</strong> – Activating idle assets through optimised branded landing pages that capture leads or affiliate revenue.</li>
          <li><strong>Geo & Category Clusters</strong> – Building defensible vertical portfolios by consolidating domains around industries and regions.</li>
        </ul>
        <h2>Our Positioning</h2>
        <p>We position ourselves as a domain investment powerhouse—balancing cash-generating models with high-upside ventures. Hoshi Vault fuses liquidity, recurring income and long-term compounding, treating digital real estate as both a financial asset class and a foundation for venture creation.</p>
      </div>
    </>
  );
}