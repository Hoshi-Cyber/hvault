import Link from 'next/link';
import { useRouter } from 'next/router';

/**
 * Header component renders the top navigation bar. It applies a simple
 * horizontal navigation using semantic elements and emphasises the
 * active link with an underline. The nav structure follows the IA
 * defined in the master packs: Home, Portfolio, Categories, Leasing,
 * Selling, Insights, Contact.
 */
export default function Header() {
  const router = useRouter();
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/categories', label: 'Categories' },
    { href: '/leasing', label: 'Leasing' },
    { href: '/selling', label: 'Selling' },
    { href: '/insights', label: 'Insights' },
    { href: '/contact', label: 'Contact' }
  ];
  return (
    <header>
      <nav aria-label="Main navigation" style={{
        borderBottom: `1px solid var(--color-border)`,
        padding: 'var(--space-2) 0'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/">
            <a style={{ fontWeight: 'bold', fontSize: '20px', color: 'var(--color-text-primary)', textDecoration: 'none' }}>
              Hoshi&nbsp;Vault
            </a>
          </Link>
          <ul style={{ display: 'flex', gap: 'var(--space-3)', listStyle: 'none' }}>
            {navItems.map(({ href, label }) => {
              const isActive = router.pathname === href;
              return (
                <li key={href}>
                  <Link href={href} legacyBehavior>
                    <a
                      style={{
                        color: isActive ? 'var(--color-accent-primary)' : 'var(--color-text-primary)',
                        textDecoration: 'none',
                        fontWeight: isActive ? '600' : '400'
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