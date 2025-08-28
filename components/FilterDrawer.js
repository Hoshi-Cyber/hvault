import { useEffect } from 'react';

/**
 * FilterDrawer (mobile)
 * - Full-height left drawer with backdrop
 * - Accessible (role="dialog", aria-modal)
 * - Auto-applies as controls change (same handlers as sidebar)
 */
export default function FilterDrawer({
  open,
  onClose,

  // options
  tldOptions = [],
  categoryOptions = [],
  statusOptions = [],

  // state + handlers from /portfolio
  filters,
  toggleTld,
  toggleCategory,
  handleStatusChange,
  handleLengthChange,
  handlePriceChange,
  handleAgeChange,

  // sort (optional to show in drawer)
  sortBy,
  setSortBy,

  // reset
  onReset
}) {
  // lock body scroll while open
  useEffect(() => {
    document.body.classList.toggle('no-scroll', open);
    return () => document.body.classList.remove('no-scroll');
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden={!open}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,.4)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity .2s ease',
          zIndex: 1001
        }}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
        aria-hidden={!open}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: 'min(420px, 86vw)',
          background: 'var(--color-background)',
          boxShadow: '2px 0 16px rgba(0,0,0,0.1)',
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform .25s ease',
          zIndex: 1002,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'var(--space-3)',
            borderBottom: `1px solid var(--color-border)`
          }}
        >
          <h2 style={{ margin: 0, fontSize: '18px' }}>Filters</h2>
          <button
            onClick={onClose}
            aria-label="Close filters"
            style={{
              background: '#fff',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius)',
              width: 32,
              height: 32,
              lineHeight: '30px',
              textAlign: 'center'
            }}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div
          style={{
            overflowY: 'auto',
            padding: 'var(--space-3)',
            display: 'grid',
            gap: '20px',
            flex: 1
          }}
        >
          {/* Sort (optional inside drawer) */}
          {setSortBy && (
            <section>
              <h3 style={{ fontSize: 'var(--font-size-h3)', marginBottom: 8 }}>
                Sort
              </h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: 8,
                  borderRadius: 'var(--radius)',
                  border: `1px solid var(--color-border)`,
                  width: '100%'
                }}
              >
                <option value="relevance">Relevance</option>
                <option value="shortest">Shortest</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="price">Price</option>
              </select>
            </section>
          )}

          {/* TLD */}
          <section>
            <h3 style={{ fontSize: 'var(--font-size-h3)', marginBottom: 8 }}>
              TLD
            </h3>
            <div style={{ display: 'grid', gap: 6 }}>
              {tldOptions.map((tld) => (
                <label
                  key={tld}
                  style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  <input
                    type="checkbox"
                    checked={filters.tlds.includes(tld)}
                    onChange={() => toggleTld(tld)}
                  />
                  <span>{tld}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Categories */}
          <section>
            <h3 style={{ fontSize: 'var(--font-size-h3)', marginBottom: 8 }}>
              Categories
            </h3>
            <div style={{ display: 'grid', gap: 6 }}>
              {categoryOptions.map((cat) => (
                <label
                  key={cat.slug}
                  style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(cat.slug)}
                    onChange={() => toggleCategory(cat.slug)}
                  />
                  <span>{cat.name}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Status */}
          <section>
            <h3 style={{ fontSize: 'var(--font-size-h3)', marginBottom: 8 }}>
              Status
            </h3>
            <div style={{ display: 'grid', gap: 6 }}>
              {statusOptions.map((status) => (
                <label
                  key={status}
                  style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  <input
                    type="radio"
                    name="status-mobile"
                    checked={filters.status === status}
                    onChange={() => handleStatusChange(status)}
                  />
                  <span>{status}</span>
                </label>
              ))}
              <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="radio"
                  name="status-mobile"
                  checked={filters.status === ''}
                  onChange={() => handleStatusChange('')}
                />
                <span>Any</span>
              </label>
            </div>
          </section>

          {/* Length */}
          <section>
            <h3 style={{ fontSize: 'var(--font-size-h3)', marginBottom: 8 }}>
              Length
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <input
                type="number"
                placeholder="Min"
                value={filters.length[0] || ''}
                onChange={(e) =>
                  handleLengthChange(
                    e.target.value ? parseInt(e.target.value) : null,
                    filters.length[1]
                  )
                }
                style={{
                  padding: 8,
                  borderRadius: 'var(--radius)',
                  border: `1px solid var(--color-border)`
                }}
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.length[1] || ''}
                onChange={(e) =>
                  handleLengthChange(
                    filters.length[0],
                    e.target.value ? parseInt(e.target.value) : null
                  )
                }
                style={{
                  padding: 8,
                  borderRadius: 'var(--radius)',
                  border: `1px solid var(--color-border)`
                }}
              />
            </div>
          </section>

          {/* Price */}
          <section>
            <h3 style={{ fontSize: 'var(--font-size-h3)', marginBottom: 8 }}>
              Price ($)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <input
                type="number"
                placeholder="Min"
                value={filters.price[0] || ''}
                onChange={(e) =>
                  handlePriceChange(
                    e.target.value ? parseInt(e.target.value) : null,
                    filters.price[1]
                  )
                }
                style={{
                  padding: 8,
                  borderRadius: 'var(--radius)',
                  border: `1px solid var(--color-border)`
                }}
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.price[1] || ''}
                onChange={(e) =>
                  handlePriceChange(
                    filters.price[0],
                    e.target.value ? parseInt(e.target.value) : null
                  )
                }
                style={{
                  padding: 8,
                  borderRadius: 'var(--radius)',
                  border: `1px solid var(--color-border)`
                }}
              />
            </div>
          </section>

          {/* Age */}
          <section>
            <h3 style={{ fontSize: 'var(--font-size-h3)', marginBottom: 8 }}>
              Age (yrs)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <input
                type="number"
                placeholder="Min"
                value={filters.age[0] || ''}
                onChange={(e) =>
                  handleAgeChange(
                    e.target.value ? parseInt(e.target.value) : null,
                    filters.age[1]
                  )
                }
                style={{
                  padding: 8,
                  borderRadius: 'var(--radius)',
                  border: `1px solid var(--color-border)`
                }}
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.age[1] || ''}
                onChange={(e) =>
                  handleAgeChange(
                    filters.age[0],
                    e.target.value ? parseInt(e.target.value) : null
                  )
                }
                style={{
                  padding: 8,
                  borderRadius: 'var(--radius)',
                  border: `1px solid var(--color-border)`
                }}
              />
            </div>
          </section>
        </div>

        {/* Footer actions */}
        <div
          style={{
            padding: 'var(--space-3)',
            borderTop: `1px solid var(--color-border)`,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12
          }}
        >
          <button
            onClick={onReset}
            style={{
              background: '#fff',
              border: `1px solid var(--color-border)`,
              borderRadius: 'var(--radius)',
              padding: '10px'
            }}
          >
            Reset
          </button>
          <button
            onClick={onClose}
            style={{
              background: 'var(--color-accent-primary)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius)',
              padding: '10px'
            }}
          >
            Done
          </button>
        </div>
      </aside>
    </>
  );
}
