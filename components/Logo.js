// components/Logo.js
import Link from 'next/link';

export default function Logo({ size = 24 }) {
  const iconSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <Link
      href="/"
      className="brand"
      aria-label="Hoshi Vault home"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      {/* Icon */}
      <img
        src="/hoshi-mark.svg"
        alt=""
        aria-hidden="true"
        style={{ width: iconSize, height: iconSize, flexShrink: 0 }}
      />
      {/* Wordmark */}
      <span
        style={{
          fontWeight: 700,
          fontSize: iconSize,
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
      >
        Hoshi Vault
      </span>
    </Link>
  );
}
