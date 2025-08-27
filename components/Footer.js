import Link from 'next/link';

/**
 * Footer component displays multi-column footer links and bottom legal bar.
 * It follows the guidelines from the IA and Operations packs. The component
 * ensures accessibility by using semantic lists and descriptive link text.
 */
export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-neutral)', padding: 'var(--space-4) 0' }}>
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div style={{ flex: '1 1 200px' }}>
          <h3>Company</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="#">Careers</Link></li>
            <li><Link href="#">Press Kit</Link></li>
          </ul>
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <h3>Portfolio</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link href="/portfolio">All Domains</Link></li>
            <li><Link href="/portfolio/short">Short .com</Link></li>
            <li><Link href="/portfolio/brandable">Brandable</Link></li>
            <li><Link href="/portfolio/geo">Geo & Category</Link></li>
          </ul>
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <h3>Solutions</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link href="/leasing">Leasing</Link></li>
            <li><Link href="/selling">Buying</Link></li>
            <li><Link href="/ventures">Domain-Backed Ventures</Link></li>
            <li><Link href="/request-shortlist">Request a Shortlist</Link></li>
          </ul>
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <h3>Resources</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link href="/insights">Insights</Link></li>
            <li><Link href="/playbooks">Playbooks</Link></li>
            <li><Link href="/faqs">FAQs</Link></li>
            <li><Link href="/sitemap.xml">Sitemap</Link></li>
          </ul>
        </div>
      </div>

      <div style={{ borderTop: `1px solid var(--color-border)`, marginTop: 'var(--space-4)', paddingTop: 'var(--space-3)' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', alignItems: 'center' }}>
          <span>© Hoshi Vault {new Date().getFullYear()}</span>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/cookies">Cookies</Link>
          <span>All transactions via independent escrow</span>
          <span>Registered entity details.</span>
        </div>
      </div>
    </footer>
  );
}
