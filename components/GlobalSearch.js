import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import domains from '../data/domains.json';
import categories from '../data/categories.json';
import insights from '../data/insights.json';

/**
 * GlobalSearch implements an accessible autocomplete for domains,
 * categories and insights. The combobox pattern is applied with
 * appropriate ARIA roles. Suggestions are filtered client-side and
 * limited to five to preserve performance and cognitive load.
 */
export default function GlobalSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      setActiveIndex(-1);
      return;
    }
    const q = query.toLowerCase();
    const domainMatches = domains.filter((d) => d.name.toLowerCase().includes(q)).map((d) => ({ type: 'domain', label: d.name, slug: d.slug }));
    const categoryMatches = categories.filter((c) => c.name.toLowerCase().includes(q)).map((c) => ({ type: 'category', label: c.name, slug: c.slug }));
    const insightMatches = insights.filter((i) => i.title.toLowerCase().includes(q)).map((i) => ({ type: 'insight', label: i.title, slug: i.slug }));
    const combined = [...domainMatches, ...categoryMatches, ...insightMatches].slice(0, 5);
    setSuggestions(combined);
    setActiveIndex(-1);
  }, [query]);

  const onSelect = (item) => {
    if (item.type === 'domain') {
      router.push(`/domain/${item.slug}`);
    } else if (item.type === 'category') {
      router.push(`/categories/${item.slug}`);
    } else if (item.type === 'insight') {
      router.push(`/insights/${item.slug}`);
    }
    setQuery('');
    setSuggestions([]);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      onSelect(suggestions[activeIndex]);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <label htmlFor="global-search" className="sr-only">Search domains, categories, articles</label>
      <input
        ref={inputRef}
        id="global-search"
        type="text"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={suggestions.length > 0}
        aria-controls="search-suggestions"
        aria-activedescendant={activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined}
        placeholder="Search domains, categories, insights"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ width: '100%', padding: 'var(--space-2)', border: `1px solid var(--color-border)`, borderRadius: 'var(--radius)' }}
      />
      {suggestions.length > 0 && (
        <ul id="search-suggestions" role="listbox" style={{ position: 'absolute', zIndex: 10, background: 'var(--color-background)', border: `1px solid var(--color-border)`, width: '100%', borderRadius: 'var(--radius)', marginTop: '4px', maxHeight: '200px', overflowY: 'auto' }}>
          {suggestions.map((item, index) => (
            <li
              id={`suggestion-${index}`}
              key={`${item.type}-${item.slug}`}
              role="option"
              aria-selected={activeIndex === index}
              onMouseDown={() => onSelect(item)}
              style={{ padding: 'var(--space-2)', background: activeIndex === index ? 'var(--color-neutral)' : 'transparent', cursor: 'pointer' }}
            >
              <strong>{item.label}</strong> <span style={{ fontSize: 'var(--font-size-small)', color: '#777' }}>({item.type})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}