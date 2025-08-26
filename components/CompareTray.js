import { useState } from 'react';
import { useCompare } from '../context/CompareContext';

/**
 * CompareTray renders a sticky bar at the bottom of the viewport when
 * there are one or more domains selected for comparison. Users can
 * remove items directly or expand a modal to view a simple comparison
 * table. The component is non-intrusive on mobile and desktop.
 */
export default function CompareTray() {
  const { selected, remove, clear } = useCompare();
  const [isOpen, setIsOpen] = useState(false);
  if (selected.length === 0) return null;
  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }}>
      {/* Bar */}
      <div style={{ background: 'var(--color-background)', borderTop: `1px solid var(--color-border)`, boxShadow: '0 -1px 4px rgba(0,0,0,0.08)', padding: 'var(--space-2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          {selected.map((domain) => (
            <span key={domain.slug} style={{ background: 'var(--color-neutral)', padding: 'var(--space-1) var(--space-2)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              {domain.name}
              <button aria-label={`Remove ${domain.name} from compare`} onClick={() => remove(domain.slug)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px' }}>&times;</button>
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <button onClick={() => setIsOpen(true)} style={{ background: 'var(--color-accent-primary)', color: '#fff', padding: 'var(--space-1) var(--space-2)', borderRadius: 'var(--radius)', border: 'none' }}>
            Compare ({selected.length})
          </button>
          <button onClick={clear} style={{ background: 'transparent', border: '1px solid var(--color-border)', padding: 'var(--space-1) var(--space-2)', borderRadius: 'var(--radius)', color: 'var(--color-text-primary)' }}>
            Clear
          </button>
        </div>
      </div>
      {/* Modal overlay */}
      {isOpen && (
        <div role="dialog" aria-modal="true" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1001 }}>
          <div style={{ background: 'var(--color-background)', borderRadius: 'var(--radius)', padding: 'var(--space-4)', maxWidth: '90%', width: '800px', maxHeight: '90%', overflowY: 'auto' }}>
            <h2 style={{ marginBottom: 'var(--space-3)' }}>Domain Comparison</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', borderBottom: `1px solid var(--color-border)`, padding: 'var(--space-2)' }}>Domain</th>
                  <th style={{ textAlign: 'left', borderBottom: `1px solid var(--color-border)`, padding: 'var(--space-2)' }}>TLD</th>
                  <th style={{ textAlign: 'left', borderBottom: `1px solid var(--color-border)`, padding: 'var(--space-2)' }}>Status</th>
                  <th style={{ textAlign: 'left', borderBottom: `1px solid var(--color-border)`, padding: 'var(--space-2)' }}>Price</th>
                </tr>
              </thead>
              <tbody>
                {selected.map((domain) => (
                  <tr key={domain.slug}>
                    <td style={{ borderBottom: `1px solid var(--color-border)`, padding: 'var(--space-2)' }}>{domain.name}</td>
                    <td style={{ borderBottom: `1px solid var(--color-border)`, padding: 'var(--space-2)' }}>{domain.tld}</td>
                    <td style={{ borderBottom: `1px solid var(--color-border)`, padding: 'var(--space-2)' }}>{domain.status}</td>
                    <td style={{ borderBottom: `1px solid var(--color-border)`, padding: 'var(--space-2)' }}>{domain.price_type === 'fixed' ? `$${domain.price_value}` : domain.price_type === 'range' ? `$${domain.price_value?.[0]}–$${domain.price_value?.[1]}` : 'POA'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: 'var(--space-3)', textAlign: 'right' }}>
              <button onClick={() => setIsOpen(false)} style={{ padding: 'var(--space-1) var(--space-2)', borderRadius: 'var(--radius)', border: '1px solid var(--color-border)', background: 'transparent' }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}