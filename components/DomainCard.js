import { useCompare } from '../context/CompareContext';
import { useDrawer } from '../context/DrawerContext';

/**
 * DomainCard displays an individual domain entry with its key attributes
 * and a call-to-action. It respects the design guidelines for a
 * premium look: subtle shadow on hover, accessible focus outline and
 * responsive layout. The card includes a compare checkbox and a CTA
 * button that opens the inquiry drawer.
 */
export default function DomainCard({ domain }) {
  const { selected, add, remove } = useCompare();
  const { open } = useDrawer();
  const isSelected = !!selected.find((d) => d.slug === domain.slug);

  const handleCompareChange = () => {
    if (isSelected) {
      remove(domain.slug);
    } else {
      add(domain);
    }
  };

  const statusColours = {
    buy: '#0044FF',
    lease: '#FF6600',
    'make-offer': '#888888',
    'in-use': '#555555'
  };
  return (
    <div
      style={{
        border: `1px solid var(--color-border)`,
        borderRadius: 'var(--radius)',
        padding: 'var(--space-3)',
        background: 'var(--color-background)',
        boxShadow: 'var(--shadow-small)',
        transition: 'box-shadow 0.2s, transform 0.1s',
      }}
      tabIndex={0}
      onFocus={(e) => {
        e.currentTarget.style.outline = `2px solid var(--color-accent-primary)`;
      }}
      onBlur={(e) => {
        e.currentTarget.style.outline = 'none';
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-small)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
        <h3 style={{ margin: 0 }}>{domain.name}</h3>
        <span style={{ padding: '2px 6px', borderRadius: '4px', fontSize: 'var(--font-size-small)', background: statusColours[domain.status] || '#eeeeee', color: '#fff' }}>{domain.status}</span>
      </div>
      <p style={{ marginBottom: 'var(--space-3)', minHeight: '48px' }}>{domain.thesis || 'Premium, memorable and concise domain name for your next venture.'}</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={() => open(domain)}
          style={{ background: 'var(--color-accent-primary)', color: '#fff', padding: 'var(--space-1) var(--space-2)', borderRadius: 'var(--radius)', border: 'none', flexGrow: 1, marginRight: 'var(--space-2)' }}
        >
          Inquire
        </button>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleCompareChange}
            style={{ marginRight: 'var(--space-1)' }}
            aria-label="Add to compare"
          />
          <span style={{ fontSize: 'var(--font-size-small)' }}>Compare</span>
        </label>
      </div>
    </div>
  );
}