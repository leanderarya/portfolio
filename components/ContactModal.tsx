"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaXmark, FaCircleCheck } from "react-icons/fa6";
import { useModal } from "@/hooks/useModal";
import { site } from "@/data/site";

export default function ContactModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const rm = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const modalRef = useModal(onClose);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = fd.get("name") as string;
    const email = fd.get("email") as string;
    const message = fd.get("message") as string;
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(onClose, 2000);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          if (timerRef.current) clearTimeout(timerRef.current);
          onClose();
        }
      }}
    >
      <motion.div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="Contact form"
        tabIndex={-1}
        initial={rm ? false : { opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12, transition: { duration: 0.18 } }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-[#E5E7EB] max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={() => {
            if (timerRef.current) clearTimeout(timerRef.current);
            onClose();
          }}
          aria-label="Close"
          className="absolute top-6 right-6 text-neutral-400 hover:text-black text-lg"
        >
          <FaXmark />
        </button>

        <div className="mb-6">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Contact Me</span>
          <h3 className="text-2xl font-editorial text-neutral-900 mt-1">Get in Touch</h3>
          <p className="text-xs text-neutral-500 mt-1">Tell me about your project — I&apos;ll get back to you.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Your Name</label>
            <input type="text" name="name" required placeholder="John Doe" className="w-full text-sm px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-lime bg-brand-bg" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Your Email</label>
            <input type="email" name="email" required placeholder="john@example.com" className="w-full text-sm px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-lime bg-brand-bg" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Message / Project Details</label>
            <textarea name="message" rows={4} required placeholder="Tell me about your project or inquiry..." className="w-full text-sm px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-lime bg-brand-bg" />
          </div>
          <button type="submit" className="w-full bg-[#18181B] hover:bg-[#27272A] text-white text-sm font-semibold py-3.5 rounded-xl transition-colors shadow-md">
            Send Message →
          </button>
        </form>

        {sent && (
          <motion.div
            initial={rm ? false : { scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-4 p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs text-center font-medium flex items-center justify-center gap-2"
          >
            <FaCircleCheck /> Thank you! Opening your email app to send the message.
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
