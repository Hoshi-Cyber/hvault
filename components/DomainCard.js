import Link from 'next/link';
import { useMemo } from 'react';
import { useCompare } from '../context/CompareContext';
import { useDrawer } from '../context/DrawerContext';

/**
 * DomainCard
 * - Name links to detail page (/domain/[slug])
 * - Top meta strip: status pill (left) + contextual price (right)
 * - Clear metadata row (TLD • length)
 * - Primary Inquire button opens drawer with domain context
 * - Mobile-friendly spacing & tap targets; visible focus outlines
 * - Memoized derived text to avoid rework
 */
function DomainCard({ domain }) {
  const { selected, add, remove } = useCompare();
  const { open } = useDrawer();
  const isSelected = !!selected.find((d) => d.slug === domain.slug);

  const handleCompareChange = (e) => {
    // avoid bubbling to any future card-level handlers
    e.stopPropagation?.();
    if (isSelected) remove(domain.slug);
    else add(domain);
  };

  const statusColours = {
    buy: '#0044FF',
    lease: '#FF6600',
    'make-offer': '#888888',
    'in-use': '#555555',
  };

  // Derive contextual price/label for the top-right of the card
  const priceText = useMemo(() => {
    if (domain.price_type === 'fixed') {
      return `Buy $${domain.price_value}`;
    }
    if (domain.price_type === 'range' && Array.isArray(domain.price_value)) {
      const [low, high] = domain.price_value;
      return `$${low}–$${high}`;
    }
    if (domain.price_type === 'POA') {
      return 'POA';
    }
    // Fallback
    return '';
  }, [domain.price_type, domain.price_value]);

  // Optional “From $MIN” hint for make-offer
  const minOfferHint = useMemo(() => {
    if (domain.status === 'make-offer' && typeof domain.min_offer === 'number') {
      return `From $${domain.min_offer}`;
    }
    return null;
  }, [domain.status, domain.min_offer]);

  return (
    <div
      role="group"
      aria-label={`${domain.name} card`}
      tabIndex={0}
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
        outline: 'none',
      }}
      onFocus={(e) => {
        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,68,255,.15)';
      }}
      onBlur={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-small)';
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
      {/* Top meta strip: status pill + price */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <span
          className="pill"
          style={{
            padding: '2px 8px',
            borderRadius: 999,
            fontSize: 12,
            lineHeight: 1.4,
            background: statusColours[domain.status] || '#999',
            color: '#fff',
            textTransform: 'capitalize',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            border: 'none',
          }}
          aria-label={`status ${domain.status}`}
        >
          {domain.status}
        </span>

        {priceText ? (
          <span style={{ fontSize: 12, color: '#111', whiteSpace: 'nowrap' }}>{priceText}</span>
        ) : (
          <span aria-hidden="true" />
        )}
      </div>

      {/* Title (links to detail) */}
      <h3 style={{ margin: 0, wordBreak: 'break-word', fontSize: '18px', lineHeight: 1.25 }}>
        <Link
          href={`/domain/${domain.slug}`}
          style={{ textDecoration: 'none', color: 'var(--color-text-primary)' }}
          aria-label={`View details for ${domain.name}`}
        >
          {domain.name}
        </Link>
      </h3>

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

      {/* Optional min-offer hint (for make-offer) */}
      {minOfferHint && (
        <div style={{ fontSize: 12, color: '#555' }}>
          {minOfferHint}
        </div>
      )}

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
          marginTop: 2,
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
          onClick={(e) => {
            e.stopPropagation?.();
            open(domain);
          }}
          aria-label={`Inquire about ${domain.name}`}
          style={{
            width: '100%',
            background: 'var(--color-accent-primary)',
            color: '#fff',
            padding: 12, // 44px+ tap target combined with line-height
            borderRadius: 'var(--radius)',
            border: 'none',
            fontWeight: 600,
            minHeight: 44,
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

export default React.memo(DomainCard);
