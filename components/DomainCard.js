import { useCompare } from '../context/CompareContext';
import { useDrawer } from '../context/DrawerContext';

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
        transition: 'box-shadow .2s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        height: '100%',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-small)';
      }}
    >
      {/* Title + status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center' }}>
        <h3 style={{ margin: 0, wordBreak: 'break-word', fontSize: '18px', lineHeight: 1.3 }}>
          {domain.name}
        </h3>
        <span
          style={{
            padding: '2px 8px',
            borderRadius: 999,
            fontSize: '12px',
            background: statusColours[domain.status] || '#999',
            color: '#fff',
            textTransform: 'capitalize',
            whiteSpace: 'nowrap',
            flexShrink: 0,
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
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: '12px', color: '#555' }}>
        <span>{domain.tld}</span>
        <span>•</span>
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
            padding: '12px',
            borderRadius: 'var(--radius)',
            border: 'none',
            fontWeight: 600,
          }}
        >
          Inquire
        </button>

        <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', userSelect: 'none' }}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleCompareChange}
            aria-label="Add to compare"
            style={{ width: 18, height: 18 }}
          />
          <span style={{ fontSize: '14px' }}>Compare</span>
        </label>
      </div>
    </div>
  );
}
