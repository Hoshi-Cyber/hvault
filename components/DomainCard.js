import React, { useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useCompare } from '../context/CompareContext';
import { useDrawer } from '../context/DrawerContext';

/**
 * DomainCard
 * - Name links to detail page (/domain/[slug])
 * - Top meta strip: status pill (left) + contextual price (right)
 * - Clear metadata row (TLD • length)
 * - Primary Inquire button opens drawer with domain context
 * - Mobile-friendly spacing & tap targets; visible focus outlines
 * - Memoized derived text/handlers to avoid rework
 */
function DomainCard({ domain }) {
  const { selected, add, remove } = useCompare();
  const { open } = useDrawer();

  const isSelected = useMemo(
    () => !!selected.find((d) => d.slug === domain.slug),
    [selected, domain.slug]
  );

  // Derived price label (top-right)
  const priceText = useMemo(() => {
    if (domain.price_type === 'fixed') return `Buy $${domain.price_value}`;
    if (domain.price_type === 'range' && Array.isArray(domain.price_value)) {
      const [low, high] = domain.price_value;
      return `$${low}–$${high}`;
    }
    if (domain.price_type === 'POA') return 'POA';
    return '';
  }, [domain.price_type, domain.price_value]);

  // Optional “From $MIN” hint for make-offer cards
  const minOfferHint = useMemo(() => {
    if (domain.status === 'make-offer' && typeof domain.min_offer === 'number') {
      return `From $${domain.min_offer}`;
    }
    return null;
  }, [domain.status, domain.min_offer]);

  // Status pill class
  const pillClass = useMemo(() => {
    const map = {
      buy: 'pill pill--buy',
      lease: 'pill pill--lease',
      'make-offer': 'pill pill--make-offer',
      'in-use': 'pill pill--in-use',
    };
    return map[domain.status] || 'pill';
  }, [domain.status]);

  // Stable handlers
  const handleCompareChange = useCallback(
    (e) => {
      e.stopPropagation?.();
      if (isSelected) remove(domain.slug);
      else add(domain);
    },
    [isSelected, remove, add, domain.slug]
  );

  const handleInquire = useCallback(
    (e) => {
      e.stopPropagation?.();
      open(domain);
    },
    [open, domain]
  );

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
        <span className={pillClass} aria-label={`status ${domain.status}`}>
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
          className="card-title"
          aria-label={`View details for ${domain.name}`}
          style={{ textDecoration: 'none', color: 'var(--color-text-primary)' }}
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
      {minOfferHint && <div style={{ fontSize: 12, color: '#555' }}>{minOfferHint}</div>}

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
          onClick={handleInquire}
          aria-label={`Inquire about ${domain.name}`}
          style={{
            width: '100%',
            background: 'var(--color-accent-primary)',
            color: '#fff',
            padding: 12,
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
            minHeight: 44,
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
