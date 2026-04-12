import configPromise from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

const MAX_LEN = { fullName: 200, email: 320, organisation: 200, phone: 80, message: 8000 }

type Body = {
  country?: string
  fullName?: string
  email?: string
  organisation?: string
  phone?: string
  message?: string
  /** Bot honeypot — dolu gelirse reddet */
  companyWebsite?: string
}

function trim(s: unknown, max: number): string {
  if (typeof s !== 'string') return ''
  return s.trim().slice(0, max)
}

export async function POST(req: Request) {
  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  if (body.companyWebsite && String(body.companyWebsite).trim() !== '') {
    return NextResponse.json({ ok: true }, { status: 201 })
  }

  const country = trim(body.country, 8)
  const fullName = trim(body.fullName, MAX_LEN.fullName)
  const email = trim(body.email, MAX_LEN.email)
  const organisation = trim(body.organisation, MAX_LEN.organisation)
  const phone = trim(body.phone, MAX_LEN.phone)
  const message = trim(body.message, MAX_LEN.message)

  if (!country || !fullName || !email || !message) {
    return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!emailOk) {
    return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 })
  }

  try {
    const payload = await getPayload({ config: configPromise })
    await payload.create({
      collection: 'contact-enquiries',
      data: {
        country,
        fullName,
        email,
        organisation: organisation || undefined,
        phone: phone || undefined,
        message,
      },
    })
    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (e) {
    console.error('[api/contact]', e)
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}
