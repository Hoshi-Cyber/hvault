import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from './Logo';

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

  // lock body when mobile menu is open
  useEffect(() => {
    document.body.classList.toggle('no-scroll', open);
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
        <div
          className="container"
          style={{ display: 'flex', alignItems: 'center', gap: 12 }}
        >
          {/* Brand (left) */}
          <Logo size={24} />

          {/* Spacer to push controls to the far right */}
          <div style={{ flex: 1 }} />

          {/* Desktop links (hidden on mobile via CSS) */}
          <ul id="primary-menu" className={`nav-links ${open ? 'open' : ''}`}>
            {navItems.map(({ href, label }) => {
              const isActive = router.pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={isActive ? 'active' : ''}
                    style={{
                      color: isActive
                        ? 'var(--color-accent-primary)'
                        : 'var(--color-text-primary)',
                      textDecoration: 'none',
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Hamburger (far right on mobile) */}
          <button
            className="hamburger"
            aria-label="Toggle menu"
            aria-controls="primary-menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            style={{ marginLeft: 'auto' }}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </header>
  );
}
