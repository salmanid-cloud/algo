'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="glass-panel space-y-4 rounded-[2rem] p-6"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <input required placeholder="Your name" className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm outline-none ring-brass/40 transition placeholder:text-ivory/40 focus:ring-4" />
        <input required type="email" placeholder="Email address" className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm outline-none ring-brass/40 transition placeholder:text-ivory/40 focus:ring-4" />
      </div>
      <input placeholder="Phone / WhatsApp" className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm outline-none ring-brass/40 transition placeholder:text-ivory/40 focus:ring-4" />
      <textarea required placeholder="Tell us about the pair you want crafted" rows={5} className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm outline-none ring-brass/40 transition placeholder:text-ivory/40 focus:ring-4" />
      <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brass px-6 py-4 font-bold text-espresso transition hover:bg-ivory">
        <Send className="h-4 w-4" /> Request Consultation
      </button>
      {sent && <p className="text-center text-sm text-brass">Thank you. Our family atelier will respond within one business day.</p>}
    </form>
  );
}
