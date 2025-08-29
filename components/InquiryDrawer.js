import { useEffect, useMemo, useRef, useState } from 'react';
import { useDrawer } from '../context/DrawerContext';

/**
 * InquiryDrawer
 * - Domain summary (name, status pill, price/range) under header
 * - ESC to close + backdrop click
 * - Sticky footer with Cancel + Submit
 * - Hidden payload fields: slug, name, status, price_type, price_value, min_offer
 * - Min-offer gate (numeric) enforced when status === 'make-offer'
 * - Focus trap while open; return focus to trigger on close
 * - Fieldset/legend groupings; respects prefers-reduced-motion
 */
export default function InquiryDrawer() {
  const { isOpen, domain, close } = useDrawer();

  // ---- form state ----
  const [form, setForm] = useState({ name: '', email: '', message: '', nda: false, offer: '' });
  const [errors, setErrors] = useState({});

  // ---- derived meta ----
  const minOffer = useMemo(() => {
    if (!domain) return null;
    if (typeof domain.min_offer === 'number') return domain.min_offer;
    if (domain.price_type === 'range' && Array.isArray(domain.price_value)) {
      const [lo] = domain.price_value;
      return typeof lo === 'number' ? lo : null;
    }
    return null;
  }, [domain]);

  const priceText = useMemo(() => {
    if (!domain) return 'POA';
    if (domain.price_type === 'fixed' && typeof domain.price_value === 'number') {
      return `Buy $${domain.price_value.toLocaleString()}`;
    }
    if (domain.price_type === 'range' && Array.isArray(domain.price_value)) {
      const [lo, hi] = domain.price_value;
      if (typeof lo === 'number' && typeof hi === 'number') {
        return `$${lo.toLocaleString()}–$${hi.toLocaleString()}`;
      }
    }
    // (Optional) Lease quick hint if you store monthly_from
    if (domain.status === 'lease' && domain.lease_terms?.monthly_from) {
      return `Lease from $${Number(domain.lease_terms.monthly_from).toLocaleString()}/mo`;
    }
    return 'POA';
  }, [domain]);

  const pillClass =
    domain?.status ? `pill pill--${String(domain.status).toLowerCase()}` : 'pill';

  // raw price for payload
  const priceRaw = domain?.price_value ?? null;

  // ---- body scroll lock ----
  useEffect(() => {
    document.body.classList.toggle('no-scroll', isOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [isOpen]);

  // ---- ESC to close ----
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close]);

  // ---- focus trap + return focus ----
  const drawerRef = useRef(null);
  const returnFocusElRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // remember trigger
      returnFocusElRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      // move focus into drawer
      const first = getFocusable(drawerRef.current)[0];
      first?.focus();

      const handleTab = (e) => {
        if (e.key !== 'Tab') return;
        const els = getFocusable(drawerRef.current);
        if (!els.length) return;
        const firstEl = els[0], lastEl = els[els.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault(); lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault(); firstEl.focus();
        }
      };
      const node = drawerRef.current;
      node?.addEventListener('keydown', handleTab);
      return () => node?.removeEventListener('keydown', handleTab);
    } else {
      // return focus to trigger
      const el = returnFocusElRef.current;
      if (el && typeof el.focus === 'function') {
        setTimeout(() => el.focus(), 0);
      }
    }
  }, [isOpen]);

  function getFocusable(root) {
    if (!root) return [];
    const sel = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');
    return Array.from(root.querySelectorAll(sel)).filter(
      (el) => el.offsetParent !== null || el.getAttribute('aria-hidden') !== 'true'
    );
  }

  // ---- handlers ----
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

    // make-offer numeric validation
    if (domain?.status === 'make-offer') {
      const offerNum = Number(form.offer);
      if (!form.offer) {
        errs.offer = 'Please enter your offer';
      } else if (Number.isNaN(offerNum)) {
        errs.offer = 'Offer must be a number';
      } else if (typeof minOffer === 'number' && offerNum < minOffer) {
        errs.offer = `Minimum offer is $${minOffer.toLocaleString()}`;
      }
    }

    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      const payload = {
        ...form,
        offer: form.offer ? Number(form.offer) : undefined,
        domain: {
          slug: domain?.slug,
          name: domain?.name,
          status: domain?.status,
          price_type: domain?.price_type,
          price_value: domain?.price_value,
          min_offer: minOffer ?? null,
        },
      };
      console.log('Inquiry submitted', payload);
      alert('Thank you for your inquiry!');
      close();
      setForm({ name: '', email: '', message: '', nda: false, offer: '' });
    }
  };

  // ---- motion prefs ----
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
        className="backdrop"
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
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Inquiry form"
        aria-hidden={!isOpen}
        className={`drawer ${isOpen ? 'open' : ''}`}
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
              <span className={pillClass} aria-label={`status ${domain.status}`}>{domain.status}</span>
              <div style={{ fontSize: 14, marginTop: 6 }}>{priceText}</div>
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
              value={Array.isArray(priceRaw) ? JSON.stringify(priceRaw) : (priceRaw ?? '')}
            />
            <input type="hidden" name="domain_min_offer" value={minOffer ?? ''} />

            {/* Details */}
            <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
              <legend style={{ fontWeight: 600, marginBottom: 6 }}>Your details</legend>

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
            </fieldset>

            {/* Make-offer gate (only when applicable) */}
            {domain?.status === 'make-offer' && (
              <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                <legend style={{ fontWeight: 600, marginBottom: 6 }}>Your offer</legend>

                <label htmlFor="offer">Offer amount (USD)</label>
                <input
                  id="offer"
                  name="offer"
                  type="number"
                  inputMode="numeric"
                  min={typeof minOffer === 'number' ? minOffer : undefined}
                  placeholder={typeof minOffer === 'number' ? String(minOffer) : 'Enter amount'}
                  value={form.offer}
                  onChange={handleChange}
                  style={{ padding: '10px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)' }}
                  aria-invalid={errors.offer ? 'true' : 'false'}
                  aria-describedby={errors.offer ? 'offer-error' : 'offer-help'}
                  required
                />
                <div id="offer-help" style={{ fontSize: 12, color: '#555', marginTop: 4 }}>
                  {typeof minOffer === 'number'
                    ? `Minimum offer $${minOffer.toLocaleString()}`
                    : 'Enter your best offer'}
                </div>
                {errors.offer && <span id="offer-error" style={{ color: 'red' }}>{errors.offer}</span>}
              </fieldset>
            )}

            {/* Message */}
            <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
              <legend style={{ fontWeight: 600, marginBottom: 6 }}>Message</legend>
              <label htmlFor="message" className="sr-only">Message</label>
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
            </fieldset>

            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" name="nda" checked={form.nda} onChange={handleChange} />
              <span>I agree to the NDA</span>
            </label>
          </form>

          {/* Sticky action bar */}
          <div className="drawer-actions">
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
              type="button"
              onClick={(e) => {
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
