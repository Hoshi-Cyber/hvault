import { useEffect, useState } from 'react';
import { useDrawer } from '../context/DrawerContext';

/**
 * InquiryDrawer
 * - Domain summary (name, status pill, price/range) pinned under header
 * - Esc to close + backdrop click
 * - Sticky footer with Cancel + Submit
 * - Hidden payload fields: slug, name, status, price_type, price_value
 * - Respects prefers-reduced-motion
 */
export default function InquiryDrawer() {
  const { isOpen, domain, close } = useDrawer();
  const [form, setForm] = useState({ name: '', email: '', message: '', nda: false });
  const [errors, setErrors] = useState({});

  // derive price display and raw value for payload
  const getPriceDisplay = () => {
    if (!domain) return 'Price on Application';
    if (domain.price_type === 'fixed') return `$${domain.price_value}`;
    if (domain.price_type === 'range' && Array.isArray(domain.price_value)) {
      const [lo, hi] = domain.price_value;
      return `$${lo}–$${hi}`;
    }
    return 'Price on Application';
  };
  const priceDisplay = getPriceDisplay();
  const priceRaw = domain?.price_value ?? null;

  // lock body scroll when open
  useEffect(() => {
    document.body.classList.toggle('no-scroll', isOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [isOpen]);

  // close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name) errs.name = 'Please enter your name';
    if (!form.email) errs.email = 'Please enter your email';
    if (!form.message) errs.message = 'Please provide a message';
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      // payload with domain context
      const payload = {
        ...form,
        domain: {
          slug: domain?.slug,
          name: domain?.name,
          status: domain?.status,
          price_type: domain?.price_type,
          price_value: domain?.price_value,
        },
      };
      console.log('Inquiry submitted', payload);
      alert('Thank you for your inquiry!');
      close();
      setForm({ name: '', email: '', message: '', nda: false });
    }
  };

  // reduced motion
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const drawerTransition = prefersReduced ? 'none' : 'transform .28s cubic-bezier(.2,.8,.2,1)';
  const fadeUpTransition = prefersReduced ? 'none' : 'opacity .28s ease, transform .28s ease';

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={close}
        aria-hidden={!isOpen}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,.4)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: prefersReduced ? 'none' : 'opacity .2s ease',
          zIndex: 1001
        }}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Inquiry form"
        aria-hidden={!isOpen}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100dvh',
          width: 'min(440px, 100vw)',
          background: 'var(--color-background)',
          boxShadow: '-2px 0 16px rgba(0,0,0,0.1)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: drawerTransition,
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
            padding: '12px 16px',
            borderBottom: '1px solid var(--color-border)',
            minHeight: 48
          }}
        >
          <h2 style={{ fontSize: 18, marginRight: 8, lineHeight: 1.2 }}>
            Inquire About {domain?.name ?? 'this domain'}
          </h2>
          <button
            onClick={close}
            aria-label="Close inquiry drawer"
            style={{
              background: '#fff',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              width: 32,
              height: 32,
              lineHeight: '30px',
              textAlign: 'center',
              fontSize: 18
            }}
          >
            ×
          </button>
        </div>

        {/* Domain summary */}
        {domain && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: 8,
              alignItems: 'center',
              padding: '12px 16px',
              borderBottom: '1px solid var(--color-border)'
            }}
          >
            <div>
              <div style={{ fontWeight: 600 }}>{domain.name}</div>
              <div style={{ fontSize: 14, color: '#555' }}>
                {domain.tld} · {domain.length} chars
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '2px 8px',
                  borderRadius: 999,
                  fontSize: 12,
                  lineHeight: 1.6,
                  background: '#f1f5ff',
                  color: '#1b3cff',
                  border: '1px solid var(--color-border)'
                }}
                aria-label={`status ${domain.status}`}
              >
                {domain.status}
              </span>
              <div style={{ fontSize: 14, marginTop: 6 }}>{priceDisplay}</div>
            </div>
          </div>
        )}

        {/* Animated content wrapper */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateY(0)' : 'translateY(8px)',
            transition: fadeUpTransition
          }}
        >
          {/* Scrollable form content */}
          <form
            onSubmit={handleSubmit}
            noValidate
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              padding: '16px',
              overflowY: 'auto',
              flex: 1
            }}
          >
            {/* Hidden payload fields */}
            <input type="hidden" name="domain_slug" value={domain?.slug ?? ''} />
            <input type="hidden" name="domain_name" value={domain?.name ?? ''} />
            <input type="hidden" name="domain_status" value={domain?.status ?? ''} />
            <input type="hidden" name="domain_price_type" value={domain?.price_type ?? ''} />
            <input
              type="hidden"
              name="domain_price_value"
              value={
                Array.isArray(priceRaw) ? JSON.stringify(priceRaw) : (priceRaw ?? '')
              }
            />

            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              style={{ padding: '10px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)' }}
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
              required
            />
            {errors.name && <span id="name-error" style={{ color: 'red' }}>{errors.name}</span>}

            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              style={{ padding: '10px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)' }}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              required
            />
            {errors.email && <span id="email-error" style={{ color: 'red' }}>{errors.email}</span>}

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={6}
              style={{ padding: '10px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', resize: 'vertical' }}
              aria-invalid={errors.message ? 'true' : 'false'}
              aria-describedby={errors.message ? 'message-error' : undefined}
              required
            />
            {errors.message && <span id="message-error" style={{ color: 'red' }}>{errors.message}</span>}

            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" name="nda" checked={form.nda} onChange={handleChange} />
              <span>I agree to the NDA</span>
            </label>
          </form>

          {/* Sticky action bar */}
          <div
            style={{
              position: 'sticky',
              bottom: 0,
              background: '#fff',
              borderTop: '1px solid var(--color-border)',
              padding: 12,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 8
            }}
          >
            <button
              type="button"
              onClick={close}
              style={{
                width: '100%',
                background: '#fff',
                color: 'var(--color-text-primary)',
                padding: '12px 14px',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--color-border)',
                fontWeight: 600
              }}
            >
              Cancel
            </button>
            <button
              formAction="#"
              onClick={(e) => {
                // allow Enter on focused button to submit form
                const formEl = e.currentTarget.closest('aside')?.querySelector('form');
                if (formEl) formEl.requestSubmit();
              }}
              style={{
                width: '100%',
                background: 'var(--color-accent-primary)',
                color: '#fff',
                padding: '12px 14px',
                borderRadius: 'var(--radius)',
                border: 'none',
                fontWeight: 600
              }}
            >
              Submit Inquiry
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
