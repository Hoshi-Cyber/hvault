import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

/**
 * Responsive header with mobile hamburger.
 * <768px: hamburger opens full-screen menu. Body scroll locks while open.
 * Sticky header via .site-header class (see globals.css).
 */
export default function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/categories', label: 'Categories' },
    { href: '/leasing', label: 'Leasing' },
    { href: '/selling', label: 'Selling' },
    { href: '/insights', label: 'Insights' },
    { href: '/contact', label: 'Contact' },
  ];

  // lock body scroll when mobile menu is open
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('no-scroll', open);
    }
  }, [open]);

  // close menu on route change
  useEffect(() => {
    const handleRoute = () => setOpen(false);
    router.events.on('routeChangeComplete', handleRoute);
    return () => router.events.off('routeChangeComplete', handleRoute);
  }, [router.events]);

  return (
    <header className="site-header">
      <nav aria-label="Main navigation" className="nav">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" legacyBehavior>
            <a className="brand" style={{ fontWeight: 'bold', fontSize: '20px', color: 'var(--color-text-primary)', textDecoration: 'none' }}>
              Hoshi&nbsp;Vault
            </a>
          </Link>

          {/* Hamburger (mobile) */}
          <button
            className="hamburger"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
          >
            <span></span><span></span><span></span>
          </button>

          {/* Links */}
          <ul className={`nav-links ${open ? 'open' : ''}`}>
            {navItems.map(({ href, label }) => {
              const isActive = router.pathname === href;
              return (
                <li key={href}>
                  <Link href={href} legacyBehavior>
                    <a
                      className={isActive ? 'active' : ''}
                      onClick={() => setOpen(false)}
                      style={{
                        color: isActive ? 'var(--color-accent-primary)' : 'var(--color-text-primary)',
                        textDecoration: 'none',
                        fontWeight: isActive ? 600 : 400
                      }}
                    >
                      {label}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}
