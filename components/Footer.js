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
            <li><Link href="/about"><a>About</a></Link></li>
            <li><Link href="/contact"><a>Contact</a></Link></li>
            <li><Link href="#"><a>Careers</a></Link></li>
            <li><Link href="#"><a>Press Kit</a></Link></li>
          </ul>
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <h3>Portfolio</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link href="/portfolio"><a>All Domains</a></Link></li>
            <li><Link href="/portfolio/short"><a>Short .com</a></Link></li>
            <li><Link href="/portfolio/brandable"><a>Brandable</a></Link></li>
            <li><Link href="/portfolio/geo"><a>Geo & Category</a></Link></li>
          </ul>
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <h3>Solutions</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link href="/leasing"><a>Leasing</a></Link></li>
            <li><Link href="/selling"><a>Buying</a></Link></li>
            <li><Link href="/ventures"><a>Domain‑Backed Ventures</a></Link></li>
            <li><Link href="/request-shortlist"><a>Request a Shortlist</a></Link></li>
          </ul>
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <h3>Resources</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link href="/insights"><a>Insights</a></Link></li>
            <li><Link href="/playbooks"><a>Playbooks</a></Link></li>
            <li><Link href="/faqs"><a>FAQs</a></Link></li>
            <li><Link href="/sitemap.xml"><a>Sitemap</a></Link></li>
          </ul>
        </div>
      </div>
      <div style={{ borderTop: `1px solid var(--color-border)`, marginTop: 'var(--space-4)', paddingTop: 'var(--space-3)' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', alignItems: 'center' }}>
          <span>© Hoshi Vault {new Date().getFullYear()}</span>
          <Link href="/terms"><a>Terms</a></Link>
          <Link href="/privacy"><a>Privacy</a></Link>
          <Link href="/cookies"><a>Cookies</a></Link>
          <span>All transactions via independent escrow</span>
          <span>Registered entity details.</span>
        </div>
      </div>
    </footer>
  );
}