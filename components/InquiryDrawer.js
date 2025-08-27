import { useEffect, useState } from 'react';
import { useDrawer } from '../context/DrawerContext';

/**
 * InquiryDrawer with subtle animations:
 * - Drawer slides in from right
 * - Content fades + slides up slightly
 * - Respects prefers-reduced-motion
 */
export default function InquiryDrawer() {
  const { isOpen, domain, close } = useDrawer();
  const [form, setForm] = useState({ name: '', email: '', message: '', nda: false });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.body.classList.toggle('no-scroll', isOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [isOpen]);

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
      console.log('Inquiry submitted', { ...form, domain });
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
          width: 'min(420px, 100vw)',
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
            Inquire About {domain?.name}
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

            {/* Sticky submit bar */}
            <div
              style={{
                position: 'sticky',
                bottom: 0,
                background: '#fff',
                paddingTop: 8,
                paddingBottom: 8,
                borderTop: '1px solid var(--color-border)'
              }}
            >
              <button
                type="submit"
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
          </form>
        </div>
      </aside>
    </>
  );
}
