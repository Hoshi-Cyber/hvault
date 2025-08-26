import { useState } from 'react';

/**
 * LeaseCalculator computes the monthly cost of leasing a domain
 * given a total price and selected term. It provides a simple
 * interface and ensures calculations update reactively.
 */
export default function LeaseCalculator({ price, terms }) {
  const [term, setTerm] = useState(terms[0]);
  const monthly = price && term ? (price / term).toFixed(2) : 0;
  return (
    <div style={{ marginTop: 'var(--space-2)', border: `1px solid var(--color-border)`, padding: 'var(--space-2)', borderRadius: 'var(--radius)' }}>
      <h4>Lease Calculator</h4>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2)' }}>
        <label htmlFor="lease-term">Term:</label>
        <select id="lease-term" value={term} onChange={(e) => setTerm(parseInt(e.target.value))} style={{ padding: '4px', border: `1px solid var(--color-border)`, borderRadius: 'var(--radius)' }}>
          {terms.map((t) => (
            <option key={t} value={t}>{t} months</option>
          ))}
        </select>
      </div>
      {price ? (
        <p><strong>${monthly}</strong> / month &nbsp;|&nbsp; Total: <strong>${price}</strong></p>
      ) : (
        <p>Contact us for pricing information.</p>
      )}
    </div>
  );
}