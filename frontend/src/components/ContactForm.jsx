import { useState } from 'react';
import { api } from '../services/api';

export function ContactForm() {
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    setSubmitting(true);
    setStatus({ type: '', message: '' });
    try {
      await api.post('/api/contact', {
        name: form.get('name'),
        email: form.get('email'),
        message: form.get('message'),
      });
      event.target.reset();
      setStatus({ type: 'success', message: 'Message received. Thank you.' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="form form-card" onSubmit={handleSubmit}>
      <label>
        Name
        <input name="name" autoComplete="name" required minLength={2} />
      </label>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        Message
        <textarea name="message" required minLength={10} />
      </label>
      {status.message ? <div className={`alert ${status.type}`}>{status.message}</div> : null}
      <button className="btn btn-primary" type="submit" disabled={submitting}>
        {submitting ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
