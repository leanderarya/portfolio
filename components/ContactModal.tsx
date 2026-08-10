"use client";

import { useState } from "react";
import { FaXmark } from "react-icons/fa6";

export default function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sent, setSent] = useState(false);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = fd.get("name") as string;
    const email = fd.get("email") as string;
    const message = fd.get("message") as string;
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:arya.ajisadda@example.com?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(onClose, 2000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-[#E5E7EB]">
        <button onClick={onClose} aria-label="Close" className="absolute top-6 right-6 text-neutral-400 hover:text-black text-lg">
          <FaXmark />
        </button>

        <div className="mb-6">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Contact Me</span>
          <h3 className="text-2xl font-editorial text-neutral-900 mt-1">Get in Touch</h3>
          <p className="text-xs text-neutral-500 mt-1">Send a message and I&apos;ll respond within 24 hours.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Your Name</label>
            <input type="text" name="name" required placeholder="John Doe" className="w-full text-sm px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#18181B] bg-brand-bg" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Your Email</label>
            <input type="email" name="email" required placeholder="john@example.com" className="w-full text-sm px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#18181B] bg-brand-bg" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Message / Project Details</label>
            <textarea name="message" rows={4} required placeholder="Tell me about your project or inquiry..." className="w-full text-sm px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#18181B] bg-brand-bg" />
          </div>
          <button type="submit" className="w-full bg-[#18181B] hover:bg-[#27272A] text-white text-sm font-semibold py-3.5 rounded-xl transition-colors shadow-md">
            Send Message →
          </button>
        </form>

        {sent && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs text-center font-medium">
            Thank you! Opening your email app to send the message.
          </div>
        )}
      </div>
    </div>
  );
}