import { useDrawer } from '../context/DrawerContext';
import { useState } from 'react';

/**
 * InquiryDrawer presents a slide-in panel for visitors to express
 * interest in a domain. It includes a basic form with ARIA labels
 * and error announcements for accessibility. On submit we simply
 * log the values to the console; integration with a backend is
 * expected in production.
 */
export default function InquiryDrawer() {
  const { isOpen, domain, close } = useDrawer();
  const [form, setForm] = useState({ name: '', email: '', message: '', nda: false });
  const [errors, setErrors] = useState({});
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
    <div
      aria-hidden={!isOpen}
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '400px',
        maxWidth: '100%',
        height: '100%',
        background: 'var(--color-background)',
        boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease-in-out',
        zIndex: 1002,
        overflowY: 'auto'
      }}
    >
      <div style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Inquire About {domain?.name}</h2>
          <button onClick={close} aria-label="Close inquiry drawer" style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>&times;</button>
        </div>
        <form onSubmit={handleSubmit} style={{ marginTop: 'var(--space-3)', flex: 1, display: 'flex', flexDirection: 'column' }} noValidate>
          <label htmlFor="name" style={{ marginBottom: '4px' }}>Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            style={{ padding: 'var(--space-1)', border: `1px solid var(--color-border)`, borderRadius: 'var(--radius)', marginBottom: 'var(--space-2)' }}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
            required
          />
          {errors.name && <span id="name-error" style={{ color: 'red', marginBottom: 'var(--space-2)' }}>{errors.name}</span>}

          <label htmlFor="email" style={{ marginBottom: '4px' }}>Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            style={{ padding: 'var(--space-1)', border: `1px solid var(--color-border)`, borderRadius: 'var(--radius)', marginBottom: 'var(--space-2)' }}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            required
          />
          {errors.email && <span id="email-error" style={{ color: 'red', marginBottom: 'var(--space-2)' }}>{errors.email}</span>}

          <label htmlFor="message" style={{ marginBottom: '4px' }}>Message</label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            style={{ padding: 'var(--space-1)', border: `1px solid var(--color-border)`, borderRadius: 'var(--radius)', marginBottom: 'var(--space-2)', resize: 'vertical' }}
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
            required
          />
          {errors.message && <span id="message-error" style={{ color: 'red', marginBottom: 'var(--space-2)' }}>{errors.message}</span>}

          <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', marginBottom: 'var(--space-3)' }}>
            <input type="checkbox" name="nda" checked={form.nda} onChange={handleChange} />
            <span>I agree to the NDA</span>
          </label>
          <button type="submit" style={{ background: 'var(--color-accent-primary)', color: '#fff', padding: 'var(--space-2)', borderRadius: 'var(--radius)', border: 'none', marginTop: 'auto' }}>
            Submit Inquiry
          </button>
        </form>
      </div>
    </div>
  );
}