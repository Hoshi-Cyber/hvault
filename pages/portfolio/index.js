import { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DomainCard from '../../components/DomainCard';
import FilterDrawer from '../../components/FilterDrawer';
import domainsData from '../../data/domains.json';
import categoriesData from '../../data/categories.json';

export default function Portfolio() {
  const router = useRouter();

  // --- options ---
  const tldOptions = useMemo(
    () => Array.from(new Set(domainsData.map((d) => d.tld))).sort(),
    []
  );
  const statusOptions = useMemo(
    () => Array.from(new Set(domainsData.map((d) => d.status))).sort(),
    []
  );
  const categoryOptions = categoriesData;

  // --- responsive flag ---
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = () => setIsMobile(window.innerWidth < 768);
    mq();
    window.addEventListener('resize', mq);
    return () => window.removeEventListener('resize', mq);
  }, []);

  // --- state / query sync ---
  const [initialized, setInitialized] = useState(false);
  const [filters, setFilters] = useState({
    tlds: [],
    categories: [],
    status: '',
    length: [null, null],
    price: [null, null],
    age: [null, null],
  });
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    if (!router.isReady || initialized) return;
    const q = router.query;
    const tlds = q.tld ? String(q.tld).split(',') : [];
    const categories = q.cat ? String(q.cat).split(',') : [];
    const status = q.status ? String(q.status) : '';
    const lengthRange = q.len ? String(q.len).split('-').map(n => parseInt(n || '', 10) || null) : [null, null];
    const priceRange  = q.price ? String(q.price).split('-').map(n => parseInt(n || '', 10) || null) : [null, null];
    const ageRange    = q.age ? String(q.age).split('-').map(n => parseInt(n || '', 10) || null) : [null, null];
    setFilters({ tlds, categories, status, length: lengthRange, price: priceRange, age: ageRange });
    setSortBy(q.sort ? String(q.sort) : 'relevance');
    setInitialized(true);
  }, [router.isReady, initialized, router.query]);

  useEffect(() => {
    if (!initialized) return;
    const params = new URLSearchParams();
    if (filters.tlds.length) params.set('tld', filters.tlds.join(','));
    if (filters.categories.length) params.set('cat', filters.categories.join(','));
    if (filters.status) params.set('status', filters.status);
    if (filters.length[0] != null || filters.length[1] != null) params.set('len', `${filters.length[0] ?? ''}-${filters.length[1] ?? ''}`);
    if (filters.price[0]  != null || filters.price[1]  != null) params.set('price', `${filters.price[0]  ?? ''}-${filters.price[1]  ?? ''}`);
    if (filters.age[0]    != null || filters.age[1]    != null) params.set('age', `${filters.age[0]    ?? ''}-${filters.age[1]    ?? ''}`);
    if (sortBy && sortBy !== 'relevance') params.set('sort', sortBy);

    router.replace(
      { pathname: '/portfolio', search: params.toString() ? `?${params.toString()}` : '' },
      undefined,
      { shallow: true }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sortBy]);

  // --- filtering & sorting ---
  const filtered = useMemo(() => {
    return domainsData.filter((d) => {
      if (filters.tlds.length && !filters.tlds.includes(d.tld)) return false;
      if (filters.categories.length && !filters.categories.some((c) => d.categories.includes(c))) return false;
      if (filters.status && d.status !== filters.status) return false;
      if (filters.length[0] && d.length < filters.length[0]) return false;
      if (filters.length[1] && d.length > filters.length[1]) return false;
      if (filters.price[0] || filters.price[1]) {
        const price = d.price_type === 'fixed'
          ? [d.price_value, d.price_value]
          : Array.isArray(d.price_value) ? d.price_value : [null, null];
        if (filters.price[0] && (price[0] == null || price[0] < filters.price[0])) return false;
        if (filters.price[1] && (price[1] == null || price[1] > filters.price[1])) return false;
      }
      if (filters.age[0] && (d.age == null || d.age < filters.age[0])) return false;
      if (filters.age[1] && (d.age == null || d.age > filters.age[1])) return false;
      return true;
    });
  }, [filters]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sortBy === 'alphabetical') return arr.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === 'shortest')     return arr.sort((a, b) => a.length - b.length);
    if (sortBy === 'price') {
      const p = (x) => x.price_type === 'fixed'
        ? x.price_value
        : Array.isArray(x.price_value) ? x.price_value[0] : Infinity;
      return arr.sort((a, b) => p(a) - p(b));
    }
    return arr;
  }, [filtered, sortBy]);

  // --- handlers ---
  const toggleTld = (tld) =>
    setFilters((prev) => ({
      ...prev,
      tlds: prev.tlds.includes(tld) ? prev.tlds.filter((x) => x !== tld) : [...prev.tlds, tld],
    }));
  const toggleCategory = (slug) =>
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(slug) ? prev.categories.filter((x) => x !== slug) : [...prev.categories, slug],
    }));
  const handleStatusChange = (status) => setFilters((prev) => ({ ...prev, status }));
  const handleLengthChange = (from, to) => setFilters((prev) => ({ ...prev, length: [from, to] }));
  const handlePriceChange  = (from, to) => setFilters((prev) => ({ ...prev, price: [from, to] }));
  const handleAgeChange    = (from, to) => setFilters((prev) => ({ ...prev, age: [from, to] }));
  const clearAll = () => setFilters({ tlds: [], categories: [], status: '', length: [null, null], price: [null, null], age: [null, null] });

  const activeCount = useMemo(() => {
    let n = 0;
    if (filters.tlds.length) n++;
    if (filters.categories.length) n++;
    if (filters.status) n++;
    if (filters.length[0] != null || filters.length[1] != null) n++;
    if (filters.price[0]  != null || filters.price[1]  != null) n++;
    if (filters.age[0]    != null || filters.age[1]    != null) n++;
    return n;
  }, [filters]);

  // --- mobile drawer trigger state (body lock handled inside FilterDrawer) ---
  const [drawerOpen, setDrawerOpen] = useState(false);

  // shared filters UI (rendered in desktop sidebar; same controls as drawer)
  const FiltersUI = (
    <>
      {/* TLD */}
      <section style={{ marginBottom: 'var(--space-3)' }}>
        <h3 style={{ fontSize: 'var(--font-size-h3)' }}>TLD</h3>
        {tldOptions.map((tld) => (
          <div key={tld} style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
            <input type="checkbox" id={`tld-${tld}`} checked={filters.tlds.includes(tld)} onChange={() => toggleTld(tld)} />
            <label htmlFor={`tld-${tld}`} style={{ marginLeft: 6 }}>{tld}</label>
          </div>
        ))}
      </section>

      {/* Categories */}
      <section style={{ marginBottom: 'var(--space-3)' }}>
        <h3 style={{ fontSize: 'var(--font-size-h3)' }}>Categories</h3>
        {categoryOptions.map((cat) => (
          <div key={cat.slug} style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
            <input type="checkbox" id={`cat-${cat.slug}`} checked={filters.categories.includes(cat.slug)} onChange={() => toggleCategory(cat.slug)} />
            <label htmlFor={`cat-${cat.slug}`} style={{ marginLeft: 6 }}>{cat.name}</label>
          </div>
        ))}
      </section>

      {/* Status */}
      <section style={{ marginBottom: 'var(--space-3)' }}>
        <h3 style={{ fontSize: 'var(--font-size-h3)' }}>Status</h3>
        {statusOptions.map((status) => (
          <div key={status} style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
            <input type="radio" name="status" id={`status-${status}`} checked={filters.status === status} onChange={() => handleStatusChange(status)} />
            <label htmlFor={`status-${status}`} style={{ marginLeft: 6 }}>{status}</label>
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 4 }}>
          <input type="radio" name="status" id="status-any" checked={filters.status === ''} onChange={() => handleStatusChange('')} />
          <label htmlFor="status-any" style={{ marginLeft: 6 }}>Any</label>
        </div>
      </section>

      {/* Length */}
      <section style={{ marginBottom: 'var(--space-3)' }}>
        <h3 style={{ fontSize: 'var(--font-size-h3)' }}>Length</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="number"
            placeholder="Min"
            value={filters.length[0] ?? ''}
            onChange={(e) => handleLengthChange(e.target.value ? parseInt(e.target.value, 10) : null, filters.length[1])}
            style={{ width: 72, padding: 6 }}
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.length[1] ?? ''}
            onChange={(e) => handleLengthChange(filters.length[0], e.target.value ? parseInt(e.target.value, 10) : null)}
            style={{ width: 72, padding: 6 }}
          />
        </div>
      </section>

      {/* Price */}
      <section style={{ marginBottom: 'var(--space-3)' }}>
        <h3 style={{ fontSize: 'var(--font-size-h3)' }}>Price ($)</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="number"
            placeholder="Min"
            value={filters.price[0] ?? ''}
            onChange={(e) => handlePriceChange(e.target.value ? parseInt(e.target.value, 10) : null, filters.price[1])}
            style={{ width: 100, padding: 6 }}
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.price[1] ?? ''}
            onChange={(e) => handlePriceChange(filters.price[0], e.target.value ? parseInt(e.target.value, 10) : null)}
            style={{ width: 100, padding: 6 }}
          />
        </div>
      </section>

      {/* Age */}
      <section style={{ marginBottom: 'var(--space-3)' }}>
        <h3 style={{ fontSize: 'var(--font-size-h3)' }}>Age (yrs)</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="number"
            placeholder="Min"
            value={filters.age[0] ?? ''}
            onChange={(e) => handleAgeChange(e.target.value ? parseInt(e.target.value, 10) : null, filters.age[1])}
            style={{ width: 72, padding: 6 }}
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.age[1] ?? ''}
            onChange={(e) => handleAgeChange(filters.age[0], e.target.value ? parseInt(e.target.value, 10) : null)}
            style={{ width: 72, padding: 6 }}
          />
        </div>
      </section>
    </>
  );

  return (
    <>
      <Head>
        <title>Premium Domain Portfolio | Hoshi Vault</title>
        <meta name="description" content="Discover short .com, geo, and brandable premium domains." />
      </Head>

      {/* MOBILE toolbar */}
      {isMobile && (
        <div
          style={{
            position: 'sticky',
            top: 'calc(var(--site-header-h, 56px))',
            zIndex: 10,
            background: '#fff',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0' }}>
            <button
              onClick={() => setDrawerOpen(true)}
              aria-haspopup="dialog"
              style={{
                border: `1px solid var(--color-border)`,
                borderRadius: 8,
                padding: '8px 12px',
                background: '#fff',
                fontWeight: 600,
              }}
            >
              Filters{activeCount ? ` (${activeCount})` : ''}
            </button>
            <div style={{ marginLeft: 'auto' }}>
              <label htmlFor="sort-m" style={{ marginRight: 6 }}>Sort:</label>
              <select
                id="sort-m"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ padding: 8, borderRadius: 8, border: '1px solid var(--color-border)' }}
              >
                <option value="relevance">Relevance</option>
                <option value="shortest">Shortest</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="price">Price</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div
        className="container"
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 'var(--space-4)',
          padding: 'var(--space-4) 0',
        }}
      >
        {/* DESKTOP filters */}
        {!isMobile && (
          <aside
            style={{
              flex: '0 0 260px',
              borderRight: `1px solid var(--color-border)`,
              paddingRight: 'var(--space-3)',
              position: 'sticky',
              top: 'calc(var(--site-header-h, 56px) + 12px)',
              height: 'calc(100vh - var(--site-header-h, 56px) - 24px)',
              overflow: 'auto',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <h2 style={{ margin: 0 }}>Filters</h2>
              {activeCount > 0 && (
                <button
                  onClick={clearAll}
                  style={{ border: 'none', background: 'transparent', color: 'var(--color-accent-primary)', cursor: 'pointer' }}
                >
                  Clear
                </button>
              )}
            </div>
            {FiltersUI}
          </aside>
        )}

        {/* RESULTS */}
        <section style={{ flex: '1 1 auto', paddingLeft: isMobile ? 0 : 'var(--space-3)' }}>
          {!isMobile && (
            <div style={{ marginBottom: 'var(--space-3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0 }}>Domains ({sorted.length})</h2>
              <div>
                <label htmlFor="sort">Sort:</label>{' '}
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{ padding: 6, borderRadius: 8, border: `1px solid var(--color-border)` }}
                >
                  <option value="relevance">Relevance</option>
                  <option value="shortest">Shortest</option>
                  <option value="alphabetical">Alphabetical</option>
                  <option value="price">Price</option>
                </select>
              </div>
            </div>
          )}

          {sorted.length === 0 ? (
            <div style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
              <p>No domains match your filters.</p>
              <button
                onClick={clearAll}
                style={{ background: 'var(--color-accent-primary)', color: '#fff', padding: 'var(--space-2)', borderRadius: 'var(--radius)', border: 'none' }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: 'var(--space-3)',
              }}
            >
              {sorted.map((domain) => (
                <DomainCard key={domain.slug} domain={domain} />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* MOBILE Filter Drawer (external component) */}
      {isMobile && (
        <FilterDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          tldOptions={tldOptions}
          categoryOptions={categoryOptions}
          statusOptions={statusOptions}
          filters={filters}
          toggleTld={toggleTld}
          toggleCategory={toggleCategory}
          handleStatusChange={handleStatusChange}
          handleLengthChange={handleLengthChange}
          handlePriceChange={handlePriceChange}
          handleAgeChange={handleAgeChange}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onReset={clearAll}
        />
      )}
    </>
  );
}
