import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DomainCard from '../../components/DomainCard';
import domainsData from '../../data/domains.json';
import categoriesData from '../../data/categories.json';

/**
 * Portfolio page allows visitors to filter and sort the domain inventory.
 * Filters include TLD, length, categories, price band, status, age and traffic.
 * The component syncs state with query parameters for shareable URLs and
 * supports server-rendered saved views via the sub-routes under /portfolio.
 */
export default function Portfolio() {
  const router = useRouter();
  // Unique lists for filters
  const tldOptions = Array.from(new Set(domainsData.map((d) => d.tld))).sort();
  const statusOptions = Array.from(new Set(domainsData.map((d) => d.status))).sort();
  const categoryOptions = categoriesData;

  // Parse query parameters into state on first render
  const [initialized, setInitialized] = useState(false);
  const [filters, setFilters] = useState({
    tlds: [],
    categories: [],
    status: '',
    length: [null, null],
    price: [null, null],
    age: [null, null]
  });
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    if (!router.isReady || initialized) return;
    const query = router.query;
    const tlds = query.tld ? query.tld.split(',') : [];
    const categories = query.cat ? query.cat.split(',') : [];
    const status = query.status || '';
    const lengthRange = query.len ? query.len.split('-').map((n) => parseInt(n)) : [null, null];
    const priceRange = query.price ? query.price.split('-').map((n) => parseInt(n)) : [null, null];
    const ageRange = query.age ? query.age.split('-').map((n) => parseInt(n)) : [null, null];
    setFilters({ tlds, categories, status, length: lengthRange, price: priceRange, age: ageRange });
    setSortBy(query.sort || 'relevance');
    setInitialized(true);
  }, [router.isReady, initialized]);

  // Update querystring when filters change
  useEffect(() => {
    if (!initialized) return;
    const params = new URLSearchParams();
    if (filters.tlds.length) params.set('tld', filters.tlds.join(','));
    if (filters.categories.length) params.set('cat', filters.categories.join(','));
    if (filters.status) params.set('status', filters.status);
    if (filters.length[0] != null || filters.length[1] != null) params.set('len', `${filters.length[0] || ''}-${filters.length[1] || ''}`);
    if (filters.price[0] != null || filters.price[1] != null) params.set('price', `${filters.price[0] || ''}-${filters.price[1] || ''}`);
    if (filters.age[0] != null || filters.age[1] != null) params.set('age', `${filters.age[0] || ''}-${filters.age[1] || ''}`);
    if (sortBy && sortBy !== 'relevance') params.set('sort', sortBy);
    const queryString = params.toString();
    router.replace({ pathname: '/portfolio', search: queryString ? `?${queryString}` : '' }, undefined, { shallow: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sortBy]);

  // Filter & sort domains
  const filtered = domainsData.filter((d) => {
    // tld filter
    if (filters.tlds.length && !filters.tlds.includes(d.tld)) return false;
    // category filter
    if (filters.categories.length && !filters.categories.some((cat) => d.categories.includes(cat))) return false;
    // status filter
    if (filters.status && d.status !== filters.status) return false;
    // length filter
    if (filters.length[0] && d.length < filters.length[0]) return false;
    if (filters.length[1] && d.length > filters.length[1]) return false;
    // price filter (only consider fixed and range; POA returns false)
    if (filters.price[0] || filters.price[1]) {
      const price = d.price_type === 'fixed' ? [d.price_value, d.price_value] : Array.isArray(d.price_value) ? d.price_value : [null, null];
      if (filters.price[0] && (price[0] == null || price[0] < filters.price[0])) return false;
      if (filters.price[1] && (price[1] == null || price[1] > filters.price[1])) return false;
    }
    // age filter
    if (filters.age[0] && (d.age == null || d.age < filters.age[0])) return false;
    if (filters.age[1] && (d.age == null || d.age > filters.age[1])) return false;
    return true;
  });
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'alphabetical') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'shortest') {
      return a.length - b.length;
    } else if (sortBy === 'price') {
      const priceA = a.price_type === 'fixed' ? a.price_value : Array.isArray(a.price_value) ? a.price_value[0] : Infinity;
      const priceB = b.price_type === 'fixed' ? b.price_value : Array.isArray(b.price_value) ? b.price_value[0] : Infinity;
      return priceA - priceB;
    }
    return 0;
  });

  // Handlers for filters
  const toggleTld = (tld) => {
    setFilters((prev) => {
      const exists = prev.tlds.includes(tld);
      return { ...prev, tlds: exists ? prev.tlds.filter((x) => x !== tld) : [...prev.tlds, tld] };
    });
  };
  const toggleCategory = (slug) => {
    setFilters((prev) => {
      const exists = prev.categories.includes(slug);
      return { ...prev, categories: exists ? prev.categories.filter((x) => x !== slug) : [...prev.categories, slug] };
    });
  };
  const handleStatusChange = (status) => setFilters((prev) => ({ ...prev, status }));
  const handleLengthChange = (from, to) => setFilters((prev) => ({ ...prev, length: [from, to] }));
  const handlePriceChange = (from, to) => setFilters((prev) => ({ ...prev, price: [from, to] }));
  const handleAgeChange = (from, to) => setFilters((prev) => ({ ...prev, age: [from, to] }));

  return (
    <>
      <Head>
        <title>Premium Domain Portfolio | Hoshi Vault</title>
        <meta name="description" content="Discover short .com, geo, and brandable premium domains." />
      </Head>
      <div className="container" style={{ display: 'flex', flexDirection: 'row', gap: 'var(--space-4)', padding: 'var(--space-4) 0' }}>
        {/* Filters */}
        <aside style={{ flex: '0 0 250px', borderRight: `1px solid var(--color-border)`, paddingRight: 'var(--space-3)' }}>
          <h2>Filters</h2>
          {/* TLD */}
          <section style={{ marginBottom: 'var(--space-3)' }}>
            <h3 style={{ fontSize: 'var(--font-size-h3)' }}>TLD</h3>
            {tldOptions.map((tld) => (
              <div key={tld} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                <input type="checkbox" id={`tld-${tld}`} checked={filters.tlds.includes(tld)} onChange={() => toggleTld(tld)} />
                <label htmlFor={`tld-${tld}`} style={{ marginLeft: '4px' }}>{tld}</label>
              </div>
            ))}
          </section>
          {/* Categories */}
          <section style={{ marginBottom: 'var(--space-3)' }}>
            <h3 style={{ fontSize: 'var(--font-size-h3)' }}>Categories</h3>
            {categoryOptions.map((cat) => (
              <div key={cat.slug} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                <input type="checkbox" id={`cat-${cat.slug}`} checked={filters.categories.includes(cat.slug)} onChange={() => toggleCategory(cat.slug)} />
                <label htmlFor={`cat-${cat.slug}`} style={{ marginLeft: '4px' }}>{cat.name}</label>
              </div>
            ))}
          </section>
          {/* Status */}
          <section style={{ marginBottom: 'var(--space-3)' }}>
            <h3 style={{ fontSize: 'var(--font-size-h3)' }}>Status</h3>
            {statusOptions.map((status) => (
              <div key={status} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                <input type="radio" name="status" id={`status-${status}`} checked={filters.status === status} onChange={() => handleStatusChange(status)} />
                <label htmlFor={`status-${status}`} style={{ marginLeft: '4px' }}>{status}</label>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
              <input type="radio" name="status" id="status-any" checked={filters.status === ''} onChange={() => handleStatusChange('')} />
              <label htmlFor="status-any" style={{ marginLeft: '4px' }}>Any</label>
            </div>
          </section>
          {/* Length range */}
          <section style={{ marginBottom: 'var(--space-3)' }}>
            <h3 style={{ fontSize: 'var(--font-size-h3)' }}>Length</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="number"
                placeholder="Min"
                value={filters.length[0] || ''}
                onChange={(e) => handleLengthChange(e.target.value ? parseInt(e.target.value) : null, filters.length[1])}
                style={{ width: '60px', padding: '4px' }}
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.length[1] || ''}
                onChange={(e) => handleLengthChange(filters.length[0], e.target.value ? parseInt(e.target.value) : null)}
                style={{ width: '60px', padding: '4px' }}
              />
            </div>
          </section>
          {/* Price */}
          <section style={{ marginBottom: 'var(--space-3)' }}>
            <h3 style={{ fontSize: 'var(--font-size-h3)' }}>Price ($)</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="number"
                placeholder="Min"
                value={filters.price[0] || ''}
                onChange={(e) => handlePriceChange(e.target.value ? parseInt(e.target.value) : null, filters.price[1])}
                style={{ width: '60px', padding: '4px' }}
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.price[1] || ''}
                onChange={(e) => handlePriceChange(filters.price[0], e.target.value ? parseInt(e.target.value) : null)}
                style={{ width: '60px', padding: '4px' }}
              />
            </div>
          </section>
          {/* Age */}
          <section style={{ marginBottom: 'var(--space-3)' }}>
            <h3 style={{ fontSize: 'var(--font-size-h3)' }}>Age (yrs)</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="number"
                placeholder="Min"
                value={filters.age[0] || ''}
                onChange={(e) => handleAgeChange(e.target.value ? parseInt(e.target.value) : null, filters.age[1])}
                style={{ width: '60px', padding: '4px' }}
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.age[1] || ''}
                onChange={(e) => handleAgeChange(filters.age[0], e.target.value ? parseInt(e.target.value) : null)}
                style={{ width: '60px', padding: '4px' }}
              />
            </div>
          </section>
        </aside>
        {/* Results */}
        <section style={{ flex: '1 1 auto', paddingLeft: 'var(--space-3)' }}>
          <div style={{ marginBottom: 'var(--space-3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0 }}>Domains ({sorted.length})</h2>
            <div>
              <label htmlFor="sort">Sort:</label>{' '}
              <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '4px', borderRadius: 'var(--radius)', border: `1px solid var(--color-border)` }}>
                <option value="relevance">Relevance</option>
                <option value="shortest">Shortest</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="price">Price</option>
              </select>
            </div>
          </div>
          {sorted.length === 0 ? (
            <div style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
              <p>No domains match your filters.</p>
              <button onClick={() => setFilters({ tlds: [], categories: [], status: '', length: [null, null], price: [null, null], age: [null, null] })} style={{ background: 'var(--color-accent-primary)', color: '#fff', padding: 'var(--space-2)', borderRadius: 'var(--radius)', border: 'none' }}>Reset Filters</button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-3)' }}>
              {sorted.map((domain) => (
                <DomainCard key={domain.slug} domain={domain} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}