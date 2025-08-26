import { useEffect, useState } from 'react';
import { useDrawer } from '../context/DrawerContext';

/**
 * InquiryDrawer
 * - True overlay with backdrop
 * - Full-height and max width = viewport on mobile
 * - Body scroll locks while open
 */
export default function InquiryDrawer() {
  const { isOpen, domain, close } = useDrawer();
  const [form, setForm] = useState({ name: '', email: '', message: '', nda: false });
  const [errors, setErrors] = useState({});

  // lock body scroll when open
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

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={close}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,.4)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity .2s ease',
          zIndex: 1001
        }}
        aria-hidden={!isOpen}
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
          height: '100vh',
          width: 'min(420px, 100vw)',
          background: 'var(--color-background)',
          boxShadow: '-2px 0 16px rgba(0,0,0,0.1)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform .25s ease',
          zIndex: 1002,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto'
        }}
      >
        <div style={{ padding: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ marginRight: 'var(--space-2)' }}>Inquire About {domain?.name}</h2>
          <button
            onClick={close}
            aria-label="Close inquiry drawer"
            style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', width: 32, height: 32, lineHeight: '30px', textAlign: 'center' }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '0 var(--space-4) var(--space-4)', display: 'flex', flexDirection: 'column', gap: '12px' }} noValidate>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            style={{ padding: 'var(--space-1)', border: `1px solid var(--color-border)`, borderRadius: 'var(--radius)' }}
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
            style={{ padding: 'var(--space-1)', border: `1px solid var(--color-border)`, borderRadius: 'var(--radius)' }}
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
            style={{ padding: 'var(--space-1)', border: `1px solid var(--color-border)`, borderRadius: 'var(--radius)', resize: 'vertical' }}
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
            required
          />
          {errors.message && <span id="message-error" style={{ color: 'red' }}>{errors.message}</span>}

          <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
            <input type="checkbox" name="nda" checked={form.nda} onChange={handleChange} />
            <span>I agree to the NDA</span>
          </label>

          <button type="submit" style={{ background: 'var(--color-accent-primary)', color: '#fff', padding: 'var(--space-2)', borderRadius: 'var(--radius)', border: 'none', marginTop: 'var(--space-2)' }}>
            Submit Inquiry
          </button>
        </form>
      </aside>
    </>
  );
}
