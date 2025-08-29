import Link from 'next/link';
import { useCompare } from '../context/CompareContext';
import { useDrawer } from '../context/DrawerContext';

/**
 * DomainCard
 * - Name links to detail page (/domain/[slug])
 * - Clear metadata row (TLD • length)
 * - Primary Inquire button opens drawer with domain context
 * - Mobile-friendly spacing & tap targets; keeps status pill
 */
export default function DomainCard({ domain }) {
  const { selected, add, remove } = useCompare();
  const { open } = useDrawer();
  const isSelected = !!selected.find((d) => d.slug === domain.slug);

  const handleCompareChange = () => {
    if (isSelected) remove(domain.slug);
    else add(domain);
  };

  const statusColours = {
    buy: '#0044FF',
    lease: '#FF6600',
    'make-offer': '#888888',
    'in-use': '#555555',
  };

  return (
    <div
      role="group"
      aria-label={`${domain.name} card`}
      style={{
        border: `1px solid var(--color-border)`,
        borderRadius: 'var(--radius)',
        padding: 'var(--space-3)',
        background: 'var(--color-background)',
        boxShadow: 'var(--shadow-small)',
        transition: 'box-shadow .2s, transform .1s',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        height: '100%',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,.08)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-small)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Title + status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center' }}>
        <h3 style={{ margin: 0, wordBreak: 'break-word', fontSize: '18px', lineHeight: 1.25 }}>
          <Link
            href={`/domain/${domain.slug}`}
            style={{ textDecoration: 'none', color: 'var(--color-text-primary)' }}
            aria-label={`View details for ${domain.name}`}
          >
            {domain.name}
          </Link>
        </h3>
        <span
          style={{
            padding: '2px 8px',
            borderRadius: 999,
            fontSize: 12,
            background: statusColours[domain.status] || '#999',
            color: '#fff',
            textTransform: 'capitalize',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            lineHeight: 1,
          }}
          aria-label={`status ${domain.status}`}
        >
          {domain.status}
        </span>
      </div>

      {/* Thesis (clamped) */}
      <p
        style={{
          margin: 0,
          color: '#333',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          minHeight: '3.2em',
        }}
      >
        {domain.thesis || 'Premium, memorable and concise domain name for your next venture.'}
      </p>

      {/* Meta row */}
      <div
        className="meta-row"
        style={{
          display: 'inline-grid',
          gridAutoFlow: 'column',
          alignItems: 'center',
          gap: 8,
          color: '#555',
          fontSize: 12,
          marginBottom: 2,
        }}
      >
        <span>{domain.tld}</span>
        <span aria-hidden="true">•</span>
        <span>{domain.length} chars</span>
      </div>

      {/* Actions (stacked for mobile) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 'auto' }}>
        <button
          onClick={() => open(domain)}
          aria-label={`Inquire about ${domain.name}`}
          style={{
            width: '100%',
            background: 'var(--color-accent-primary)',
            color: '#fff',
            padding: 12, // larger tap target
            borderRadius: 'var(--radius)',
            border: 'none',
            fontWeight: 600,
          }}
        >
          Inquire
        </button>

        <label
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
            userSelect: 'none',
            minHeight: 44, // mobile-friendly
          }}
        >
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleCompareChange}
            aria-label="Add to compare"
            style={{ width: 18, height: 18 }}
          />
          <span style={{ fontSize: 14 }}>Compare</span>
        </label>
      </div>
    </div>
  );
}
