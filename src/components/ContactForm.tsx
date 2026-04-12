'use client'

import React, { useState } from 'react'
import { countryOptionsUkFirst } from '@/constants/countryOptions'

type Props = {
  /** Show organisation & job-title fields (consultation variant) */
  variant?: 'contact' | 'consultation'
}

export const ContactForm: React.FC<Props> = ({ variant = 'contact' }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    const fd = new FormData(e.currentTarget)

    const body = {
      country: fd.get('country') as string,
      fullName: fd.get('fullName') as string,
      email: fd.get('email') as string,
      organisation: (fd.get('organisation') as string) || undefined,
      phone: (fd.get('phone') as string) || undefined,
      message: fd.get('message') as string,
      companyWebsite: (fd.get('companyWebsite') as string) || undefined,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong')
      }

      setStatus('success')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <p className="text-lg font-semibold text-emerald-800">Thank you for your enquiry!</p>
        <p className="mt-2 text-sm text-emerald-700">
          We have received your message and will get back to you within one to two business days.
        </p>
      </div>
    )
  }

  const inputCls =
    'w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm transition-all duration-200 placeholder:text-zinc-400 focus:border-[#2B7DE9] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#2B7DE9]/10'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot */}
      <div className="hidden" aria-hidden>
        <input type="text" name="companyWebsite" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">Full Name *</label>
          <input type="text" name="fullName" required placeholder="Jane Smith" className={inputCls} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">Email *</label>
          <input type="email" name="email" required placeholder="jane@company.com" className={inputCls} />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            {variant === 'consultation' ? 'Organisation *' : 'Organisation'}
          </label>
          <input
            type="text"
            name="organisation"
            required={variant === 'consultation'}
            placeholder="Company or institution"
            className={inputCls}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">Phone</label>
          <input type="tel" name="phone" placeholder="+44 …" className={inputCls} />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700">Country *</label>
        <select name="country" defaultValue="GB" required className={inputCls}>
          {countryOptionsUkFirst.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700">
          {variant === 'consultation' ? 'What are you looking to achieve? *' : 'Message *'}
        </label>
        {variant === 'consultation' && (
          <p className="mb-2 text-xs text-zinc-500">
            Briefly describe your current risk management setup, challenges, or goals.
          </p>
        )}
        <textarea
          name="message"
          required
          rows={5}
          placeholder={
            variant === 'consultation'
              ? 'e.g. We are aligning with ISO 31000, need help with risk appetite and reporting to the board…'
              : 'Tell us about your risk management needs...'
          }
          className={inputCls}
        />
      </div>

      {status === 'error' && (
        <p className="text-sm font-medium text-red-600">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-block rounded-xl bg-gradient-to-r from-[#2B7DE9] to-[#1a5fc4] px-8 py-3.5 font-semibold text-white shadow-lg shadow-[#2B7DE9]/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#2B7DE9]/30 disabled:opacity-60 disabled:pointer-events-none"
      >
        {status === 'submitting'
          ? 'Submitting…'
          : variant === 'consultation'
            ? 'Request consultation'
            : 'Send Message'}
      </button>
    </form>
  )
}
