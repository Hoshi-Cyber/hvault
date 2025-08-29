// components/Logo.js
import Link from 'next/link';

export default function Logo({ size = 'clamp(20px, 4vw, 28px)' }) {
  return (
    <Link
      href="/"
      aria-label="Hoshi Vault Home"
      style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
    >
      {/* Icon */}
      <img
        src="/hoshi-mark.svg"
        alt=""
        aria-hidden="true"
        style={{
          width: size,
          height: size,
          flexShrink: 0,
        }}
      />
      {/* Wordmark */}
      <span
        style={{
          fontWeight: 700,
          fontSize: size,
          color: 'var(--color-text-primary)',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
      >
        Hoshi Vault
      </span>
    </Link>
  );
}

